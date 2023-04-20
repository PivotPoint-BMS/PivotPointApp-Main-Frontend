import React, { ReactNode } from 'react'
import { clsx } from 'clsx'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { Icon as Iconify } from '@iconify/react'

export interface MenuItem {
  type: 'button' | 'dropdown' | 'checkbox' | 'separator' | 'text'
  label?: string
  icon?: ReactNode
  onClick?: () => void
  checked?: boolean
  onCheckedChange?: () => void
  subItems?: MenuItem[]
  className?: string
}

interface DropdownMenuProps {
  trigger: ReactNode
  items: MenuItem[]
}

const RenderItems = (
  { checked, label, onCheckedChange, onClick, type, icon, subItems, className }: MenuItem,
  i: number
) => {
  if (type === 'checkbox')
    return (
      <DropdownMenuPrimitive.CheckboxItem
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={clsx(
          'flex w-full cursor-default select-none items-center rounded-md px-2 py-2 text-xs outline-none',
          ' focus:bg-gray-200 dark:focus:bg-gray-900'
        )}
      >
        <div>{icon}</div>
        <span className='flex-grow'>{label}</span>
        <DropdownMenuPrimitive.ItemIndicator>
          <Iconify icon='material-symbols:check-small-rounded' height={14} />
        </DropdownMenuPrimitive.ItemIndicator>
      </DropdownMenuPrimitive.CheckboxItem>
    )
  if (type === 'dropdown')
    return (
      <DropdownMenuPrimitive.Sub>
        <DropdownMenuPrimitive.SubTrigger
          className={clsx(
            'flex w-full cursor-default select-none items-center gap-2 rounded-md px-2 py-2 text-xs outline-none',
            ' focus:bg-gray-200 dark:focus:bg-gray-900',
            className
          )}
        >
          <div>{icon}</div>
          <span className='flex-grow'>{label}</span>
          <Iconify icon='material-symbols:arrow-forward-ios-rounded' height={12} />
        </DropdownMenuPrimitive.SubTrigger>
        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.SubContent
            className={clsx(
              'origin-top-right data-[side=left]:animate-scale-in',
              'w-48 rounded-md px-1 py-1 text-xs shadow-md',
              'bg-white dark:bg-gray-800',
              className
            )}
          >
            {subItems?.map(
              (
                {
                  checked: subchecked,
                  label: subLabel,
                  onCheckedChange: subOnCheckedChange,
                  onClick: subOnClick,
                  subItems: subSubItems,
                  type: subType,
                  icon: subIcon,
                  className: subClassName,
                },
                index
              ) =>
                RenderItems(
                  {
                    checked: subchecked,
                    label: subLabel,
                    onCheckedChange: subOnCheckedChange,
                    onClick: subOnClick,
                    subItems: subSubItems,
                    type: subType,
                    icon: subIcon,
                    className: subClassName,
                  },
                  index
                )
            )}
          </DropdownMenuPrimitive.SubContent>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Sub>
    )
  if (type === 'separator')
    return (
      <DropdownMenuPrimitive.Separator
        className={clsx('my-1 h-px bg-gray-200 dark:bg-gray-700', className)}
      />
    )
  if (type === 'text')
    return (
      <DropdownMenuPrimitive.Label
        className={clsx(
          'select-none px-2 py-2 text-xs text-gray-700 dark:text-gray-200',
          className
        )}
      >
        {label}
      </DropdownMenuPrimitive.Label>
    )
  return (
    <DropdownMenuPrimitive.Item
      key={`${label?.toLowerCase()}-${i}`}
      className={clsx(
        'flex cursor-default select-none items-center gap-2 rounded-md px-2 py-2 text-xs outline-none',
        ' focus:bg-gray-200 dark:focus:bg-gray-900',
        className
      )}
      onClick={onClick}
    >
      <div>{icon}</div>
      <span className='flex-grow'>{label}</span>
    </DropdownMenuPrimitive.Item>
  )
}

export default function DropdownMenu({ trigger, items, ...props }: DropdownMenuProps) {
  return (
    <div className='relative inline-block text-left'>
      <DropdownMenuPrimitive.Root {...props}>
        <DropdownMenuPrimitive.Trigger asChild>{trigger}</DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            align='end'
            sideOffset={5}
            className={clsx(
              'data-[side=top]:animate-slide-up data-[side=bottom]:animate-slide-down',
              'w-48 rounded-lg border border-dashed border-gray-400 px-1.5 py-1 drop-shadow-lg md:w-56',
              'bg-white dark:bg-paper-hover-dark'
            )}
          >
            {items.map(
              ({ type, label, onClick, subItems, icon, checked, onCheckedChange, className }, i) =>
                RenderItems(
                  { type, label, onClick, subItems, icon, checked, onCheckedChange, className },
                  i
                )
            )}
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </div>
  )
}
