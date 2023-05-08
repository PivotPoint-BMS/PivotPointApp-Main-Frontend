import type { UniqueIdentifier } from '@dnd-kit/core'

export default interface DealBoardColumnProps {
  id: UniqueIdentifier
  columnTitle: string
  deals: UniqueIdentifier[]
}
