import React from 'react'
import { UseDroppableArguments, useDroppable } from '@dnd-kit/core'

interface DroppableProps extends React.HTMLAttributes<HTMLDivElement> {
  useDroppableArgumant: UseDroppableArguments
}

export default function Droppable({ useDroppableArgumant, ...props }: DroppableProps) {
  const { setNodeRef } = useDroppable({
    ...useDroppableArgumant,
  })

  return <div ref={setNodeRef}>{props.children}</div>
}
