import DealStatus from './DealStatus'

export default interface Deal {
  id: string
  title: string
  description: string
  status: DealStatus
}
