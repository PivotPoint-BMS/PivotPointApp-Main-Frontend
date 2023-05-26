import React from 'react'
import clsx from 'clsx'

export interface CardHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode | string
  subheader?: React.ReactNode | string
  actions?: React.ReactNode
}

export default function CardHeader({
  title,
  className,
  actions,
  subheader,
  ...other
}: CardHeaderProps) {
  return (
    <div
      className={clsx('flex w-full items-start justify-between truncate p-4 pb-0', className)}
      {...other}
    >
      <div className='flex max-w-full flex-col whitespace-pre-wrap'>
        <h3 className='whitespace-pre-wrap font-semibold dark:text-white'>{title}</h3>
        {subheader && <p className='text-sm text-gray-600 dark:text-gray-400'>{subheader}</p>}
      </div>
      <div>{actions}</div>
    </div>
  )
}
