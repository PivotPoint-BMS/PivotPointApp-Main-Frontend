import React, { InputHTMLAttributes } from 'react'
import clsx from 'clsx'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
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
  ...other
}: TextFieldProps) {
  return (
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
          'outline outline-1 outline-gray-400 focus-within:outline-2 focus-within:outline-primary-600 hover:outline-primary-600',
          'dark:outline-gray-300 dark:focus-within:outline-primary-300 dark:hover:outline-primary-300',
          error &&
            '!outline-red-500 focus-within:outline-red-500 hover:outline-red-500 dark:outline-red-500'
        )}
      >
        {startAdornment && <span className='mx-2'>{startAdornment}</span>}
        <input
          {...other}
          id={name}
          name={name}
          type={type}
          className='flex-1 rounded-lg bg-transparent p-2 outline-none'
        />
        {endAdornment && <span className='mx-2'>{endAdornment}</span>}
      </div>
      {error?.message && <span className='text-xs text-red-500'>{error?.message}</span>}
    </div>
  )
}