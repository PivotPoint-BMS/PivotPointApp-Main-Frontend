import { Icon as Iconify } from '@iconify/react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { clsx } from 'clsx'
import React from 'react'
import Button, { ButtonProps } from './Button'

interface SelectProps extends SelectPrimitive.SelectProps {
  items?: { label: string; value: string; disabled?: boolean }[]
  buttonProps?: ButtonProps
}

const Select = ({ buttonProps, items, ...props }: SelectProps) => (
  <SelectPrimitive.Root {...props}>
    <SelectPrimitive.Trigger asChild>
      <Button variant='outlined' {...buttonProps}>
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon className='ml-2'>
          <Iconify icon='ion:chevron-down-outline' />
        </SelectPrimitive.Icon>
      </Button>
    </SelectPrimitive.Trigger>
    <SelectPrimitive.Content className='z-50 rounded-lg border bg-paper-light p-2 shadow-lg dark:border-gray-500 dark:bg-paper-dark'>
      <SelectPrimitive.ScrollUpButton className='flex items-center justify-center'>
        <Iconify icon='ion:chevron-up' />
      </SelectPrimitive.ScrollUpButton>
      <SelectPrimitive.Viewport>
        <SelectPrimitive.Group>
          {items?.map(({ label, value, disabled }, i) => (
            <SelectPrimitive.Item
              disabled={disabled}
              key={`${label}-${i}`}
              value={value}
              className={clsx(
                'relative flex items-center rounded-md px-8 py-2 text-sm font-medium outline-none',
                'data-[disabled=true]:opacity-50',
                'select-none focus:outline-none',
                'hover:bg-gray-600/10  active:bg-gray-600/40',
                'dark:hover:bg-gray-500/25 dark:active:bg-gray-500/50'
              )}
            >
              <SelectPrimitive.ItemText>{label}</SelectPrimitive.ItemText>
              <SelectPrimitive.ItemIndicator className='absolute left-2 inline-flex items-center'>
                <Iconify icon='material-symbols:check-small-rounded' />
              </SelectPrimitive.ItemIndicator>
            </SelectPrimitive.Item>
          ))}
        </SelectPrimitive.Group>
      </SelectPrimitive.Viewport>
      <SelectPrimitive.ScrollDownButton className='flex items-center justify-center'>
        <Iconify icon='ion:chevron-down' />
      </SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  </SelectPrimitive.Root>
)

export default Select
