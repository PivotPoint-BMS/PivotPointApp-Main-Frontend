import { UniqueIdentifier } from '@dnd-kit/core'

export default interface Deal {
  id: string | UniqueIdentifier
  assignedTo: string | null
  createdBy: string
  dealComments: []
  description: string
  lastUpdatedBy: null
  leads: string[]
  potentialDealValue: number
  successProbability: number
  tags: string
  title: string
  type: number
}
