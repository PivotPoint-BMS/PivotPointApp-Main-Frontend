import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
// dnd
import type { DraggableSyntheticListeners, UniqueIdentifier } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// api
import {
  useDeleteDealBoardColumnMutation,
  useEditDealBoardColumnMutation,
  useMakeFailureColumnMutation,
  useMakeNormalColumnMutation,
  useMakeSuccessColumnMutation,
} from 'store/api/crm/sales-pipeline/dealsBoardsApi'
// components
import {
  AlertDialog,
  Backdrop,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DropdownMenu,
  IconButton,
} from 'components'
import { Icon } from '@iconify/react'
import { AnimateLayoutChanges, defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable'
import CreateDealForm from './CreateDealForm'

interface KanbanColumnProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'id'> {
  id: UniqueIdentifier
  boardId: string
  name?: string
  listeners?: DraggableSyntheticListeners
  disabled?: boolean
  items: UniqueIdentifier[]
  isDraggingOverlay?: boolean
  type: 0 | 1 | 2
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
  boardId,
  type,
  ...props
}: KanbanColumnProps) {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const [deleteColumn, { isError, isSuccess, isLoading }] = useDeleteDealBoardColumnMutation()
  const [makeFailure, { isLoading: isFailureLoading }] = useMakeFailureColumnMutation()
  const [makeNormal, { isLoading: isNormalLoading }] = useMakeNormalColumnMutation()
  const [makeSuccess, { isLoading: isSuccessLoading }] = useMakeSuccessColumnMutation()
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [editColumn, { isError: isEditError, isSuccess: isEditSuccess }] =
    useEditDealBoardColumnMutation()
  const [openDialog, setOpenDialog] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)
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
        message: t('Sorry, Section not deleted, A problem has occurred.'),
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

  useEffect(() => {
    if (isEditError) {
      open({
        message: t('Sorry, Section not updated, A problem has occurred.'),
        autoHideDuration: 4000,
        type: 'error',
        variant: 'contained',
      })
    }
    if (isEditSuccess) {
      open({
        message: t('Section Updated Successfully.'),
        autoHideDuration: 4000,
        type: 'success',
        variant: 'contained',
      })
    }
  }, [isEditError, isEditSuccess])

  useEffect(() => {
    if (isEditing) inputRef.current?.focus()
  }, [isEditing])

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
          'w-80 cursor-default transition-all',
          isOverContainer && 'bg-gray-100',
          isDraggingOverlay && 'scale-105 shadow-lg',
          type === 1 && '!bg-green-200 dark:!bg-green-900/80',
          type === 2 && '!bg-red-200 dark:!bg-red-900/80'
        )}
      >
        <CardHeader
          title={
            <input
              type='text'
              defaultValue={name}
              onBlur={(e) => {
                if (e.target.value === '' || e.target.value === name) {
                  setIsEditing(false)
                  return
                }
                editColumn({ columnTitle: e.target.value, id: id.toString(), boardId })
                setIsEditing(false)
              }}
              className='w-full rounded-md bg-transparent py-1 outline-2 outline-offset-0 outline-black transition-all focus-within:px-1 hover:px-1 hover:outline active:outline dark:outline-white'
              ref={inputRef}
            />
          }
          actions={
            <div className='flex items-center justify-center gap-2'>
              <DropdownMenu
                items={[
                  {
                    type: 'button',
                    icon: (
                      <Icon
                        icon='material-symbols:circle'
                        className='text-green-600 dark:text-green-400'
                        height={14}
                      />
                    ),
                    label: t('Make Succes Column'),
                    onClick: () =>
                      makeSuccess({ boardId, id: id.toString() })
                        .then(() =>
                          open({
                            message: t('Section Updated Successfully.'),
                            autoHideDuration: 4000,
                            type: 'success',
                            variant: 'contained',
                          })
                        )
                        .catch(() =>
                          open({
                            message: t('Sorry, Section not updated, A problem has occurred.'),
                            autoHideDuration: 4000,
                            type: 'error',
                            variant: 'contained',
                          })
                        ),
                  },
                  {
                    type: 'button',
                    icon: (
                      <Icon
                        icon='material-symbols:circle'
                        className='text-red-600 dark:text-red-400'
                        height={14}
                      />
                    ),
                    label: t('Make Failure Column'),
                    onClick: () =>
                      makeFailure({ boardId, id: id.toString() })
                        .then(() =>
                          open({
                            message: t('Section Updated Successfully.'),
                            autoHideDuration: 4000,
                            type: 'success',
                            variant: 'contained',
                          })
                        )
                        .catch(() =>
                          open({
                            message: t('Sorry, Section not updated, A problem has occurred.'),
                            autoHideDuration: 4000,
                            type: 'error',
                            variant: 'contained',
                          })
                        ),
                  },
                  {
                    type: 'button',
                    icon: (
                      <Icon
                        icon='material-symbols:circle'
                        className='text-black dark:text-white'
                        height={14}
                      />
                    ),
                    label: t('Make Normal Column'),
                    onClick: () =>
                      makeNormal({ boardId, id: id.toString() })
                        .then(() =>
                          open({
                            message: t('Section Updated Successfully.'),
                            autoHideDuration: 4000,
                            type: 'success',
                            variant: 'contained',
                          })
                        )
                        .catch(() =>
                          open({
                            message: t('Sorry, Section not updated, A problem has occurred.'),
                            autoHideDuration: 4000,
                            type: 'error',
                            variant: 'contained',
                          })
                        ),
                  },
                  {
                    type: 'button',
                    icon: (
                      <Icon
                        icon='ic:round-delete'
                        className='text-red-600 dark:text-red-400'
                        height={18}
                      />
                    ),
                    label: t('Delete'),
                    onClick: () => setOpenDeleteDialog(true),
                  },
                ]}
                trigger={
                  <IconButton>
                    <Icon icon='material-symbols:more-vert' height={18} />
                  </IconButton>
                }
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
                <Icon icon='ci:move-horizontal' />
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
            intent='default'
            startIcon={<Icon icon='ic:round-plus' height={24} />}
            onClick={() => setOpenDialog(true)}
          >
            {t('Add Deal')}
          </Button>
        </CardContent>
      </Card>
      <Dialog open={openDialog} title={t('Add New Deal')}>
        <CreateDealForm
          columnId={id.toString()}
          boardId={boardId}
          isEdit={false}
          onSuccess={() => {
            setOpenDialog(false)
          }}
          onFailure={() => {
            setOpenDialog(false)
          }}
        />
      </Dialog>
      <Backdrop
        open={isLoading || isFailureLoading || isNormalLoading || isSuccessLoading}
        loading={isLoading || isFailureLoading || isNormalLoading || isSuccessLoading}
      />
      <AlertDialog
        title={t('Confirm Delete')}
        description={
          <p className='mb-4 text-sm text-red-600 dark:text-red-400'>
            {t('This action cannot be undone. this section will be permanently deleted.')}
          </p>
        }
        cancelText={t('Cancel')}
        confirmText={t('Yes, Delete')}
        onConfirm={() => {
          deleteColumn({ id: id.toString(), boardId })
          setOpenDeleteDialog(false)
        }}
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        buttonProps={{ intent: 'error' }}
      />
    </div>
  )
}
