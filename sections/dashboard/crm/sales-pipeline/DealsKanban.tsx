/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
// next
import { useRouter } from 'next/router'
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
// api
import {
  getDealBoard,
  getRunningQueriesThunk,
  useGetDealBoardQuery,
} from 'store/api/crm/sales-pipeline/dealsBoardsApi'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { wrapper } from 'store'
// hooks
import useSnackbar from 'hooks/useSnackbar'
import useTranslate from 'hooks/useTranslate'
import DealBoardColumnProps from 'types/DealBoardColumnProps'
// types
import DealBoardProps from 'types/DealBoardProps'
// components
import { Icon as Iconify } from '@iconify/react'
import { Button, Dialog } from 'components'
import { Item } from './Item'
import KanbanColumn from './KanbanColumn'
import SortableItem from './SortableItem'
import CreateEditColumnForm from './CreateEditColumnForm'

export const EMPTY_BOARD: Omit<DealBoardProps, 'dealBoards'> = {
  columns: {},
  columnsOrder: [],
  deals: {},
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

const DealsKanban = ({ boardId }: { boardId: string | null }) => {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const { isFallback } = useRouter()
  const { data, isError, isLoading, isSuccess, isFetching } = useGetDealBoardQuery(
    boardId && boardId?.length > 0 ? boardId : skipToken,
    {
      refetchOnMountOrArgChange: true,
      skip: isFallback,
    }
  )
  const [openDialog, setOpenDialog] = useState(false)
  const [board, setBoard] = useState<Omit<DealBoardProps, 'dealBoards'>>(data || EMPTY_BOARD)
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const lastOverId = useRef<UniqueIdentifier | null>(null)
  const [clonedItems, setClonedItems] = useState<{
    [key: string]: DealBoardColumnProps
  } | null>(null)
  const recentlyMovedToNewContainer = useRef(false)
  const isSortingContainer = activeId ? board.columnsOrder.includes(activeId) : false

  useEffect(() => {
    if (isError && boardId && boardId?.length > 0) {
      open({
        message: t('A problem has occured.'),
        type: 'error',
        variant: 'contained',
      })
    }
    if (isSuccess) {
      setBoard(data)
    }
  }, [isError, isSuccess, isLoading, boardId, isFetching])

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
          if (containerItems.deals.length > 0) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                  container.id !== overId && containerItems.deals.includes(container.id)
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

    return Object.keys(board.columns).find((key) => board.columns[key].deals.includes(id))
  }
  const getIndex = (id: UniqueIdentifier) => {
    const container = findContainer(id)

    if (!container) {
      return -1
    }

    const index = board.columns[container].deals.indexOf(id)

    return index
  }

  function renderSortableItemDragOverlay(id: UniqueIdentifier) {
    return <Item deal={board.deals[id]} dragOverlay />
  }

  function renderContainerDragOverlay(columnId: UniqueIdentifier) {
    return (
      <KanbanColumn name={board.columns[columnId].columnTitle} id={''} items={[]} isDraggingOverlay>
        {board.columns[columnId].deals.map((item) => (
          <Item key={item} deal={board.deals[item]} />
        ))}
      </KanbanColumn>
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
      setBoard(({ columns, ..._board }: Omit<DealBoardProps, 'dealBoards'>) => {
        const activeItems = columns[activeContainer]
        const overItems = columns[overContainer]
        const overIndex = overItems.deals.indexOf(overId)
        const activeIndex = activeItems.deals.indexOf(active.id)

        let newIndex: number

        if (overId in columns) {
          newIndex = overItems.deals.length + 1
        } else {
          const isBelowOverItem =
            over &&
            active.rect.current.translated &&
            active.rect.current.translated.top > over.rect.top + over.rect.height

          const modifier = isBelowOverItem ? 1 : 0

          newIndex = overIndex >= 0 ? overIndex + modifier : overItems.deals.length + 1
        }

        recentlyMovedToNewContainer.current = true

        return {
          ..._board,
          columns: {
            ...columns,
            [activeContainer]: {
              id: columns[overContainer].id,
              columnTitle: columns[overContainer].columnTitle,

              deals: columns[activeContainer].deals.filter((item) => item !== active.id),
            },
            [overContainer]: {
              id: columns[overContainer].id,
              columnTitle: columns[overContainer].columnTitle,
              deals: [
                ...columns[overContainer].deals.slice(0, newIndex),
                columns[activeContainer].deals[activeIndex],
                ...columns[overContainer].deals.slice(
                  newIndex,
                  columns[overContainer].deals.length
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
      const activeIndex = board.columns[activeContainer].deals.indexOf(active.id)
      const overIndex = board.columns[overContainer].deals.indexOf(overId)

      if (activeIndex !== overIndex) {
        setBoard(({ columns, columnsOrder, deals }) => ({
          deals,
          columnsOrder,
          columns: {
            ...columns,
            [overContainer]: {
              ...columns[overContainer],
              deals: arrayMove(board.columns[overContainer].deals, activeIndex, overIndex),
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
      {boardId ? (
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
          <div className='box-border inline-grid grid-flow-col gap-4'>
            <SortableContext items={board.columnsOrder} strategy={horizontalListSortingStrategy}>
              {board.columnsOrder.map((columnId) => (
                <KanbanColumn
                  key={columnId}
                  id={columnId}
                  name={board.columns[columnId].columnTitle}
                  items={board.columns[columnId].deals}
                >
                  <SortableContext
                    items={board.columns[columnId].deals}
                    strategy={verticalListSortingStrategy}
                  >
                    {board.columns[columnId].deals.map((dealId, index) => (
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
            <Button
              variant='outlined'
              intent='default'
              className='h-fit min-w-[300px]'
              startIcon={<Iconify icon='ic:round-plus' height={24} />}
              onClick={() => setOpenDialog(true)}
            >
              {t('Add Section')}
            </Button>
          </div>
        </DndContext>
      ) : (
        <div>
          <h1>No Board</h1>
        </div>
      )}
      <Dialog open={openDialog} title={t('Add New Section')}>
        <CreateEditColumnForm
          // TODO: Add Edit Deal
          boardId={boardId || ''}
          currentColumn={null}
          isEdit={false}
          onSuccess={() => {
            setOpenDialog(false)
          }}
          onFailure={() => {
            setOpenDialog(false)
          }}
        />
      </Dialog>
    </div>
  )
}

export default DealsKanban

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const boardId = context.query?.boardId
  if (typeof boardId === 'string' && boardId.length > 0) {
    store.dispatch(getDealBoard.initiate(boardId))
  }

  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})
