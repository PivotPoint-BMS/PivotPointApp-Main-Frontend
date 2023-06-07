import clsx from 'clsx'
import React, { InputHTMLAttributes } from 'react'
// hooks
// form
import { Controller, useFormContext } from 'react-hook-form'

interface RHFTextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string
  label: string
  rows?: number
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
}

export default function RHFTextArea({
  label,
  name,
  startAdornment,
  endAdornment,
  rows = 4,
  disabled,
  ...other
}: RHFTextAreaProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
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
              'border border-gray-400 outline-none ring-black transition-all focus-within:ring-1 hover:border-black',
              'dark:border-gray-600 dark:ring-white dark:hover:border-white',
              error &&
                '!border-red-500 !ring-red-500 focus-within:!border-red-500 hover:!border-red-500 dark:border-red-500 dark:focus-within:!border-red-500',
              disabled &&
                '!border-none !bg-gray-200 !text-gray-500 dark:!bg-gray-600 dark:!text-gray-400 dark:hover:bg-gray-600'
            )}
          >
            {startAdornment && <span className='mx-2'>{startAdornment}</span>}
            <textarea
              rows={rows}
              {...field}
              {...other}
              id={name}
              name={name}
              className='flex-1 rounded-lg bg-transparent p-2 outline-none'
            />
            {endAdornment && <span className='mx-2'>{endAdornment}</span>}
          </div>
          {error?.message && <span className='text-xs text-red-500'>{error?.message}</span>}
        </div>
      )}
    />
  )
}
