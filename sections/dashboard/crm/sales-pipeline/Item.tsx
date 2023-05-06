import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import clsx from 'clsx'
import Card from 'components/Card'
import CardContent from 'components/CardContent'

export default function Item({ id, isDragOverlay }: { id: string; isDragOverlay?: boolean }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: {
      type: 'card',
    },
  })
  const style = {
    transform: CSS.Transform.toString(transform),
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={clsx(isDragOverlay && 'cursor-grabbing')}
    >
      <Card fullWidth>
        <CardContent>{id}</CardContent>
      </Card>
    </div>
  )
}
