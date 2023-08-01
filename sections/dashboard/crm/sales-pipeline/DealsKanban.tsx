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
  useChangeDealsColumsMutation,
  useDeleteDealBoardMutation,
  useGetDealBoardQuery,
  usePresistColumnOrderMutation,
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
import { AlertDialog, Button, Dialog } from 'components'
import { Item } from './Item'
import KanbanColumn from './KanbanColumn'
import SortableItem from './SortableItem'
import CreateEditColumnForm from './CreateEditColumnForm'
import CreateEditBoardForm from './CreateEditBoardForm'
import DealPreview from './DealPreview'

export const EMPTY_BOARD: DealBoardProps = {
  columns: {},
  columnsOrder: [],
  deals: {},
  dealBoards: {},
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

const DealsKanban = ({
  boardId,
  setBoardId,
}: {
  boardId: string | null
  setBoardId: (id: string | null) => void
}) => {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const { isFallback, pathname, push } = useRouter()

  const [openDialog, setOpenDialog] = useState(false)
  const [openEditBoardDialog, setOpenEditBoardDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const lastOverId = useRef<UniqueIdentifier | null>(null)
  const [clonedItems, setClonedItems] = useState<{
    [key: string]: DealBoardColumnProps
  } | null>(null)

  // Query
  const { data, isError, isLoading, isSuccess, isFetching } = useGetDealBoardQuery(
    boardId && boardId.length > 0 ? boardId : skipToken,
    {
      refetchOnMountOrArgChange: true,
      skip: isFallback,
    }
  )
  const [board, setBoard] = useState<DealBoardProps>(data || EMPTY_BOARD)

  // Mutations
  const [
    deleteBoard,
    { isError: isDeleteError, isLoading: isDeleteLoading, isSuccess: isDeleteSuccess },
  ] = useDeleteDealBoardMutation()
  const [presistColumnOrder, { isError: isPresistError }] = usePresistColumnOrderMutation()
  const [changeDealColumn, { isError: isDealEditError }] = useChangeDealsColumsMutation()

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

      const pointerIntersections = pointerWithin(args)
      const intersections =
        pointerIntersections.length > 0 ? pointerIntersections : rectIntersection(args)
      let overId = getFirstCollision(intersections, 'id')

      if (overId != null) {
        if (overId in board.columns) {
          const containerItems = board.columns[overId]

          if (containerItems.deals.length > 0) {
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

      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId
      }

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
      <KanbanColumn
        name={board.columns[columnId].columnTitle}
        id={''}
        boardId=''
        items={[]}
        type={board.columns[columnId].columnType}
        isDraggingOverlay
      >
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
      setBoard(({ columns, ..._board }: DealBoardProps) => {
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
              columnType: columns[overContainer].columnType,
              deals: columns[activeContainer].deals.filter((item) => item !== active.id),
            },
            [overContainer]: {
              id: columns[overContainer].id,
              columnTitle: columns[overContainer].columnTitle,
              columnType: columns[overContainer].columnType,
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
      setBoard(({ columnsOrder, ..._board }) => {
        const activeIndex = columnsOrder.indexOf(active.id)
        const overIndex = columnsOrder.indexOf(over.id)

        presistColumnOrder({
          boardId: boardId?.toLowerCase() || '',
          id: active.id.toString(),
          order: overIndex,
        })

        return {
          ..._board,
          columnsOrder: arrayMove(columnsOrder, activeIndex, overIndex),
        }
      })
    } else {
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
          setBoard(({ columns, ..._board }) => ({
            ..._board,
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
      changeDealColumn({
        boardId: boardId || '',
        id: active.id.toString(),
        columnId: activeContainer.toString(),
      })
    }
    setActiveId(null)
  }
  const handleDragCancel = () => {
    if (clonedItems) {
      // Reset items to their original state in case items have been
      // Dragged across containers
      setBoard(({ ..._board }) => ({
        ..._board,
        columns: clonedItems,
      }))
    }

    setActiveId(null)
    setClonedItems(null)
  }

  // Effects

  useEffect(() => {
    if (isError && boardId && boardId?.length > 0) {
      open({
        message: t('A problem has occurred.'),
        type: 'error',
        variant: 'contained',
      })
      setBoardId(null)
    }
    if (isSuccess) {
      setBoard(data)
      if (!boardId || (boardId && !(boardId in data.dealBoards))) {
        push(pathname, { query: { boardId: data.dealBoards[Object.keys(data.dealBoards)[0]].id } })
      }
    }
  }, [isError, isSuccess, isLoading, boardId, isFetching, data])

  useEffect(() => {
    if (isDeleteError) {
      open({
        message: t('A problem has occurred.'),
        type: 'error',
        variant: 'contained',
      })
    }
    if (isDeleteSuccess) {
      open({
        message: t('Pipeline Deleted Successfully.'),
        type: 'success',
        variant: 'contained',
      })
      setBoardId(null)
    }
  }, [isDeleteError, isDeleteSuccess, isDeleteLoading])

  useEffect(() => {
    if (isPresistError || isDealEditError) {
      open({
        message: t('A problem has occurred.'),
        type: 'error',
        variant: 'contained',
      })
    }
  }, [isPresistError, isDealEditError])

  return (
    <div>
      {boardId ? (
        <>
          <div className='mb-4 flex max-w-full items-center justify-between'>
            <h1 className='text-xl font-medium capitalize'>
              <span className='text-gray-600 dark:text-gray-400'>{t('Current Pipeline :')}</span>{' '}
              {board.dealBoards[boardId]?.title}
            </h1>
            <div className='flex max-w-full items-center gap-2'>
              <Button
                variant='outlined'
                intent='error'
                startIcon={<Iconify icon='ic:round-delete' height={18} />}
                onClick={() => setOpenDeleteDialog(true)}
              >
                {t('Delete')}
              </Button>
              <Button
                variant='outlined'
                intent='default'
                startIcon={<Iconify icon='ic:round-edit' height={18} />}
                onClick={() => setOpenEditBoardDialog(true)}
              >
                {t('Edit')}
              </Button>
            </div>
          </div>
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
            <div className='scrollbar-none box-border inline-grid max-w-full grid-flow-col gap-4 overflow-x-scroll'>
              <SortableContext items={board.columnsOrder} strategy={horizontalListSortingStrategy}>
                {board.columnsOrder.map((columnId) => (
                  <KanbanColumn
                    key={columnId}
                    id={columnId}
                    boardId={boardId}
                    name={board.columns[columnId].columnTitle}
                    type={board.columns[columnId].columnType}
                    items={board.columns[columnId].deals}
                  >
                    <SortableContext
                      items={board.columns[columnId].deals}
                      strategy={verticalListSortingStrategy}
                    >
                      {board.columns[columnId].deals.map((dealId, index) =>
                        board.deals[dealId] ? (
                          <SortableItem
                            disabled={isSortingContainer}
                            key={dealId}
                            id={dealId}
                            index={index}
                            containerId={columnId}
                            getIndex={getIndex}
                            deal={board.deals[dealId]}
                          />
                        ) : null
                      )}
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
        </>
      ) : (
        <div className='flex items-center justify-center'>
          <h1>{t('No Pipeline')}</h1>
        </div>
      )}
      <Dialog open={openDialog} title={t('Add New Section')}>
        <CreateEditColumnForm
          // TODO: Edit Deal
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
      <AlertDialog
        title={t('Confirm Delete')}
        description={
          <p className='mb-4 text-sm text-red-600 dark:text-red-400'>
            {t('This action cannot be undone. All section and deals will be permanently deleted.')}
          </p>
        }
        cancelText={t('Cancel')}
        confirmText={t('Yes, Delete')}
        onConfirm={() => {
          if (boardId) {
            deleteBoard(boardId)
            setOpenDeleteDialog(false)
          }
        }}
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        buttonProps={{ intent: 'error' }}
      />
      <Dialog open={openEditBoardDialog} title={t('Edit Pipeline')}>
        <CreateEditBoardForm
          currentBoard={boardId ? board.dealBoards[boardId] : null}
          isEdit={true}
          onSuccess={() => {
            setOpenEditBoardDialog(false)
          }}
          onFailure={() => {
            setOpenEditBoardDialog(false)
          }}
        />
      </Dialog>
      <DealPreview boardId={boardId || ''} />
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
