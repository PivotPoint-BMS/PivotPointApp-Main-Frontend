/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import clsx from 'clsx'
import { HeaderProps } from 'react-table'
// hooks
import useTranslate from 'hooks/useTranslate'

export default function Header({
  column: { label, getHeaderProps, align },
}: {
  column: { id: string; label: string; align: string; getHeaderProps: () => HeaderProps<any> }
  dataDispatch: (props: { type: string; columnId: string }) => void
}) {
  const { t } = useTranslate()
  return (
    <div
      {...getHeaderProps()}
      className={clsx(
        '!w-full truncate py-2 px-5 font-medium',
        align === 'center' && 'text-center',
        align === 'right' && 'ltr:text-right rtl:text-left',
        align === 'left' && 'ltr:text-left rtl:text-right'
      )}
    >
      {t(label)}
    </div>
  )
}
