import React, { ReactNode } from 'react'
import { clsx } from 'clsx'
import { v4 as uuid } from 'uuid'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { Icon as Iconify } from '@iconify/react'

export interface MenuItemProps {
  type: 'button' | 'dropdown' | 'checkbox' | 'separator' | 'text' | 'link'
  label?: string
  icon?: ReactNode
  onClick?: () => void
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  subItems?: MenuItemProps[]
  className?: string
  loading?: boolean
  disabled?: boolean
}

interface DropdownMenuProps {
  trigger: ReactNode
  items: MenuItemProps[]
  className?: string
  contentProps?: DropdownMenuPrimitive.DropdownMenuContentProps
}

const RenderItems = ({
  checked,
  label,
  onCheckedChange,
  onClick,
  type,
  icon,
  subItems,
  className,
  loading,
  disabled,
}: MenuItemProps) => {
  if (type === 'checkbox')
    return (
      <DropdownMenuPrimitive.CheckboxItem
        key={`checkbox-${uuid()}`}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={clsx(
          'flex w-full cursor-pointer select-none items-center rounded-md px-2 py-2 text-xs font-medium outline-none',
          ' focus:bg-gray-200 dark:focus:bg-paper-hover-dark',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        <div>{icon}</div>
        <span className='flex-grow rtl:text-right'>{label}</span>
        <DropdownMenuPrimitive.ItemIndicator>
          <Iconify icon='material-symbols:check-small-rounded' height={14} />
        </DropdownMenuPrimitive.ItemIndicator>
      </DropdownMenuPrimitive.CheckboxItem>
    )
  if (type === 'dropdown')
    return (
      <DropdownMenuPrimitive.Sub key={`dropdown-${uuid()}`}>
        <DropdownMenuPrimitive.SubTrigger
          className={clsx(
            'flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-2 py-2 text-xs font-medium outline-none  rtl:flex-row-reverse',
            ' focus:bg-gray-200 dark:focus:bg-paper-hover-dark',
            disabled && 'cursor-not-allowed opacity-50',
            className
          )}
        >
          <div>{icon}</div>
          <span className='flex-grow rtl:text-right'>{label}</span>
          <Iconify
            icon='material-symbols:arrow-forward-ios-rounded'
            className='rtl:rotate-180'
            height={12}
          />
        </DropdownMenuPrimitive.SubTrigger>
        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.SubContent
            className={clsx(
              'origin-top-right data-[side=left]:animate-scale-in',
              'w-48 rounded-md px-1 py-1 text-xs font-medium shadow-md',
              'border bg-white dark:border-gray-600 dark:bg-paper-dark',
              loading && 'cursor-not-allowed bg-gray-400 hover:bg-gray-400 active:bg-gray-400',
              disabled && 'cursor-not-allowed opacity-50',
              className
            )}
          >
            {subItems?.map(
              ({
                checked: subchecked,
                label: subLabel,
                onCheckedChange: subOnCheckedChange,
                onClick: subOnClick,
                subItems: subSubItems,
                type: subType,
                icon: subIcon,
                className: subClassName,
                loading: subLoading,
              }) =>
                RenderItems({
                  checked: subchecked,
                  label: subLabel,
                  onCheckedChange: subOnCheckedChange,
                  onClick: subOnClick,
                  subItems: subSubItems,
                  type: subType,
                  icon: subIcon,
                  className: subClassName,
                  loading: subLoading,
                })
            )}
          </DropdownMenuPrimitive.SubContent>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Sub>
    )
  if (type === 'separator')
    return (
      <DropdownMenuPrimitive.Separator
        className={clsx('my-1 h-px bg-gray-200 dark:bg-gray-700', className)}
        key={`separator-${uuid()}`}
      />
    )
  if (type === 'text')
    return (
      <DropdownMenuPrimitive.Label
        className={clsx(
          'select-none px-2 py-2 text-xs font-medium text-gray-700 dark:text-gray-200',
          className
        )}
        key={`text-${uuid()}`}
      >
        {label}
      </DropdownMenuPrimitive.Label>
    )

  return (
    <DropdownMenuPrimitive.Item
      key={`button-${uuid()}`}
      className={clsx(
        'flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-2 text-xs font-medium outline-none rtl:flex-row-reverse',
        ' focus:bg-gray-200 dark:focus:bg-paper-hover-dark',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
      onClick={onClick}
    >
      {loading ? (
        <svg
          className='-ml-1 h-5 w-5 animate-spin text-white ltr:mr-3 rtl:ml-3'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          ></circle>
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          ></path>
        </svg>
      ) : (
        <div>{icon}</div>
      )}
      <span className='flex-grow rtl:text-right'>{label}</span>
    </DropdownMenuPrimitive.Item>
  )
}

export default function DropdownMenu({
  trigger,
  items,
  className,
  contentProps,
  ...props
}: DropdownMenuProps) {
  return (
    <div className={clsx('relative inline-block text-left', className)}>
      <DropdownMenuPrimitive.Root {...props}>
        <DropdownMenuPrimitive.Trigger asChild>{trigger}</DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            align='end'
            sideOffset={5}
            {...contentProps}
            className={clsx(
              'data-[side=top]:animate-slide-up data-[side=bottom]:animate-slide-down',
              'w-fit min-w-[150px] rounded-lg border px-1.5 py-1 drop-shadow-lg dark:border-gray-600',
              'bg-white dark:bg-paper-dark',
              'flex flex-col gap-1'
            )}
          >
            {items.map(
              ({
                type,
                label,
                onClick,
                subItems,
                icon,
                checked,
                onCheckedChange,
                className: _className,
                loading,
                disabled,
              }) =>
                RenderItems({
                  type,
                  label,
                  onClick,
                  subItems,
                  icon,
                  checked,
                  onCheckedChange,
                  className: _className,
                  loading,
                  disabled,
                })
            )}
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </div>
  )
}
