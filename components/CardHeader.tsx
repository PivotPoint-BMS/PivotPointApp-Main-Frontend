import React from "react"
import clsx from "clsx"

export interface CardHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
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
      className={clsx("flex w-full items-start justify-between truncate p-4 pb-0", className)}
      {...other}
    >
      <div className='flex max-w-full flex-col whitespace-pre-wrap'>
        <div className='whitespace-pre-wrap text-lg font-bold dark:text-white'>{title}</div>
        {subheader && <p className='text-sm text-gray-600 dark:text-gray-400'>{subheader}</p>}
      </div>
      <div>{actions}</div>
    </div>
  )
}
