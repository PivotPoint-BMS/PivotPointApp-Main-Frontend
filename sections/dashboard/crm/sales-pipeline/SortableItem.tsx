// dnd
import type { UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
// types
import { Deal } from 'types'
// hooks
import useMountStatus from 'hooks/useMountStatus'
import { Item } from './Item'

interface SortableItemProps {
  containerId: UniqueIdentifier
  id: UniqueIdentifier
  index: number
  disabled?: boolean
  getIndex(id: UniqueIdentifier): number
  deal: Deal
}

export default function SortableItem({ disabled, id, deal, index }: SortableItemProps) {
  const {
    setNodeRef,
    listeners,
    isDragging,
    isSorting,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({
    id,
    data: {
      type: 'card',
    },
  })
  const mounted = useMountStatus()
  const mountedWhileDragging = isDragging && !mounted

  return (
    <Item
      ref={disabled ? undefined : setNodeRef}
      deal={deal}
      dragging={isDragging}
      sorting={isSorting}
      index={index}
      transition={transition}
      transform={transform}
      fadeIn={mountedWhileDragging}
      listeners={listeners}
      handleProps={{ ref: setActivatorNodeRef }}
    />
  )
}
