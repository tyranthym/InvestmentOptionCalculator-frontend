import React from "react";
import { InvestmentOptionCalculationResponse } from "../../models/responses";
import { GridRow, GridColumn, Input, Label } from "semantic-ui-react";

const ROIResult = ({
  result,
}: {
  result: InvestmentOptionCalculationResponse;
}) => {
  return (
    <fieldset>
      <legend>ROI</legend>
      <GridRow columns={2} style={{padding: '2rem'}}>
        <GridColumn>
          <Label color="teal" className="roi-label">Projected Return in 1 Year</Label>
        </GridColumn>
        <GridColumn>
          <Input
            disabled
            labelPosition="right"
            type="text"
            placeholder="Amount"
          >
            <Label basic>$</Label>
            <input value={result.totalROI} className="roi-input"/>
            <Label>USD</Label>
          </Input>
        </GridColumn>
      </GridRow>
      <GridRow columns={2} style={{padding: '2rem'}}>
        <GridColumn>
          <Label color="teal" className="roi-label">Total Fees</Label>
        </GridColumn>
        <GridColumn>
          <Input
            disabled
            labelPosition="right"
            type="text"
            placeholder="Amount"
          >
            <Label basic>$</Label>
            <input value={result.totalFee} className="roi-input"/>
            <Label>USD</Label>
          </Input>
        </GridColumn>
      </GridRow>
    </fieldset>
  );
};

export default ROIResult;
