export default interface IGenericError {
  status: number
  data: string | string[]
  isUnhandledError: boolean
  meta: {
    request: object
    response: object
  }
}
