import { Card } from "../Card"

export default function SkeletonKanbanColumn() {
  return (
    <div className='grid grid-cols-4 gap-1'>
      {[...Array(3)].map((_, index) => (
        <Card variant='outlined' key={index} className='w-80 p-1'>
          <div className='flex flex-col items-center justify-center gap-2'>
            <div className='h-full w-full rounded bg-gray-600 pt-6' />
            {index === 0 && <div className='h-full w-full rounded bg-gray-600 pt-6' />}
            {index !== 2 && <div className='h-full w-full rounded bg-gray-600 pt-6' />}
          </div>
        </Card>
      ))}
    </div>
  )
}
