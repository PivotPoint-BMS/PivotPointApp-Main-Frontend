import clsx from 'clsx'
import React from 'react'
// form
import { Controller, useFormContext } from 'react-hook-form'

interface TextFieldProps extends React.HTMLAttributes<HTMLInputElement> {
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
}

export default function TextField({ label, name, type = 'text', ...other }: TextFieldProps) {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className='group mb-5 flex w-full flex-col gap-1'>
          <label
            htmlFor={name}
            className={clsx('font-medium dark:text-white', error && 'text-red-500')}
          >
            {label}
          </label>
          <input
            {...field}
            {...other}
            id={name}
            name={name}
            type={type}
            className={clsx(
              'rounded-xl bg-transparent p-3',
              'outline outline-1  outline-gray-400 hover:outline-primary-600 focus:outline-2 focus:outline-primary-600 dark:outline-gray-300',
              error &&
                'outline-red-400 hover:outline-red-500 focus:outline-red-400 dark:outline-red-500'
            )}
          />
          {error?.message && <span className='text-xs text-red-500'>{error?.message}</span>}
        </div>
      )}
    />
  )
}
