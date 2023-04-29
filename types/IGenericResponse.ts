export default interface ListGenericResponse<T = never> {
  data: T | never
  succeeded: boolean
  errors: string | null
  message: string
  pageNumber: number
  pageSize: number
  totalPages: number
  totalRecords: number
}
