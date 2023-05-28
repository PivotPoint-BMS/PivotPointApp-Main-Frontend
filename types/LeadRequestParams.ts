import RequestParams from './RequestParams'

export default interface LeadRequestParams extends RequestParams {
  SearchTerm?: string
  IsContact: boolean
  IsLead: boolean
  AddressId?: string
  LeadSourceId?: string
  LeadPriority?: 0 | 1 | 2 | 3
}
