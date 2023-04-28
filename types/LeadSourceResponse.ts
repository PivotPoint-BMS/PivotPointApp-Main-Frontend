import { LeadSource } from './Lead'

export default interface LeadSourceResponse {
  pageNumber: number
  pageSize: number
  totalPages: number
  totalRecords: number
  data: LeadSource[]
  succeeded: boolean
  errors: string | null
  message: string | null
}
