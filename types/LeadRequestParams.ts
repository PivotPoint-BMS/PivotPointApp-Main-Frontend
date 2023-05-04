export default interface LeadRequestParams {
  SearchTerm?: string
  IsContact: boolean
  IsLead: boolean
  AddressId?: string
  LeadSourceId?: string
  LeadPriority?: 0 | 1 | 2 | 3
  PageNumber?: number
  PageSize?: number
}
