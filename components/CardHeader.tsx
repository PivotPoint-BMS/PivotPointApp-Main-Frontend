import React from 'react'
import clsx from 'clsx'

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
}

export default function CardHeader({ title, className, ...other }: CardHeaderProps) {
  return (
    <div className={clsx('w-full p-4', className)} {...other}>
      <h3 className='w-max font-semibold dark:text-white'>{title}</h3>
    </div>
  )
}
