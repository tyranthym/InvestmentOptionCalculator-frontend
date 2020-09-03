export interface InvestmentOptionCalculationResponse {
  currencyCode: string; //e.g. AUD or USD
  totalROI: number;
  totalFee: number;
}

export interface InvestmentOptionGetAllResponse {
  investmentOptions: string[];
}
