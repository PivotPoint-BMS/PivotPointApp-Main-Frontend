import React from 'react'
import clsx from 'clsx'
import { Controller, useFormContext } from 'react-hook-form'

interface RHFFieldContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  label?: string
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
}

export default function RHFFieldContainer({
  label,
  name,
  startAdornment,
  endAdornment,
  children,
}: RHFFieldContainerProps) {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error } }) => (
        <div className='group flex w-full flex-col gap-1'>
          <label
            htmlFor={name}
            className={clsx('text-sm font-medium dark:text-white', error && 'text-red-500')}
          >
            {label}
          </label>
          <div
            className={clsx(
              'flex w-full items-center justify-center rounded-lg bg-transparent',
              error &&
                '!border-red-500 focus-within:!border-black hover:!border-current dark:border-red-500'
            )}
          >
            {startAdornment && <span className='mx-2'>{startAdornment}</span>}
            {children}
            {endAdornment && <span className='mx-2'>{endAdornment}</span>}
          </div>
          {error?.message && <span className='text-xs text-red-500'>{error.message}</span>}
        </div>
      )}
    />
  )
}
