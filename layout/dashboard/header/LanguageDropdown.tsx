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
import { iconButton } from 'components/IconButton'
import { buttonText } from 'components/Button'

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
      <DropdownMenuPrimitive.Trigger className={iconButton({ class: 'group !outline-none' })}>
        <Image
          src={currentLocale[0].icon}
          alt='flag'
          loading='lazy'
          className='h-6 w-6 rounded-lg transition-all group-hover:scale-110 motion-reduce:transition-none'
        />
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align='center'
          sideOffset={5}
          className={clsx(
            'data-[side=top]:animate-slide-up data-[side=bottom]:animate-slide-down',
            'z-50 rounded-lg px-1.5 py-1 shadow-md',
            'bg-paper-light dark:bg-paper-dark',
            'border   dark:border-gray-500'
          )}
        >
          {LANGS.map((l, i) => (
            <DropdownMenuPrimitive.Item
              key={`${l.value}-${i}`}
              onClick={() => changeLocale(l.value)}
              className={buttonText({ intent: 'default', disabled: false })}
            >
              <Image src={l.icon} alt='flag' loading='lazy' className='mr-2 h-6 w-6' />
              {l.label}
            </DropdownMenuPrimitive.Item>
          ))}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  )
}
