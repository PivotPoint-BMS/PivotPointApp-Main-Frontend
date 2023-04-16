import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type SortableKanbanItemProps = {
  children: React.ReactNode
  id: string
}

const SortableTaskItem = ({ children, id }: SortableKanbanItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className='mb-2 w-56'>
      {children}
    </div>
  )
}

export default SortableTaskItem
