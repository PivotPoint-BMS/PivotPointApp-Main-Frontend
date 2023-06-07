export default interface SessionUser {
  firstName: string
  lastName: string
  profilePicture: string
  hasSetupCompany: boolean
  hasPaidSubscription: boolean
  hasToChangePassword: boolean
  isOwner: boolean
  token: string
  refreshToken: string
  tier: number
  position: string[]
}
