import React from 'react'
import clsx from 'clsx'
// radix
import * as LabelPrimitive from '@radix-ui/react-label'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
// form
import { Controller, useFormContext } from 'react-hook-form'
// components
import { Icon as Iconify } from '@iconify/react'

interface CheckboxProps
  extends CheckboxPrimitive.CheckboxProps,
    React.RefAttributes<HTMLButtonElement> {
  name: string
}

export default function Checkbox({ name }: CheckboxProps) {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className='flex flex-wrap items-center justify-between'>
          <CheckboxPrimitive.Root
            id={name}
            checked={field.value}
            {...field}
            onCheckedChange={field.onChange}
            className={clsx(
              'flex h-5 w-5 items-center justify-center rounded',
              'data-[state=unchecked]:border data-[state=unchecked]:border-gray-400 data-[state=checked]:bg-primary-600 dark:data-[state=unchecked]:bg-transparent',
              'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
            )}
          >
            <CheckboxPrimitive.Indicator>
              <Iconify
                icon='material-symbols:check-small-rounded'
                className='h-4 w-4 self-center text-white'
              />
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>

          <LabelPrimitive.Label
            htmlFor='c1'
            className='ml-3 select-none text-rich-black dark:text-gray-100'
          >
            Remember me?
          </LabelPrimitive.Label>
        </div>
      )}
    />
  )
}
