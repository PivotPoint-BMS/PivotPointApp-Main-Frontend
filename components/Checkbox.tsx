import React from 'react'
// radix
import * as LabelPrimitive from '@radix-ui/react-label'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
// components
import { Icon as Iconify } from '@iconify/react'

interface CheckboxProps
  extends CheckboxPrimitive.CheckboxProps,
    React.RefAttributes<HTMLButtonElement> {
  name: string
  label: string
}

export default function Checkbox({ label, id }: CheckboxProps) {
  return (
    <>
      <CheckboxPrimitive.Indicator>
        <Iconify
          icon='material-symbols:check-small-rounded'
          className='h-4 w-4 self-center text-white'
        />
      </CheckboxPrimitive.Indicator>
      <LabelPrimitive.Label
        htmlFor={id}
        className='select-none text-sm font-medium text-rich-black ltr:ml-2 rtl:mr-2 dark:text-gray-100'
      >
        {label}
      </LabelPrimitive.Label>
    </>
  )
}
