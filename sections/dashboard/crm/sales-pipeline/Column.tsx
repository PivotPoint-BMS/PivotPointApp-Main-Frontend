import React from 'react'
import Card from 'components/Card'
import CardContent from 'components/CardContent'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import clsx from 'clsx'
import Droppable from './Droppable'
import Item from './Item'

export default function Column({
  id,
  items,
  isDragOverlay,
}: {
  id: string
  items: string[]
  isDragOverlay?: boolean
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
    data: {
      type: 'column',
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={clsx(isDragOverlay && 'cursor-grabbing')}
    >
      <Card>
        <CardContent className='w-72'>
          <Droppable id={id} items={items}>
            {items && items.map((item) => <Item id={item} />)}
          </Droppable>
        </CardContent>
      </Card>
    </div>
  )
}
