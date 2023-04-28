export interface Address {
  city: string
  country: string
}
export interface LeadSource {
  id: string
  source: string
  sourceLink?: string
}
export default interface Lead {
  id: string
  imageFile?: string
  fullName: string
  email: string
  phoneNumber: string
  jobTitle?: string
  priority?: number
  status: number
  source?: LeadSource
  address?: Address
}
