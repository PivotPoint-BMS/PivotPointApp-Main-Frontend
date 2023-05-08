import { UniqueIdentifier } from '@dnd-kit/core'

export default interface Deal {
  id: UniqueIdentifier
  title: string
  description: string
  type: number
  potentialDealValue: number
  successProbability: number
  tags: string
  leadIds: string[]
}
