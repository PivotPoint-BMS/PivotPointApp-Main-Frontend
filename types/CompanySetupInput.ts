export default interface CompanySetupInput {
  yourPosition: string
  companyName: string
  companySlogan: string
  companyWebsite: string
  companyWorkers: [
    {
      firstName: string
      lastName: string
      email: string
      position: string
    }
  ]
  subscription: 0
}
