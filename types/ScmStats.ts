export interface InvoicesData {
  days: string[]
  newInvs: number[]
  paidInvs: number[]
  complInvs: number[]
}

export interface DeliveriesData {
  days: string[]
  initiated: number[]
  inTransit: number[]
  deliveryComplete: number[]
}

export interface InvoicesSummart {
  new: number
  paid: number
  pending: number
  completed: number
}

export interface DeliveriesSummary {
  initiated: number
  inTransit: number
  arrivedAtDestination: number
  deliveryComplete: number
}

export default interface ScmStats {
  monthDeliveries: number
  finishedDeliveries: number
  monthInvoices: number
  fulfilledInvoices: number
  invoicesInProgress: number
  invoicesData: InvoicesData
  deliveriesData: DeliveriesData
  invoicesSummart: InvoicesSummart
  deliveriesSummary: DeliveriesSummary
}
