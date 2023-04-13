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

type KanbanColumnProps = {
  id: string
  title: string
  tasks: Deal[]
}

const KanbanColumn = ({ id, title, tasks }: KanbanColumnProps) => {
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
      className='h-fit'
      fullWidth
      ref={setSortableNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <CardHeader title={title} className='text-lg font-semibold capitalize' />
      <CardContent>
        <SortableContext id={id} items={tasks} strategy={verticalListSortingStrategy}>
          <div ref={setNodeRef} className='min-w-[14rem]'>
            {tasks.map((task) => (
              <SortableKanbanItem id={task.id}>
                <Card className='mb-3 w-56'>
                  <CardContent>{task.title}</CardContent>
                </Card>
              </SortableKanbanItem>
            ))}
          </div>
        </SortableContext>
      </CardContent>
    </Card>
  )
}

export default KanbanColumn
