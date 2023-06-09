import React, { InputHTMLAttributes } from 'react'
import clsx from 'clsx'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string
  label?: string
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
  error?: {
    message: string
    type: string
  }
}

export default function TextField({
  label,
  name,
  type = 'text',
  startAdornment,
  endAdornment,
  error,
  disabled,
  className,
  ...other
}: TextFieldProps) {
  return (
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
          'border border-gray-400 outline-none ring-black transition-all focus-within:ring-1 hover:border-black',
          'dark:border-gray-600 dark:ring-white dark:hover:border-white',
          error &&
            '!border-red-500 !ring-red-500 focus-within:!border-red-500 hover:!border-red-500 dark:border-red-500 dark:focus-within:!border-red-500',
          disabled &&
            '!border-none !bg-gray-200 !text-gray-500 dark:!bg-gray-600 dark:!text-gray-400 dark:hover:bg-gray-600'
        )}
      >
        {startAdornment && (
          <span className='mx-2 text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white'>
            {startAdornment}
          </span>
        )}
        <input
          disabled={disabled}
          id={name}
          name={name}
          type={type}
          className={clsx(
            'w-full flex-1 rounded-lg border-none bg-transparent p-2 outline-none',
            className
          )}
          {...other}
        />
        {endAdornment && (
          <span className='mx-2 text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white'>
            {endAdornment}
          </span>
        )}
      </div>
      {error?.message && <span className='text-xs text-red-500'>{error?.message}</span>}
    </div>
  )
}
