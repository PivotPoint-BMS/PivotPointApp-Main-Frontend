import React, { InputHTMLAttributes, forwardRef } from 'react'
import clsx from 'clsx'

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  name?: string
  label?: string
  rows?: number
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
  error?: {
    message: string
    type: string
  }
  inputClassName: string
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({
    label,
    name,
    rows = 4,
    startAdornment,
    endAdornment,
    error,
    disabled,
    inputClassName,
    ...other
  }) => (
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
          'border border-gray-400 outline-none focus-within:border-black hover:border-black',
          'dark:border-gray-600 dark:focus-within:border-white dark:hover:border-white',
          error &&
            '!border-red-500 focus-within:!border-black hover:!border-red-500 dark:border-red-500 dark:focus-within:!border-red-500',
          disabled &&
            '!border-none !bg-gray-200 !text-gray-500 dark:!bg-gray-600 dark:!text-gray-400 dark:hover:bg-gray-600'
        )}
      >
        {startAdornment && <span className='mx-2'>{startAdornment}</span>}
        <textarea
          {...other}
          rows={rows}
          id={name}
          name={name}
          disabled={disabled}
          className={clsx('flex-1 rounded-lg bg-transparent p-2 outline-none', inputClassName)}
        />
        {endAdornment && <span className='mx-2'>{endAdornment}</span>}
      </div>
      {error?.message && <span className='text-xs text-red-500'>{error?.message}</span>}
    </div>
  )
)

export default TextArea
