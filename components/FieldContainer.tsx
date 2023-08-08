import React from "react"
import clsx from "clsx"

interface FieldContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string
  label?: string
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
}

export default function FieldContainer({
  label,
  name,
  startAdornment,
  endAdornment,
  children,
}: FieldContainerProps) {
  return (
    <div className='group flex w-full flex-col gap-1'>
      <label htmlFor={name} className={clsx("text-sm font-medium dark:text-white")}>
        {label}
      </label>
      <div className={clsx("flex w-full items-center justify-center rounded-lg bg-transparent")}>
        {startAdornment && <span className='mx-2'>{startAdornment}</span>}
        {children}
        {endAdornment && <span className='mx-2'>{endAdornment}</span>}
      </div>
    </div>
  )
}
