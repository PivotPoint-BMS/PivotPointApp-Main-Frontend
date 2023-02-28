import React, { useMemo } from 'react'
import clsx from 'clsx'
// next
import { useRouter } from 'next/router'
import Image from 'next/image'
// radix
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
// icons
import english from 'public/english.png'
import arabic from 'public/arabic.png'
import french from 'public/french.png'
// components
import { Icon as Iconify } from '@iconify/react'
import IconButton from '@/components/IconButton'

const LANGS = [
  { value: 'en', label: 'English', icon: english },
  { value: 'fr', label: 'French', icon: french },
  { value: 'ar', label: 'العربية', icon: arabic },
]

export default function LanguageDropdown() {
  const { locale, pathname, asPath, query, push } = useRouter()

  const currentLocale = useMemo(() => LANGS.filter((l) => l.value === locale), [locale])

  const changeLocale = (nextLocale: string) => {
    push({ pathname, query }, asPath, { locale: nextLocale })
  }

  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger className='outline-none'>
        <IconButton className='group'>
          <Image
            src={currentLocale[0].icon}
            alt='flag'
            loading='lazy'
            className='h-6 w-6 rounded-lg transition-all group-hover:scale-110 motion-reduce:transition-none'
          />
        </IconButton>
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align='center'
          sideOffset={5}
          className={clsx(
            'data-[side=top]:animate-slide-up data-[side=bottom]:animate-slide-down',
            'z-50 rounded-lg px-1.5 py-1 shadow-md',
            'bg-white dark:bg-secondary-900'
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
  )
}
