import { UniqueIdentifier } from '@dnd-kit/core'

export default interface Deal {
  id: string | UniqueIdentifier
  assignedTo: string | null
  createdBy: string
  dealComments: []
  description: string
  lastUpdatedBy: null
  leadIds: string[]
  leads: {
    fullName: string
    id: string
    imageFile: string
  }[]
  potentialDealValue: number
  successProbability: number
  tags: string
  title: string
  type: number
  createdAt: string
}
