import React from 'react'
// dnd
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
// types
import { Deal } from 'types'
// components
import Card from 'components/Card'
import CardContent from 'components/CardContent'
import CardHeader from 'components/CardHeader'
import SortableKanbanItem from './SortableItem'
import DealItem from './DealItem'
import SortableColumn from './SortableColumn'

type KanbanColumnProps = {
  id: string
  title: string
  deals: Deal[]
}

const KanbanColumn = ({ id, title, deals }: KanbanColumnProps) => {
  const { setNodeRef } = useDroppable({
    id,
  })

  return (
    <SortableColumn id={id}>
      <Card className='!bg-gray-50 dark:!bg-transparent ' fullWidth>
        <CardHeader title={title} className='text-lg font-semibold capitalize' />
        <CardContent>
          <SortableContext id={id} items={deals} strategy={verticalListSortingStrategy}>
            <div ref={setNodeRef} className='min-w-[14rem]'>
              {deals &&
                deals.map((deal) => (
                  <SortableKanbanItem id={deal.id} key={deal.id}>
                    <DealItem deal={deal} />
                  </SortableKanbanItem>
                ))}
            </div>
          </SortableContext>
        </CardContent>
      </Card>
    </SortableColumn>
  )
}

export default KanbanColumn
