import React, { forwardRef } from 'react'
import clsx from 'clsx'
// radix
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
// components
import { Icon as Iconify } from '@iconify/react'

interface CheckboxProps
  extends CheckboxPrimitive.CheckboxProps,
    React.RefAttributes<HTMLButtonElement> {
  name: string
  label: string
}

const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(({ disabled, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    {...props}
    disabled={disabled}
    className={clsx(
      'flex h-5 w-5 items-center justify-center rounded',
      'data-[state=unchecked]:border data-[state=unchecked]:border-gray-400 data-[state=checked]:bg-primary-600 dark:data-[state=unchecked]:bg-transparent',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900',
      disabled && '!bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-600'
    )}
  >
    <CheckboxPrimitive.Indicator>
      <Iconify
        icon='material-symbols:check-small-rounded'
        className='h-4 w-4 self-center text-white'
      />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))

export default Checkbox
