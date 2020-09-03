import React, { useContext } from "react";
import { Form, Input, Label, Divider } from "semantic-ui-react";
import { InvestmentAmountContext } from "../contexts/CalculatorContext";

const InvestmentAmount = () => {
  const { investmentAmount, updateAvailableAmount } = useContext(
    InvestmentAmountContext
  );
  return (
    <>
      <Form className="investment-amount-form">
        <Form.Field inline required>
          <label className="investment-amount-label">Investment Amount</label>
          <Input
            placeholder={investmentAmount.totalAmount}
            defaultValue={investmentAmount.totalAmount}
            labelPosition="right"
            type="number"
            onChange={(e) => updateAvailableAmount(parseInt(e.target.value))}
          >
            <Label basic>$</Label>
            <input />
            <Label>AUD</Label>
          </Input>
          {/* <Input
            type="number"
            placeholder={investmentAmount.totalAmount}
            defaultValue={investmentAmount.totalAmount}
            onChange={(e) => updateAvailableAmount(parseInt(e.target.value))}
          /> */}
        </Form.Field>
        <Divider />
        <Form.Field inline>
          <h3 className="available-amount">
            <Label className="available-amount-label">Available Amount:</Label>
            <p>{investmentAmount.availableAmount}</p>
          </h3>
        </Form.Field>
      </Form>
    </>
  );
};

export default InvestmentAmount;
