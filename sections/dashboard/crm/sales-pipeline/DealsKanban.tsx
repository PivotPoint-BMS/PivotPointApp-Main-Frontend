import React, { useState } from 'react'
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import Column from './Column'

const items = ['1', '2', '3', '4']
const subItems: { [key: string]: string[] } = {
  1: ['A1', 'B1', 'C1'],
  2: ['A2', 'B2', 'C2'],
  3: ['A3', 'B3', 'C3'],
}
export default function DealsKanban() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [activeType, setActiveType] = useState<string | null>(null)

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id.toString())
    setActiveType(event.active.data.current?.type)
    // console.log(event.active.data.current?.type)
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null)
    console.log(event.active.data.current?.type)
  }

  return (
    <div>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        // modifiers={[restrictToHorizontalAxis]}
      >
        <div className='scrollbar-none flex gap-4 overflow-scroll'>
          <SortableContext items={items}>
            {items.map((id: string) => (
              <Column key={id} id={id} items={subItems[id]} />
            ))}
          </SortableContext>
        </div>
        <DragOverlay>
          {activeId ? (
            <>
              {activeType === 'card' ? null : ( // <Item id={activeId} />
                <Column id={activeId} isDragOverlay items={subItems[activeId]} />
              )}
            </>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
