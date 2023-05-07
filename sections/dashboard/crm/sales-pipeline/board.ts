import { Deal, DealStatus } from 'types'
import { getTasksByStatus } from './kanbanItemUtils'
import { BoardColumn } from './DealsKanban'

const BOARD_SECTIONS = {
  backlog: 'backlog',
  'in progress': 'in progress',
  done: 'done',
  testing: 'testing',
}

export interface KanbanColumsType {
  [id: string]: Deal[]
}

export const initializeBoard = (tasks: Deal[]) => {
  const kanbanColumns: KanbanColumsType = {}

  Object.keys(BOARD_SECTIONS).forEach((boardSectionKey) => {
    kanbanColumns[boardSectionKey] = getTasksByStatus(tasks, boardSectionKey as DealStatus)
  })

  return kanbanColumns
}

export const findKanbanColumContainer = (
  kanbanColumns: { [key: string]: BoardColumn } | null,
  id: string
) => {
  if (!kanbanColumns) return null
  if (id in kanbanColumns) {
    return id
  }

  const container = Object.keys(kanbanColumns).find((key) =>
    kanbanColumns[key].dealsId.find((item) => item === id)
  )
  return container
}
