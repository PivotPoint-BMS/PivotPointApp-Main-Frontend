import React from 'react'

export default function Header({
  column: { label, getHeaderProps },
}: {
  column: { label: string; getHeaderProps: () => object }
}) {
  return (
    <div {...getHeaderProps()} className='!w-full truncate p-2 font-medium'>
      {label}
    </div>
  )
}
