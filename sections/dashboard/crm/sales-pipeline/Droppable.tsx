import React, { ReactNode } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import Item from './Item'

export default function Droppable({
  id,
  items,
}: {
  id: string
  children: ReactNode
  items: string[]
}) {
  const { setNodeRef } = useDroppable({
    id: `droppable-${id}`,
    data: {
      accepts: ['card'],
    },
  })

  return (
    <div ref={setNodeRef}>
      <SortableContext items={items || []}>
        {items.map((item) => (
          <Item id={item} />
        ))}
      </SortableContext>
    </div>
  )
}
