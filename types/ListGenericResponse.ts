export default interface IGenericResponse<T> {
  data: T
  succeeded: boolean
  errors: string | null
  message: string
}
