import React from 'react'
import clsx from 'clsx'
// hooks
import useTranslate from 'hooks/useTranslate'

export default function Header({
  column: { label, getHeaderProps, align },
}: {
  column: { label: string; align: string; getHeaderProps: () => object }
}) {
  const { t } = useTranslate()
  return (
    <div
      {...getHeaderProps()}
      className={clsx(
        '!w-full truncate py-2 px-5 font-bold',
        align === 'center' && 'text-center',
        align === 'right' && 'ltr:text-right rtl:text-left',
        align === 'left' && 'ltr:text-left rtl:text-right'
      )}
    >
      {t(label)}
    </div>
  )
}
