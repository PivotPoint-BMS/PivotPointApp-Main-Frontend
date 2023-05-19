/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { HeaderProps } from 'react-table'

export default function Header({
  column: { label, getHeaderProps },
}: {
  column: { id: string; label: string; getHeaderProps: () => HeaderProps<any> }
  dataDispatch: (props: { type: string; columnId: string }) => void
}) {
  return (
    <div {...getHeaderProps()} className='!w-full truncate p-2 font-medium'>
      {label}
    </div>
  )
}
