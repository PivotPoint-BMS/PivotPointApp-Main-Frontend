export default interface WarehouseSection {
  id: string
  name: string
  maxCapacity: number
  x: number
  y: number
  w: number
  h: number
  sectionItems: {
    cost: number
    id: string
    name: string
    picture: string | null
    quantity: number
    type: 1 | 2 | 3
  }[]
  currentCapacity: number
}
