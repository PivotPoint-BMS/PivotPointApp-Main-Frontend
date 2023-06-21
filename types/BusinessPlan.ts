export default interface BusinessPlan {
  balanceSheetForecasts: { [key: string]: number }[]
  financialPlan: {
    financements: { amount: number; source: string }[]
    investements: { amount: number; investement: string }[]
  }
  profitabilityThresholds: { [key: string]: number }[]
  previsionalResultsAccounts: { [key: string]: number }[]
  years: number[]
}
