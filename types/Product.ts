export default interface Product {
  id: string
  type: 1 | 2 | 3
  categoryId: string
  name: string
  picture?: string
  price: number
  productCode: string
  cost: number
  weight?: number
  brand: string
}
