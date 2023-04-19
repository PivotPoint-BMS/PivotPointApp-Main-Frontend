import clsx from 'clsx'
import React, { InputHTMLAttributes } from 'react'
// hooks
// form
import { Controller, useFormContext } from 'react-hook-form'

interface RHFTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  type?:
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
}

export default function RHFTextField({
  label,
  name,
  type = 'text',
  startAdornment,
  endAdornment,
  disabled,
  ...other
}: RHFTextFieldProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className='group flex w-full flex-col gap-1'>
          <label
            htmlFor={name}
            className={clsx(
              'text-sm font-medium text-gray-800 dark:text-gray-200',
              error && 'text-red-500'
            )}
          >
            {label}
          </label>
          <div
            className={clsx(
              'flex w-full items-center justify-center rounded-lg bg-transparent',
              'outline outline-1 outline-gray-400 focus-within:outline-2 focus-within:outline-primary-600 hover:outline-primary-600',
              'dark:outline-gray-300 dark:focus-within:outline-primary-300 dark:hover:outline-primary-300',
              error &&
                '!outline-red-500 focus-within:outline-red-500 hover:outline-red-500 dark:outline-red-500',
              disabled && '!bg-gray-400 !outline-none dark:!bg-gray-600 dark:hover:bg-gray-600'
            )}
          >
            {startAdornment && <span className='mx-2'>{startAdornment}</span>}
            <input
              {...field}
              {...other}
              disabled={disabled}
              id={name}
              name={name}
              type={type}
              className='w-full flex-1 rounded-lg bg-transparent p-2 outline-none'
            />
            {endAdornment && <span className='mx-2'>{endAdornment}</span>}
          </div>
          {error?.message && <span className='text-xs text-red-500'>{error?.message}</span>}
        </div>
      )}
    />
  )
}
