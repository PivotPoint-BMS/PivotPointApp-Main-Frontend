import clsx from 'clsx'
// dnd
import type { DraggableSyntheticListeners, UniqueIdentifier } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import { Button, Card, CardContent, CardHeader, IconButton } from 'components'
import { Icon as Iconify } from '@iconify/react'
import { AnimateLayoutChanges, defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable'

interface KanbanColumnProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'id'> {
  id: UniqueIdentifier
  name?: string
  listeners?: DraggableSyntheticListeners
  disabled?: boolean
  items: UniqueIdentifier[]
}

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true })

export default function KanbanColumn({
  name,
  children,
  disabled,
  id,
  items,
  ...props
}: KanbanColumnProps) {
  const { t } = useTranslate()
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
      <Card className={clsx('min-w-[250px]', isOverContainer && 'bg-gray-100')}>
        <CardHeader
          title={name || ''}
          actions={
            <IconButton
              ref={setActivatorNodeRef}
              {...listeners}
              tabIndex={0}
              className='cursor-grab fill-gray-500'
            >
              <svg viewBox='0 0 20 20' width='12'>
                <path d='M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z'></path>
              </svg>
            </IconButton>
          }
        />
        <CardContent className='flex flex-col gap-2'>
          {children}
          <Button
            className='mt-4 w-full'
            variant='text'
            size='large'
            startIcon={<Iconify icon='ic:round-plus' height={24} />}
          >
            {t('Add Deal')}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
