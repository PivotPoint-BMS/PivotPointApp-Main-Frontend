export interface Address {
  city: string
  country: string
}
export interface ContactSource {
  source: string
  sourceLink?: string
}
export default interface Contact {
  id: string
  imageFile?: string
  fullName: string
  email: string
  phoneNumber: string
  jobTitle?: string
  priority?: number
  status: number
  source?: ContactSource
  address?: Address
}
