export default interface Supplier {
  id: string
  name: string
  address: string
  phoneNumber: string
  email: string
  supplierItems: {
    cost: number
    id: string
    name: string
    type: number
  }[]
}
