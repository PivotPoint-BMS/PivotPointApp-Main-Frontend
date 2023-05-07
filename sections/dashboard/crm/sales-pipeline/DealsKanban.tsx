/* eslint-disable no-nested-ternary */
import React, { useCallback, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
// dnd
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DndContext,
  closestCenter,
  pointerWithin,
  CollisionDetection,
  rectIntersection,
  getFirstCollision,
  UniqueIdentifier,
  MeasuringStrategy,
  DragOverlay,
  DropAnimation,
  defaultDropAnimationSideEffects,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  sortableKeyboardCoordinates,
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
// hooks
// types
import { Deal } from 'types'
// components
import { Item } from './Item'
import KanbanColumn from './KanbanColumn'
import SortableItem from './SortableItem'

export interface BoardColumn {
  id: UniqueIdentifier
  name: string
  dealsId: UniqueIdentifier[]
}

interface BoardProps {
  columns: { [key: UniqueIdentifier]: BoardColumn }
  columnsOrder: UniqueIdentifier[]
  deals: { [key: UniqueIdentifier]: Deal }
}

export const INITIAL_BOARD: BoardProps = {
  columns: {
    C1: { id: 'C1', name: 'Column 1', dealsId: ['D1'] },
    C2: { id: 'C2', name: 'Column 2', dealsId: ['D2', 'D3'] },
    C3: { id: 'C3', name: 'Column 3', dealsId: [] },
  },
  columnsOrder: ['C2', 'C1', 'C3'],
  deals: {
    D1: { id: 'D1', title: 'test 1', description: 'ded' },
    D2: { id: 'D2', title: 'test 2', description: 'ded' },
    D3: { id: 'D3', title: 'test 3', description: 'ded' },
  },
}

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
}

const DealsKanban = () => {
  const [board, setBoard] = useState(INITIAL_BOARD)
  // const [activeItem, setActiveItem] = useState<null | { type: string; id: string }>(null)
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const lastOverId = useRef<UniqueIdentifier | null>(null)
  const [clonedItems, setClonedItems] = useState<{ [key: string]: BoardColumn } | null>(null)
  const recentlyMovedToNewContainer = useRef(false)
  const isSortingContainer = activeId ? board.columnsOrder.includes(activeId) : false

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      if (activeId && activeId in board.columns) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container) => container.id in board.columns
          ),
        })
      }

      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args)
      const intersections =
        pointerIntersections.length > 0
          ? // If there are droppables intersecting with the pointer, return those
            pointerIntersections
          : rectIntersection(args)
      let overId = getFirstCollision(intersections, 'id')

      if (overId != null) {
        if (overId in board.columns) {
          const containerItems = board.columns[overId]

          // If a container is matched and it contains items (columns 'A', 'B', 'C')
          if (containerItems.dealsId.length > 0) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                  container.id !== overId && containerItems.dealsId.includes(container.id)
              ),
            })[0]?.id
          }
        }

        lastOverId.current = overId

        return [{ id: overId }]
      }

      // When a draggable item moves to a new container, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new container, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions
      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId
      }

      // If no droppable is matched, return the last match
      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeId, board.columns]
  )

  const findContainer = (id: UniqueIdentifier) => {
    if (id in board.columns) {
      return id
    }

    return Object.keys(board.columns).find((key) => board.columns[key].dealsId.includes(id))
  }
  const getIndex = (id: UniqueIdentifier) => {
    const container = findContainer(id)

    if (!container) {
      return -1
    }

    const index = board.columns[container].dealsId.indexOf(id)

    return index
  }

  function renderSortableItemDragOverlay(id: UniqueIdentifier) {
    return <Item deal={board.deals[id]} dragOverlay />
  }

  function renderContainerDragOverlay(columnId: UniqueIdentifier) {
    return (
      <div
        style={{
          height: '100%',
        }}
      >
        <KanbanColumn name={board.columns[columnId].name} id={''} items={[]}>
          {board.columns[columnId].dealsId.map((item) => (
            <Item key={item} deal={board.deals[item]} />
          ))}
        </KanbanColumn>
      </div>
    )
  }

  // Handlers
  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id)
    setClonedItems(board.columns)
  }
  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const overId = over?.id

    if (overId == null || active.id in board.columns) {
      return
    }

    const overContainer = findContainer(overId)
    const activeContainer = findContainer(active.id)

    if (!overContainer || !activeContainer) {
      return
    }

    if (activeContainer !== overContainer) {
      setBoard(({ columns, columnsOrder, deals }: BoardProps) => {
        const activeItems = columns[activeContainer]
        const overItems = columns[overContainer]
        const overIndex = overItems.dealsId.indexOf(overId)
        const activeIndex = activeItems.dealsId.indexOf(active.id)

        let newIndex: number

        if (overId in columns) {
          newIndex = overItems.dealsId.length + 1
        } else {
          const isBelowOverItem =
            over &&
            active.rect.current.translated &&
            active.rect.current.translated.top > over.rect.top + over.rect.height

          const modifier = isBelowOverItem ? 1 : 0

          newIndex = overIndex >= 0 ? overIndex + modifier : overItems.dealsId.length + 1
        }

        recentlyMovedToNewContainer.current = true

        return {
          deals,
          columnsOrder,
          columns: {
            ...columns,
            [activeContainer]: {
              id: columns[overContainer].id,
              name: columns[overContainer].name,

              dealsId: columns[activeContainer].dealsId.filter((item) => item !== active.id),
            },
            [overContainer]: {
              id: columns[overContainer].id,
              name: columns[overContainer].name,
              dealsId: [
                ...columns[overContainer].dealsId.slice(0, newIndex),
                columns[activeContainer].dealsId[activeIndex],
                ...columns[overContainer].dealsId.slice(
                  newIndex,
                  columns[overContainer].dealsId.length
                ),
              ],
            },
          },
        }
      })
    }
  }
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id in board.columns && over?.id) {
      setBoard(({ columns, columnsOrder, deals }) => {
        const activeIndex = columnsOrder.indexOf(active.id)
        const overIndex = columnsOrder.indexOf(over.id)

        return {
          columns,
          deals,
          columnsOrder: arrayMove(columnsOrder, activeIndex, overIndex),
        }
      })
    }

    const activeContainer = findContainer(active.id)

    if (!activeContainer) {
      setActiveId(null)
      return
    }

    const overId = over?.id

    if (overId == null) {
      setActiveId(null)
      return
    }

    const overContainer = findContainer(overId)

    if (overContainer) {
      const activeIndex = board.columns[activeContainer].dealsId.indexOf(active.id)
      const overIndex = board.columns[overContainer].dealsId.indexOf(overId)

      if (activeIndex !== overIndex) {
        setBoard(({ columns, columnsOrder, deals }) => ({
          deals,
          columnsOrder,
          columns: {
            ...columns,
            [overContainer]: {
              ...columns[overContainer],
              dealsId: arrayMove(board.columns[overContainer].dealsId, activeIndex, overIndex),
            },
          },
        }))
      }
    }

    setActiveId(null)
  }
  const handleDragCancel = () => {
    if (clonedItems) {
      // Reset items to their original state in case items have been
      // Dragged across containers
      setBoard(({ columnsOrder, deals }) => ({
        columns: clonedItems,
        columnsOrder,
        deals,
      }))
    }

    setActiveId(null)
    setClonedItems(null)
  }

  return (
    <div className='w-auto overflow-hidden'>
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetectionStrategy}
        measuring={{
          droppable: {
            strategy: MeasuringStrategy.Always,
          },
        }}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className='box-border inline-grid grid-flow-col gap-4 p-5'>
          <SortableContext items={board.columnsOrder} strategy={horizontalListSortingStrategy}>
            {board.columnsOrder.map((columnId) => (
              <KanbanColumn
                key={columnId}
                id={columnId}
                name={board.columns[columnId].name}
                items={board.columns[columnId].dealsId}
              >
                <SortableContext
                  items={board.columns[columnId].dealsId}
                  strategy={verticalListSortingStrategy}
                >
                  {board.columns[columnId].dealsId.map((dealId, index) => (
                    <SortableItem
                      disabled={isSortingContainer}
                      key={dealId}
                      id={dealId}
                      index={index}
                      containerId={columnId}
                      getIndex={getIndex}
                      deal={board.deals[dealId]}
                    />
                  ))}
                </SortableContext>
              </KanbanColumn>
            ))}
          </SortableContext>
          {createPortal(
            <DragOverlay dropAnimation={dropAnimation}>
              {activeId
                ? board.columnsOrder.includes(activeId)
                  ? renderContainerDragOverlay(activeId)
                  : renderSortableItemDragOverlay(activeId)
                : null}
            </DragOverlay>,
            document.body
          )}
        </div>
      </DndContext>
    </div>
  )
}

export default DealsKanban
