/* eslint-disable no-nested-ternary */
import React, { useState } from 'react'
// dnd
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DndContext,
  closestCenter,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  DragOverlay,
  DropAnimation,
  defaultDropAnimation,
} from '@dnd-kit/core'
import {
  sortableKeyboardCoordinates,
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
// types
import { Deal } from 'types'
// utils
import { getTaskById } from './kanbanItemUtils'
import { KanbanColumsType, findKanbanColumContainer, initializeBoard } from './board'
// components
import KanbanColumn from './KanbanColumn'
import DealItem from './DealItem'

const INITIAL_TASKS: Deal[] = [
  {
    id: '1',
    title: 'Title 2',
    description: 'Desc 2',
    status: 'qualification',
  },
  {
    id: '2',
    title: 'Title 3',
    description: 'Desc 3',
    status: 'qualification',
  },
  {
    id: '3',
    title: 'Title 4',
    description: 'Desc 4',
    status: 'done',
  },
  {
    id: '4',
    title: 'Title 4',
    description: 'Desc 4',
    status: 'testing',
  },
]

const DealsKanban = () => {
  const deals = INITIAL_TASKS
  const initialBoardSections = initializeBoard(INITIAL_TASKS)
  const [kanbanColumns, setKanbanColumns] = useState<KanbanColumsType>(initialBoardSections)

  const [activeItem, setActiveItem] = useState<null | { type: string; id: string }>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveItem({ type: active.data?.current?.type, id: active.id as string })
  }

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (active.data?.current?.type === 'card') {
      // Find the containers
      const activeContainer = findKanbanColumContainer(kanbanColumns, active.id as string)
      const overContainer = findKanbanColumContainer(kanbanColumns, over?.id as string)

      if (!activeContainer || !overContainer || activeContainer === overContainer) {
        return
      }

      setKanbanColumns((kanbanColumn) => {
        const activeItems = kanbanColumn[activeContainer]
        const overItems = kanbanColumn[overContainer]

        // Find the indexes for the items
        const activeIndex = activeItems.findIndex((item) => item.id === active.id)
        const overIndex = overItems.findIndex((item) => item.id !== over?.id)

        return {
          ...kanbanColumn,
          [activeContainer]: [
            ...kanbanColumn[activeContainer].filter((item) => item.id !== active.id),
          ],
          [overContainer]: [
            ...kanbanColumn[overContainer].slice(0, overIndex),
            kanbanColumns[activeContainer][activeIndex],
            ...kanbanColumn[overContainer].slice(overIndex, kanbanColumn[overContainer].length),
          ],
        }
      })
    }
  }

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.data?.current?.type === 'card') {
      const activeContainer = findKanbanColumContainer(kanbanColumns, active.id as string)
      const overContainer = findKanbanColumContainer(kanbanColumns, over?.id as string)

      if (!activeContainer || !overContainer || activeContainer !== overContainer) {
        return
      }

      const activeIndex = kanbanColumns[activeContainer].findIndex((deal) => deal.id === active.id)
      const overIndex = kanbanColumns[overContainer].findIndex((deal) => deal.id === over?.id)

      if (activeIndex !== overIndex) {
        setKanbanColumns((kanbanColumn) => ({
          ...kanbanColumn,
          [overContainer]: arrayMove(kanbanColumn[overContainer], activeIndex, overIndex),
        }))
      }

      setActiveItem(null)
    }
  }

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  }

  const deal = activeItem?.type === 'card' ? getTaskById(deals, activeItem.id) : null

  return (
    <div className='w-auto overflow-hidden'>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          id='columns-sortable'
          items={['backlog', 'in progress', 'done', 'testing']}
          strategy={horizontalListSortingStrategy}
        >
          <div className='scrollbar-none flex h-full flex-row items-start gap-6 overflow-x-scroll  pr-10'>
            {['backlog', 'in progress', 'done', 'testing'].map((kanbanColumnKey) => (
              <KanbanColumn
                id={kanbanColumnKey}
                title={kanbanColumnKey}
                deals={kanbanColumns[kanbanColumnKey]}
                key={kanbanColumnKey}
              />
            ))}
            <DragOverlay dropAnimation={dropAnimation}>
              {activeItem?.type === 'card' && deal ? (
                <DealItem deal={deal} />
              ) : activeItem?.type === 'column' && activeItem?.id ? (
                <KanbanColumn
                  id={activeItem.id}
                  title={activeItem.id}
                  deals={kanbanColumns[activeItem.id]}
                />
              ) : null}
            </DragOverlay>
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}

export default DealsKanban
