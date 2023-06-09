export interface DeliveryItem {
  id: string
  type: number
  picture?: string
  name: string
  quantity: number
  cost: number
  price: number
}
export default interface Delivery {
  id: string
  transportationTitle: string
  expectedArrival: string
  driverName: string
  driverContact: string
  deliveryCost: number
  type: number
  currentStatus?: number
  supplierId?: string
  startWarehouseId?: string
  arrivalWarehouseId?: string
  contactId?: string
  vehiculeID: string
  startingAddress: string
  stoppingAddress: string
  clientName?: string
  clientPaymentMethod?: string
  deliveryItems: DeliveryItem[]
}
