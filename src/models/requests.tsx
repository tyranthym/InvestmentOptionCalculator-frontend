export interface CalculateOptionRequest {
  investmentOption: InvestmentOption;
  investmentPercentage: number;
}

export enum InvestmentOption {
  CashInvestments = 0,
  FixedInterest,
  Shares,
  ManagedFunds,
  ExchangeTradedFunds,
  InvestmentBonds,
  Annuities,
  ListedInvestmentCompanies,
  RealEstateInvestmentTrusts,
}

export interface CalculateROIRequest {
  totalAmount: number;
  options: CalculateOptionRequest[];
}
