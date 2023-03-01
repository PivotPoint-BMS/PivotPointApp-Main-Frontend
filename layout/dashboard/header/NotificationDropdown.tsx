import React from 'react'
import clsx from 'clsx'
// radix
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
// components
import { Icon as Iconify } from '@iconify/react'
import IconButton from '@/components/IconButton'

//! TO REMOVE
const notifications = [
  {
    label: 'Notification 1',
    icon: '',
  },
  {
    label: 'Notification 2',
    icon: '',
  },
]

export default function NotificationDropdown() {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger className='outline-none'>
        <IconButton className='group'>
          <Iconify
            icon='ic:round-notifications'
            className='transition-all group-hover:scale-110 motion-reduce:transition-none'
            height={24}
            width={24}
          />
        </IconButton>
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align='end'
          sideOffset={5}
          className={clsx(
            'data-[side=top]:animate-slide-up data-[side=bottom]:animate-slide-down',
            'z-50 w-64 rounded-lg px-1.5 py-1 shadow-md md:w-56',
            'bg-paper-light dark:bg-paper-dark',
            'divide-y'
          )}
        >
          <div className='flex items-center justify-between p-2'>
            <h3 className=''>Notifications</h3>
            <button className='rounded-full p-2 outline-0 hover:bg-secondary-500/10 dark:hover:bg-secondary-300/10'>
              <Iconify icon='bi:check-all' height={20} width={20} />
            </button>
          </div>
          <div className='flex flex-col gap-2 py-2'>
            {notifications.map(({ label, icon }, i) => (
              <DropdownMenuPrimitive.Item
                key={`${label}-${i}`}
                className={clsx(
                  'flex cursor-default select-none items-center rounded-md px-2 py-2 text-xs outline-none',
                  'focus:bg-secondary-500/10 dark:text-white dark:focus:hover:bg-gray-300/10'
                )}
              >
                {icon}
                <span className='flex-grow dark:text-white'>{label}</span>
              </DropdownMenuPrimitive.Item>
            ))}
          </div>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  )
}
