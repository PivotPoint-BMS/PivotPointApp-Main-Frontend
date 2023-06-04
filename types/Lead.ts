export interface Address {
  city: string
  country: string
}
export interface LeadSource {
  id?: string
  source: string
  sourceLink: string
}
export default interface Lead {
  id: string
  picture: string
  fullName: string
  email: string
  phoneNumber: string
  jobTitle: string
  priority?: number
  leadStatus: number
  leadSource: LeadSource
  address: Address
  incomeK: number
  spendingScore: number
}
