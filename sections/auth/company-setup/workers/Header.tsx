import clsx from 'clsx'
import React from 'react'

export default function Header({
  column: { label, getHeaderProps, align },
}: {
  column: { label: string; align: string; getHeaderProps: () => object }
}) {
  return (
    <div
      {...getHeaderProps()}
      className={clsx(
        '!w-full truncate py-2 px-5 font-medium',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        align === 'left' && 'text-left'
      )}
    >
      {label}
    </div>
  )
}
