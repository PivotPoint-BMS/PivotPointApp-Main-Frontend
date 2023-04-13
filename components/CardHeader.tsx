import React from 'react'
import clsx from 'clsx'

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  actions?: React.ReactNode
}

export default function CardHeader({ title, className, actions, ...other }: CardHeaderProps) {
  return (
    <div
      className={clsx('flex w-full items-center justify-between truncate p-4', className)}
      {...other}
    >
      <h3 className='w-max font-semibold dark:text-white'>{title}</h3>
      <div>{actions}</div>
    </div>
  )
}
