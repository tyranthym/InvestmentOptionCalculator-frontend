import React from "react";
import {
  Header,
  Divider,
  Grid,
  GridRow,
  GridColumn,
  Container,
  Segment,
} from "semantic-ui-react";
import Calculator from "./components/Calculator";
import CalculatorContextProvider from "./contexts/CalculatorContext";
import InvestmentAmount from "./components/InvestmentAmount";
import FormContextProvider from "./contexts/FormContext";

import "./App.css";

function App() {
  return (
    <Grid centered>
      <GridRow>
        <GridColumn>
          <Header as="h3" block className="nav-header">
            Investment Option Calculator
          </Header>
        </GridColumn>
      </GridRow>

      <CalculatorContextProvider>
        <FormContextProvider>
          <Segment className="investment-amount-segment">
            <InvestmentAmount />
          </Segment>         

          <GridRow>
            <GridColumn width={8}>
              <Calculator />
            </GridColumn>
          </GridRow>
        </FormContextProvider>
      </CalculatorContextProvider>
    </Grid>
  );
}

export default App;
