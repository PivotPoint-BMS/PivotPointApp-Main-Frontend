export default interface Vehicule {
  id: string
  code: string
  model: string
  type: 0 | 1 | 2 | 3
  size: 0 | 1 | 2 | 3
  weight: number
  volumne: number
  maxCapacity: number
}
