import React from 'react'
// dnd
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
// types
import { Deal } from 'types'
// components
import SortableKanbanItem from './KanbanItem'
import Card from '@/components/Card'
import CardContent from '@/components/CardContent'
import CardHeader from '@/components/CardHeader'
import DealItem from './DealItem'

type KanbanColumnProps = {
  id: string
  title: string
  deals: Deal[]
}

const KanbanColumn = ({ id, title, deals }: KanbanColumnProps) => {
  const { setNodeRef } = useDroppable({
    id,
  })

  const {
    attributes,
    listeners,
    setNodeRef: setSortableNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  }

  return (
    <Card
      className='!bg-gray-50 dark:!bg-transparent'
      fullWidth
      ref={setSortableNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <CardHeader title={title} className='text-lg font-semibold capitalize' />
      <CardContent>
        <SortableContext id={id} items={deals} strategy={verticalListSortingStrategy}>
          <div ref={setNodeRef} className='min-w-[14rem]'>
            {deals.map((deal) => (
              <SortableKanbanItem id={deal.id}>
                <DealItem deal={deal} />
              </SortableKanbanItem>
            ))}
          </div>
        </SortableContext>
      </CardContent>
    </Card>
  )
}

export default KanbanColumn
