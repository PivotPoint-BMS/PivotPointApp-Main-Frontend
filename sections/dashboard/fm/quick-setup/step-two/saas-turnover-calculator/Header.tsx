/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx'
import React from 'react'
import { HeaderProps } from 'react-table'

export default function Header({
  column: { label, getHeaderProps, align },
}: {
  column: { id: string; label: string; align: string; getHeaderProps: () => HeaderProps<any> }
  dataDispatch: (props: { type: string; columnId: string }) => void
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
