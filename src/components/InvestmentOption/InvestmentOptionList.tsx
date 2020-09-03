import React, { useContext } from "react";
import InvestmentOptionItem from "./InvestmentOptionItem";
import { Form, FormGroup, FormField, Button, Icon } from "semantic-ui-react";
import { InvestmentOptionContext } from "../../contexts/CalculatorContext";

const InvestmentOptionList = () => {
  const investmentOptionContext = useContext(InvestmentOptionContext);
  return (
    <>
      <Form>
        {investmentOptionContext.investmentOptions.map((option) => {
          return <InvestmentOptionItem key={option.id} investmentOption={option} />;
        })}
        {investmentOptionContext.investmentOptions.length < 9 ? (
          <FormGroup>
            <FormField width={6}></FormField>
            <FormField width={6}></FormField>
            <FormField width={4}>
              <Button
                icon
                color="green"
                onClick={investmentOptionContext.addEmptyInvestmentOption}
              >
                <Icon name="plus" />
              </Button>
            </FormField>
          </FormGroup>
        ) : null}
      </Form>
    </>
  );
};

export default InvestmentOptionList;
