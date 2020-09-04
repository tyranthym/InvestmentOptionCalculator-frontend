import React, { useContext } from "react";
import {
  Input,
  Label,
  FormField,
  FormGroup,
  Dropdown,
  Button,
  Icon,
} from "semantic-ui-react";
import {
  DropdownOptionContext,
  InvestmentOptionContext,
  IInvestmentOptionState,
  InvestmentAmountContext,
} from "../../contexts/CalculatorContext";

const InvestmentOptionItem = ({
  investmentOption,
}: {
  investmentOption: IInvestmentOptionState;
}) => {
  const dropdownOptionContext = useContext(DropdownOptionContext);
  const investmentOptionContext = useContext(InvestmentOptionContext);
  const investmentAmountContext = useContext(InvestmentAmountContext);

  const dropdownOptions = dropdownOptionContext.dropdownOptions
    .filter((option) => {
      return (
        !option.isSelected ||
        (option.isSelected &&
          option.id === (investmentOption.investmentOption as number)) //exclude itself
      );
    })
    .map((option) => {
      return {
        key: option.id,
        value: option.id,
        text: option.description,
      };
    });

  return (
    <FormGroup>
      <FormField width={6}>
        <Dropdown
          placeholder="--select--"
          fluid
          selection
          options={dropdownOptions}
          onChange={(e, data) => {
            dropdownOptionContext.updateDropdownOptions(data.value as number);
            let newInvestmentOption = { ...investmentOption };
            newInvestmentOption.investmentOption = data.value as number;
            dropdownOptionContext.updateInvestmentOptions(newInvestmentOption);
          }}
        />
      </FormField>
      <FormField width={6}>
        <Input
          labelPosition="right"
          type="text"
          placeholder="Amount%"
          onChange={(e, data) => {
            let newInvestmentOption = { ...investmentOption };
            newInvestmentOption.investmentPercentage = parseInt(data.value);
            if (!newInvestmentOption.investmentPercentage) {
              newInvestmentOption.investmentPercentage = 0;
            }
            dropdownOptionContext.updateInvestmentOptions(newInvestmentOption);
            investmentAmountContext.updateInvestmentPercentage(
              investmentAmountContext.investmentAmount.totalPercentage,
              newInvestmentOption.investmentPercentage
            );
          }}
        >
          <input type="number" min="0" max="100" />
          <Label>%</Label>
        </Input>
      </FormField>
      <FormField width={4}>
        <Button
          icon
          color="red"
          onClick={(e) =>
            investmentOptionContext.removeInvestmentOption(investmentOption)
          }
        >
          <Icon name="minus" />
        </Button>
      </FormField>
    </FormGroup>
  );
};

export default InvestmentOptionItem;
