import React from 'react'
import clsx from 'clsx'

export interface CardHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode | string
  actions?: React.ReactNode
}

export default function CardHeader({ title, className, actions, ...other }: CardHeaderProps) {
  return (
    <div
      className={clsx('flex w-full items-center justify-between truncate p-4 pb-0', className)}
      {...other}
    >
      <h3 className='max-w-full whitespace-normal font-semibold dark:text-white'>{title}</h3>
      <div>{actions}</div>
    </div>
  )
}
