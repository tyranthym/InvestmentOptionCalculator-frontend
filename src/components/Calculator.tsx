import React, { useContext, useEffect, useState } from "react";
import { Tab, TabProps } from "semantic-ui-react";
import InvestmentOptionDashboard from "./InvestmentOption/InvestmentOptionDashboard";
import ROIResult from "./ROI/ROIResult";
import { FormContext } from "../contexts/FormContext";
import axios from "axios";
import { InvestmentOptionCalculationResponse } from "../models/responses";
import {
  InvestmentOptionContext,
  InvestmentAmountContext,
} from "../contexts/CalculatorContext";
import {
  CalculateROIRequest,
  CalculateOptionRequest,
  InvestmentOption,
} from "../models/requests";

const Calculator = () => {
  //state
  const [roiResult, setROIResult] = useState<
    InvestmentOptionCalculationResponse
  >({
    currencyCode: "USD",
    totalROI: 0,
    totalFee: 0,
  });

  const [isSending, setIsSending] = useState<boolean>(false);
  const formContext = useContext(FormContext);
  const investmentOptionContext = useContext(InvestmentOptionContext);

  const investmentAmountContext = useContext(InvestmentAmountContext);

  const handleOnTabChange = (
    e: React.MouseEvent<HTMLDivElement>,
    data: TabProps
  ) => {
    if (data && data.activeIndex === 1) {
      //sending request only when switching to ROI tab
      const newCalculateROIRequest: CalculateROIRequest = {
        totalAmount: investmentAmountContext.investmentAmount.totalAmount,
        options: [],
      };
      investmentOptionContext.investmentOptions
        .filter((option) => option.investmentOption !== null)
        .map((option) => {
          const optionRequest: CalculateOptionRequest = {
            investmentOption: option.investmentOption as InvestmentOption,
            investmentPercentage: option.investmentPercentage,
          };
          newCalculateROIRequest.options.push(optionRequest);
        });
      console.log(newCalculateROIRequest);
      formContext.updateFormData(newCalculateROIRequest);
      setIsSending(true);
    }
  };

  useEffect(() => {
    if (isSending === true) {
      axios
        .post<InvestmentOptionCalculationResponse>(
          "http://localhost:5000/api/investmentOptions/calculator",
          formContext.formDataState.calculateROIRequest
        )
        .then((response) => {
          console.log(response);
          setROIResult(response.data);
        });
      setIsSending(false);
    }
  }, [isSending, formContext.formDataState.calculateROIRequest]);

  const panes = [
    {
      menuItem: "Investment Options",
      pane: (
        <Tab.Pane>
          <InvestmentOptionDashboard />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "ROI",
      pane: (
        <Tab.Pane>
          <ROIResult result={roiResult} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Tab
      menu={{
        color: "blue",
        attached: true,
        tabular: true,
        style: {
          display: "flex",
          justifyContent: "center",
        },
      }}
      panes={panes}
      onTabChange={handleOnTabChange}
      renderActiveOnly={false}
    />
  );
};

export default Calculator;
