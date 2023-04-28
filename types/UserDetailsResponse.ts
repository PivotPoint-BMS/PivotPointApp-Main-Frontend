import UserDetails from './UserDetails'

export default interface LeadSourceResponse {
  data: UserDetails
  succeeded: boolean
  errors: string | null
  message: string | null
}
