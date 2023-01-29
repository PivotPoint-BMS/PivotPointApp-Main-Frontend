import React, { useMemo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import clsx from 'clsx'
// radix
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import * as SelectPrimitive from '@radix-ui/react-select'
// hooks
import useResponsive from 'hooks/useResponsive'
// redux
import { useAppDispatch } from 'store/hooks'
import { open } from 'store/sideBarSlice'
// config
import { HEADER, NAVBAR } from 'config'
// icons
import { Icon as Iconify } from '@iconify/react'
import english from 'public/english.png'
import arabic from 'public/arabic.png'
import french from 'public/french.png'

//! TO REMOVE
import placeholder from 'public/250.png'
import { useRouter } from 'next/router'

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

const LANGS = [
  { value: 'en', label: 'English', icon: english },
  { value: 'fr', label: 'French', icon: french },
  { value: 'ar', label: 'العربية', icon: arabic },
]

export default function Header() {
  const isDesktop = useResponsive('lg', 'up')
  const router = useRouter()
  const { locale, pathname, asPath, query } = router
  const isHome = Boolean(!pathname.split('/')[1])
  const dispatch = useAppDispatch()

  const currentLocale = useMemo(() => LANGS.filter((l) => l.value === locale), [locale])

  const changeLocale = (nextLocale: string) => {
    router.push({ pathname, query }, asPath, { locale: nextLocale })
  }

  return (
    <motion.div
      className='fixed right-0 top-0 z-50 flex items-center justify-between gap-5 px-6'
      style={{
        height: HEADER.DESKTOP_HEIGHT,
        width: isDesktop
          ? `calc(100% - ${
              isHome
                ? NAVBAR.MAIN_NAVBAR_WIDTH
                : NAVBAR.SECONDARY_NAVBAR_WIDTH + NAVBAR.MAIN_NAVBAR_WIDTH
            }px)`
          : '100vw',
      }}
    >
      {!isDesktop && (
        <button
          className='group rounded-full p-2 outline-0 hover:bg-primary-500/10 dark:hover:bg-primary-300/10'
          onClick={() => dispatch(open())}
        >
          <Iconify icon='ion:menu' height={24} width={24} />
        </button>
      )}
      <div className='flex flex-1 items-center justify-end gap-5'>
        <SelectPrimitive.Root onValueChange={changeLocale} value={currentLocale[0].value}>
          <SelectPrimitive.Trigger asChild aria-label='Language'>
            <button
              id='notifications-button'
              aria-label='notifications'
              className='group rounded-full p-2 outline-0 hover:bg-primary-500/10 dark:hover:bg-primary-300/10'
            >
              <SelectPrimitive.Value>
                <Image
                  src={currentLocale[0].icon}
                  alt='flag'
                  loading='lazy'
                  className='h-6 w-6 rounded-lg transition-all group-hover:scale-110 motion-reduce:transition-none'
                />
              </SelectPrimitive.Value>
            </button>
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Content>
            <SelectPrimitive.Viewport className='rounded-lg bg-white p-2 shadow-lg dark:bg-primary-800'>
              <SelectPrimitive.Group>
                {LANGS.map((l, i) => (
                  <SelectPrimitive.Item
                    key={`${l.value}-${i}`}
                    value={l.value}
                    className={clsx(
                      'relative flex items-center rounded-md px-8 py-2 text-sm font-medium focus:bg-primary-500/10 dark:text-white dark:focus:focus:hover:bg-gray-300/10',
                      'radix-disabled:opacity-50',
                      'select-none focus:outline-none'
                    )}
                  >
                    <Image
                      src={l.icon}
                      alt='flag'
                      loading='lazy'
                      className='mr-2 h-6 w-6 rounded-md'
                    />
                    <SelectPrimitive.ItemText className='font-medium'>
                      {l.label}
                    </SelectPrimitive.ItemText>
                    <SelectPrimitive.ItemIndicator className='absolute left-2 inline-flex items-center'>
                      <Iconify icon='material-symbols:check-small-rounded' />
                    </SelectPrimitive.ItemIndicator>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Group>
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Root>

        <DropdownMenuPrimitive.Root>
          <DropdownMenuPrimitive.Trigger asChild>
            <button className='group rounded-full p-2 outline-0 hover:bg-primary-500/10 dark:hover:bg-primary-300/10'>
              <Iconify
                icon='ic:round-notifications'
                className='transition-all group-hover:scale-110 motion-reduce:transition-none'
                height={24}
                width={24}
              />
            </button>
          </DropdownMenuPrimitive.Trigger>

          <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
              align='end'
              sideOffset={5}
              className={clsx(
                'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
                'w-64 rounded-lg px-1.5 py-1 shadow-md md:w-56',
                'bg-white dark:bg-primary-800'
              )}
            >
              <div className='flex items-center justify-between p-2'>
                <h3 className=''>Notifications</h3>
                <button className='rounded-full p-2 outline-0 hover:bg-primary-500/10 dark:hover:bg-primary-300/10'>
                  <Iconify icon='bi:check-all' height={20} width={20} />
                </button>
              </div>
              <DropdownMenuPrimitive.Separator className='my-1 h-px bg-primary-200 dark:bg-primary-700' />
              {notifications.map(({ label, icon }, i) => (
                <DropdownMenuPrimitive.Item
                  key={`${label}-${i}`}
                  className={clsx(
                    'flex cursor-default select-none items-center rounded-md px-2 py-2 text-xs outline-none',
                    'focus:bg-primary-500/10 dark:text-white dark:focus:hover:bg-gray-300/10'
                  )}
                >
                  {icon}
                  <span className='flex-grow dark:text-white'>{label}</span>
                </DropdownMenuPrimitive.Item>
              ))}
            </DropdownMenuPrimitive.Content>
          </DropdownMenuPrimitive.Portal>
        </DropdownMenuPrimitive.Root>

        <Image
          src={placeholder}
          alt='profile'
          width={32}
          className='h-10 w-10 cursor-pointer rounded-full'
        />
      </div>
    </motion.div>
  )
}
