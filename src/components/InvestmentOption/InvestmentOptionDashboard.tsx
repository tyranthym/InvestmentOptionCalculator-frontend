import React from "react";
import { Grid, GridRow } from "semantic-ui-react";
import InvestmentOptionList from "./InvestmentOptionList";

const InvestmentOptionDashboard = () => {
  return (
    <fieldset>
      <legend>Investment Option</legend>
      <GridRow style={{ padding: "2rem" }}>
        <Grid.Column>
          <InvestmentOptionList />
        </Grid.Column>
      </GridRow>
    </fieldset>
  );
};

export default InvestmentOptionDashboard;
