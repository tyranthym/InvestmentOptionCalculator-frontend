import React, { useContext } from "react";
import {
  Input,
  Label,
  FormField,
  FormGroup,
  Dropdown,
  Button,
  Icon,
  DropdownProps,
  InputOnChangeData,
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
  const {
    dropdownOptions,
    updateDropdownOptions,
    updateInvestmentOptions,
  } = useContext(DropdownOptionContext);
  const { removeInvestmentOption, validateInvestmentPercentage } = useContext(
    InvestmentOptionContext
  );
  const { investmentAmount, updateInvestmentPercentage } = useContext(
    InvestmentAmountContext
  );

  const dropdownListOptions = dropdownOptions
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
  const handleDropdownOnChange = (
    event: React.SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ) => {
    updateDropdownOptions(data.value as number);
    let newInvestmentOption = { ...investmentOption };
    newInvestmentOption.investmentOption = data.value as number;
    updateInvestmentOptions(newInvestmentOption);
  };

  const handleInvestmentPercentageOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    let newInvestmentOption = { ...investmentOption };
    const newPercentage = validateInvestmentPercentage(
      newInvestmentOption.id,
      Number(data.value)
    );    
    newInvestmentOption.investmentPercentage = newPercentage;
    if (!newInvestmentOption.investmentPercentage) {
      newInvestmentOption.investmentPercentage = 0;
    }
    updateInvestmentOptions(newInvestmentOption);
    updateInvestmentPercentage(
      investmentAmount.totalPercentage,
      newInvestmentOption.investmentPercentage
    );
  };

  return (
    <FormGroup>
      <FormField width={6}>
        <Dropdown
          placeholder="--select--"
          fluid
          selection
          options={dropdownListOptions}
          onChange={(e, data) => handleDropdownOnChange(e, data)}
        />
      </FormField>
      <FormField width={6}>
        <Input
          labelPosition="right"
          type="text"
          placeholder="value between 0 - 100"
          onChange={(e, data) => handleInvestmentPercentageOnChange(e, data)}
          
        >
          <input type="number" min="0" max="100" />
          <Label>%</Label>
        </Input>
      </FormField>
      <FormField width={4}>
        <Button
          icon
          color="red"
          onClick={(e) => removeInvestmentOption(investmentOption)}
        >
          <Icon name="minus" />
        </Button>
      </FormField>
    </FormGroup>
  );
};

export default InvestmentOptionItem;
