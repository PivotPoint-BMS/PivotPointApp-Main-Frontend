/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { HeaderProps } from 'react-table'

export default function Header({
  column: { id, label, getHeaderProps },
  dataDispatch,
}: {
  column: { id: string; label: string; getHeaderProps: () => HeaderProps<any> }
  dataDispatch: (props: { type: string; columnId: string }) => void
}) {
  return id !== '999999' ? (
    <div {...getHeaderProps()} className='!w-full truncate p-2 font-medium'>
      {label}
    </div>
  ) : (
    <div {...getHeaderProps()} className='w-5 select-none'>
      <div
        className='th-content'
        style={{ display: 'flex', justifyContent: 'center' }}
        onClick={() => dataDispatch({ type: 'add_column_to_left', columnId: '999999' })}
      >
        <span className='svg-icon-sm svg-gray'>+</span>
      </div>
    </div>
  )
}
