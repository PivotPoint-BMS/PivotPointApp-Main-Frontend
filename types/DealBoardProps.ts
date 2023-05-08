import type { UniqueIdentifier } from '@dnd-kit/core'
import DealBoardColumnProps from './DealBoardColumnProps'
import Deal from './Deal'

export interface DealBoard {
  id: string
  title: string
}

export interface DealBoardResponse {
  columns: DealBoardColumnProps[]
  columnsOrder: UniqueIdentifier[]
  deals: Deal[]
  dealBoards: DealBoard[]
}

export default interface DealBoardProps {
  columns: { [key: UniqueIdentifier]: DealBoardColumnProps }
  columnsOrder: UniqueIdentifier[]
  deals: { [key: UniqueIdentifier]: Deal }
  dealBoards: DealBoard[]
}
