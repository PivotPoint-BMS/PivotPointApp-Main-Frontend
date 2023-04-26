import Lead from './Lead'

export default interface LeadsResponse {
  pageNumber: number
  pageSize: number
  totalPages: number
  totalRecords: number
  data: Lead[]
  succeeded: boolean
  errors: string | null
  message: string | null
}
