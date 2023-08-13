export default interface CompanyDetails {
  id: string
  logo: string | null
  name: string
  slogan: string | null
  type: number | null
  website: string | null
  currency: string
  contactEmail: string | null
  contactPhoneNum: string | null
  address: string | null
}
