export default interface CrmStats {
  leadsTotal: number
  contactsTotal: number
  dealsTotal: number
  newDeals: number
  newLeads: number
  convertedLeads: number
  leadsChartData: {
    date: string[]
    newLeads: number[]
    convertedLeads: number[]
  }
  sentimentAnalysisData: {
    date: string[]
    positive: number[]
    negative: number[]
    neutral: number[]
  }
  complaintsChartData: {
    complaint: string[]
    complaintsNumber: number[]
  }
}
