import Contact from './Contact'

export default interface ContactsResponse {
  pageNumber: number
  pageSize: number
  totalPages: number
  totalRecords: number
  data: Contact[]
  succeeded: boolean
  errors: string | null
  message: string | null
}
