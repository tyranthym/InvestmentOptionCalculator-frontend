import React, { useContext } from "react";
import InvestmentOptionItem from "./InvestmentOptionItem";
import { Form, FormGroup, FormField, Button, Icon } from "semantic-ui-react";
import { InvestmentOptionContext } from "../../contexts/CalculatorContext";

const InvestmentOptionList = () => {
  const {investmentOptions, addEmptyInvestmentOption} = useContext(InvestmentOptionContext);
  return (
    <>
      <Form error>
        {investmentOptions.map((option) => {
          return <InvestmentOptionItem key={option.id} investmentOption={option} />;
        })}
        {investmentOptions.length < 9 ? (
          <FormGroup>
            <FormField width={6}></FormField>
            <FormField width={6}></FormField>
            <FormField width={4}>
              <Button
                icon
                color="green"
                onClick={addEmptyInvestmentOption}
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
