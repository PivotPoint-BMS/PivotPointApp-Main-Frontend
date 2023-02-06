import React, { useMemo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import clsx from 'clsx'
// radix
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
// hooks
import useResponsive from 'hooks/useResponsive'
// redux
import { useAppDispatch } from 'store/hooks'
import { open } from 'store/slices/sideBarSlice'
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
      className='fixed right-0 top-0 z-10 flex items-center justify-between gap-5 bg-white/80 px-10 backdrop-blur-sm dark:bg-secondary-900/80'
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
          className='group rounded-full p-2 outline-0 hover:bg-secondary-500/10 dark:hover:bg-secondary-300/10'
          onClick={() => dispatch(open())}
        >
          <Iconify icon='ion:menu' height={24} width={24} />
        </button>
      )}
      <div className='flex flex-1 items-center justify-end gap-5'>
        <DropdownMenuPrimitive.Root>
          <DropdownMenuPrimitive.Trigger asChild>
            <button className='group rounded-full p-2 outline-0 hover:bg-secondary-500/10 dark:hover:bg-secondary-300/10'>
              <Image
                src={currentLocale[0].icon}
                alt='flag'
                loading='lazy'
                className='h-6 w-6 rounded-lg transition-all group-hover:scale-110 motion-reduce:transition-none'
              />
            </button>
          </DropdownMenuPrimitive.Trigger>

          <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
              align='center'
              sideOffset={5}
              className={clsx(
                'data-[side=top]:animate-slide-up data-[side=bottom]:animate-slide-down',
                'z-50 rounded-lg px-1.5 py-1 shadow-md',
                'bg-white dark:bg-secondary-700'
              )}
            >
              {LANGS.map((l, i) => (
                <DropdownMenuPrimitive.Item
                  key={`${l.value}-${i}`}
                  onClick={() => changeLocale(l.value)}
                  className={clsx(
                    'relative flex items-center rounded-md px-5 py-2 text-sm font-medium focus:bg-secondary-500/10 dark:text-white dark:focus:focus:hover:bg-gray-300/10',
                    'select-none focus:outline-none'
                  )}
                >
                  <Image src={l.icon} alt='flag' loading='lazy' className='mr-2 h-6 w-6' />
                  <span className='font-medium'>{l.label}</span>
                  <DropdownMenuPrimitive.ItemIndicator className='absolute left-2 inline-flex items-center'>
                    <Iconify icon='material-symbols:check-small-rounded' />
                  </DropdownMenuPrimitive.ItemIndicator>
                </DropdownMenuPrimitive.Item>
              ))}
            </DropdownMenuPrimitive.Content>
          </DropdownMenuPrimitive.Portal>
        </DropdownMenuPrimitive.Root>

        <DropdownMenuPrimitive.Root>
          <DropdownMenuPrimitive.Trigger asChild>
            <button className='group rounded-full p-2 outline-0 hover:bg-secondary-500/10 dark:hover:bg-secondary-300/10'>
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
                'data-[side=top]:animate-slide-up data-[side=bottom]:animate-slide-down',
                'z-50 w-64 rounded-lg px-1.5 py-1 shadow-md md:w-56',
                'bg-white dark:bg-secondary-700'
              )}
            >
              <div className='flex items-center justify-between p-2'>
                <h3 className=''>Notifications</h3>
                <button className='rounded-full p-2 outline-0 hover:bg-secondary-500/10 dark:hover:bg-secondary-300/10'>
                  <Iconify icon='bi:check-all' height={20} width={20} />
                </button>
              </div>
              <DropdownMenuPrimitive.Separator className='my-1 h-px bg-secondary-200 dark:bg-secondary-700' />
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
