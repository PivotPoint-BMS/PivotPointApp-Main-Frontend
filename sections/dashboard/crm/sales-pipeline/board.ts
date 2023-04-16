import { Deal, DealStatus } from 'types'
import { getTasksByStatus } from './kanbanItemUtils'

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

export const findKanbanColumContainer = (kanbanColumns: KanbanColumsType, id: string) => {
  if (id in kanbanColumns) {
    return id
  }

  const container = Object.keys(kanbanColumns).find((key) =>
    kanbanColumns[key].find((item) => item.id === id)
  )
  return container
}
