export default interface Product {
  id: string
  type: number
  categoryId: string
  name: string
  price: number
  productCode: string
  cost: number
  weight?: number
  brand: string
  dimensions?: string
}
