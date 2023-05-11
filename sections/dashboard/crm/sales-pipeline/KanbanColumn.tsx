import clsx from 'clsx'
// dnd
import type { DraggableSyntheticListeners, UniqueIdentifier } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// api
import {
  invalidateTags,
  useDeleteDealBoardColumnMutation,
} from 'store/api/crm/sales-pipeline/dealsBoardsApi'
// components
import {
  Backdrop,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DropdownMenu,
  IconButton,
  Tooltip,
} from 'components'
import { Icon as Iconify } from '@iconify/react'
import { AnimateLayoutChanges, defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import CreateEditDealForm from './CreateEditDealForm'

interface KanbanColumnProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'id'> {
  id: UniqueIdentifier
  name?: string
  listeners?: DraggableSyntheticListeners
  disabled?: boolean
  items: UniqueIdentifier[]
  isDraggingOverlay?: boolean
}

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true })

export default function KanbanColumn({
  name,
  children,
  disabled,
  id,
  items,
  isDraggingOverlay,
  ...props
}: KanbanColumnProps) {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const [deleteColumn, { isError, isSuccess, isLoading }] = useDeleteDealBoardColumnMutation()
  const [openDialog, setOpenDialog] = useState(false)
  const {
    active,
    attributes,
    isDragging,
    listeners,
    over,
    setNodeRef,
    transition,
    transform,
    setActivatorNodeRef,
  } = useSortable({
    id,
    data: {
      type: 'container',
      children: items,
    },
    animateLayoutChanges,
  })

  const isOverContainer = over
    ? (id === over.id && active?.data.current?.type !== 'container') || items.includes(over.id)
    : false

  useEffect(() => {
    if (isError) {
      open({
        message: t('Sorry, Section not deleted, A problem has occured.'),
        autoHideDuration: 4000,
        type: 'error',
        variant: 'contained',
      })
    }
    if (isSuccess) {
      open({
        message: t('Section Deleted Successfully.'),
        autoHideDuration: 4000,
        type: 'success',
        variant: 'contained',
      })
    }
  }, [isError, isSuccess])

  return (
    <div
      ref={disabled ? undefined : setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : undefined,
      }}
      {...attributes}
      {...props}
    >
      <Card
        variant='outlined-dashed'
        className={clsx(
          'min-w-[300px] transition-all',
          isOverContainer && 'bg-gray-100',
          isDraggingOverlay && 'scale-105 shadow-lg'
        )}
      >
        <CardHeader
          title={name || ''}
          actions={
            <div className='flex items-center justify-center gap-2'>
              <DropdownMenu
                trigger={
                  <div>
                    <Tooltip title={t('Options')} side='bottom' sideOffset={10}>
                      <IconButton>
                        <Iconify icon='material-symbols:more-horiz' height={18} />
                      </IconButton>
                    </Tooltip>
                  </div>
                }
                items={[
                  {
                    type: 'button',
                    label: 'Edit',
                    icon: <Iconify icon='material-symbols:edit' height={18} />,
                    onClick: () => {},
                  },
                  {
                    type: 'button',
                    label: 'Delete',
                    icon: <Iconify icon='material-symbols:delete-rounded' height={18} />,
                    className: 'text-red-600',
                    onClick: () => {
                      deleteColumn(id.toString())
                      invalidateTags(['DealsBoards'])
                    },
                  },
                ]}
              />
              <IconButton
                ref={setActivatorNodeRef}
                tabIndex={0}
                className={clsx(
                  'cursor-grab fill-gray-600 dark:fill-gray-300',
                  isDragging && 'cursor-grabbing'
                )}
                {...listeners}
              >
                <svg viewBox='0 0 20 20' width='12'>
                  <path d='M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z'></path>
                </svg>
              </IconButton>
            </div>
          }
        />
        <CardContent className='flex flex-col gap-2'>
          {children}
          <Button
            className='mt-4 w-full'
            variant='text'
            size='large'
            startIcon={<Iconify icon='ic:round-plus' height={24} />}
            onClick={() => setOpenDialog(true)}
          >
            {t('Add Deal')}
          </Button>
        </CardContent>
      </Card>
      <Dialog open={openDialog} title={t('Add New Deal')}>
        <CreateEditDealForm
          // TODO: Add Edit Deal
          columnId={id.toString()}
          currentDeal={null}
          isEdit={false}
          onSuccess={() => {
            setOpenDialog(false)
          }}
          onFailure={() => {
            setOpenDialog(false)
          }}
        />
      </Dialog>
      <Backdrop open={isLoading} loading={isLoading} />
    </div>
  )
}
