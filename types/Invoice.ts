export default interface Invoice {
  id: string
  invoiceTitle: string
  due: string
  clientName: string
  contactId: string
  paymentMethod: string
  created: string
  outCome: boolean
  archived: boolean
  status: 0 | 1 | 2 | 3 | 4
  total: number
  invoiceItems: InvoiceItem[]
}

export interface InvoiceItem {
  id: string
  type: number
  picture: string | undefined
  name: string
  value: number
  quantity: number
}
