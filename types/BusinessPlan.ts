export default interface BusinessPlan {
  balanceSheetForecasts: number[]
  financialPlan: {
    financements: { amount: number; interestRate: number; source: string }[]
  }
}
