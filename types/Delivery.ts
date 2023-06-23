import Supplier from './Supplier'
import Vehicle from './Vehicle'

export interface DeliveryItem {
  id: string
  type: number
  picture?: string
  name: string
  quantity: number
  cost: number
  value: number
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
  warehouseStart: string
  warehouseEnd: string
  supplier: Supplier | null
  vehicule: Vehicle
  checkingDate: string
  inTransit: string
  deliveryComplete: string
  arrivedAtDest: string
}
