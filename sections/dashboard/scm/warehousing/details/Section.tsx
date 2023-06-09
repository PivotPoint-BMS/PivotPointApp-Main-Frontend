import React from 'react'
import clsx from 'clsx'
// types
import { WarehouseSection } from 'types'

function Section({ section }: { section: WarehouseSection }) {
  const width = `${50}%`

  return (
    <div className='group relative h-full w-full cursor-grab rounded-md bg-gray-300 ring-secondary-400 transition-all active:cursor-grabbing dark:bg-gray-400 '>
      <h1 className='absolute top-1/2 -left-2 -translate-y-1/2 cursor-pointer rounded-md bg-white p-2 font-semibold uppercase text-gray-900 shadow-xl group-hover:bg-secondary-400 group-hover:text-white'>
        {section.name}
      </h1>

      <div
        className={clsx('h-full  rounded-md bg-gray-500 dark:bg-gray-600')}
        style={{ width }}
      ></div>
    </div>
  )
}

export default Section
