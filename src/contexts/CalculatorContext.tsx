import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { InvestmentOptionGetAllResponse } from "../models/responses";
import { InvestmentOption } from "../models/requests";

interface IDropdownOptionState {
  id: number;
  description: string;
  isSelected: boolean;
}

export interface IInvestmentOptionState {
  id: number;
  investmentOption: InvestmentOption | null;
  investmentPercentage: number;
}

interface IInvestmentAmountState {
  totalAmount: number;
  totalPercentage: number;
  availableAmount: number;
}

type DropdownOptionContextType = {
  dropdownOptions: IDropdownOptionState[];
  updateDropdownOptions: (id: number) => void;
  updateInvestmentOptions: (option: IInvestmentOptionState) => void;
};

type InvestmentOptionContextType = {
  investmentOptions: IInvestmentOptionState[];
  addEmptyInvestmentOption: () => void;
  removeInvestmentOption: (id: number) => void;
};

type InvestmentAmountContextType = {
  investmentAmount: IInvestmentAmountState;
  updateAvailableAmount: (newTotalAmount: number) => void;
  updateInvestmentPercentage: (
    oldPercentage: number,
    newPercentage: number
  ) => void;
};

export const DropdownOptionContext = createContext<DropdownOptionContextType>({
  dropdownOptions: [],
  updateDropdownOptions: () => {},
  updateInvestmentOptions: () => {},
});

export const InvestmentAmountContext = createContext<
  InvestmentAmountContextType
>({
  investmentAmount: {
    totalAmount: 100000,
    totalPercentage: 0,
    availableAmount: 100000,
  },
  updateAvailableAmount: () => {},
  updateInvestmentPercentage: () => {},
});

export const InvestmentOptionContext = createContext<
  InvestmentOptionContextType
>({
  investmentOptions: [],
  addEmptyInvestmentOption: Function,
  removeInvestmentOption: () => {},
});

//private
const calculateAvailableAmount = (
  totalAmount: number,
  totalPercentage: number
) => {
  let result = totalAmount * ((100 - totalPercentage) / 100)
  return Math.round((result + Number.EPSILON) * 100) / 100;
};

const CalculatorContextProvider = (props: { children: React.ReactNode }) => {
  //state hooks
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [dropdownOptions, setDropdownOptions] = useState<
    IDropdownOptionState[]
  >([]);
  const [investmentOptions, setInvestmentOptions] = useState<
    IInvestmentOptionState[]
  >([]);
  const [investmentAmount, setInvestmentAmount] = useState<
    IInvestmentAmountState
  >({
    totalAmount: 100000,
    totalPercentage: 0,
    availableAmount: 100000,
  });

  const defaultOptionCount = 5;
  const minOptionCount = 1;
  const maxOptionCount = 9;

  const initDefaultOptions = (defaultOptionCount: number) => {
    const newOptions: IInvestmentOptionState[] = [];
    for (let i = 0; i < defaultOptionCount; i++) {
      const newOption: IInvestmentOptionState = {
        id: i + 1,
        investmentOption: null,
        investmentPercentage: 0,
      };
      newOptions.push(newOption);
      setCurrentIndex((preIndex) => preIndex + 1);
    }
    setInvestmentOptions(newOptions);
  };

  // InvestmentOptionContext
  const addEmptyInvestmentOption = () => {
    if (investmentOptions.length === maxOptionCount) {
      return;
    }
    const newInvestmentOption: IInvestmentOptionState = {
      id: currentIndex + 1,
      investmentOption: null,
      investmentPercentage: 0,
    };
    setInvestmentOptions([...investmentOptions, newInvestmentOption]);
    setCurrentIndex((preIndex) => preIndex + 1);
  };

  const removeInvestmentOption = (id: number) => {
    if (investmentOptions.length === minOptionCount) {
      return;
    }
    setInvestmentOptions(
      investmentOptions.filter((option) => option.id !== id)
    );
  };

  // InvestmentAmountContext
  const updateInvestmentPercentage = (
    oldPercentage: number,
    newPercentage: number
  ) => {
    if (newPercentage < 0 || newPercentage > 100) {
      return;
    }

    let newTotalPercentage = 0;
    for (let option of investmentOptions) {
      newTotalPercentage += option.investmentPercentage;
    }

    if (newTotalPercentage <= 0 || newTotalPercentage > 100) {
      return;
    }
    const newAvailableAmount = calculateAvailableAmount(
      investmentAmount.totalAmount,
      newTotalPercentage
    );
    setInvestmentAmount({
      totalAmount: investmentAmount.totalAmount,
      totalPercentage: newTotalPercentage,
      availableAmount: newAvailableAmount,
    });
  };

  const updateAvailableAmount = (newTotalAmount: number) => {
    if (!newTotalAmount) return;
    setInvestmentAmount({
      totalAmount: newTotalAmount,
      totalPercentage: investmentAmount.totalPercentage,
      availableAmount: calculateAvailableAmount(
        newTotalAmount,
        investmentAmount.totalPercentage
      ),
    });
  };

  const updateDropdownOptions = (id: number) => {
    const newOptions = dropdownOptions.slice();
    let option = newOptions.find((option) => option.id === id);
    if (option) {
      option.isSelected = true;
    }
    setDropdownOptions(newOptions);
  };

  const updateInvestmentOptions = (
    investmentOption: IInvestmentOptionState
  ) => {
    const newOptions = investmentOptions.slice();
    console.log("new option");
    console.log(newOptions);
    let option = newOptions.find((option) => option.id === investmentOption.id);
    if (option) {
      option.investmentOption = investmentOption.investmentOption;
      option.investmentPercentage = investmentOption.investmentPercentage;
    }
    setInvestmentOptions(newOptions);
  };

  useEffect(() => {
    initDefaultOptions(defaultOptionCount);
    axios
      .get<InvestmentOptionGetAllResponse>(
        "http://localhost:5000/api/investmentOptions"
      )
      .then((response) => {
        console.log(response.data);
        let newOptions: IDropdownOptionState[] = [];
        response.data.investmentOptions.map((response, index) => {
          newOptions.push({
            id: index,
            description: response,
            isSelected: false,
          });
        });
        setDropdownOptions(newOptions);
      });
  }, []);
  return (
    <DropdownOptionContext.Provider
      value={{
        dropdownOptions,
        updateDropdownOptions,
        updateInvestmentOptions,
      }}
    >
      <InvestmentOptionContext.Provider
        value={{
          investmentOptions,
          addEmptyInvestmentOption,
          removeInvestmentOption,
        }}
      >
        <InvestmentAmountContext.Provider
          value={{
            investmentAmount,
            updateAvailableAmount,
            updateInvestmentPercentage,
          }}
        >
          {props.children}
        </InvestmentAmountContext.Provider>
      </InvestmentOptionContext.Provider>
    </DropdownOptionContext.Provider>
  );
};

export default CalculatorContextProvider;
