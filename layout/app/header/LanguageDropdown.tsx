import React from 'react'
import clsx from 'clsx'
// next
import { useRouter } from 'next/router'
// hooks
import useTranslate from 'hooks/useTranslate'
// radix
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
// components
import Button, { buttonText } from 'components/Button'

const LANGS = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' },
  { value: 'ar', label: 'العربية' },
]

export default function LanguageDropdown() {
  const { t } = useTranslate()
  const { pathname, asPath, query, push } = useRouter()

  const changeLocale = (nextLocale: string) => {
    push({ pathname, query }, asPath, { locale: nextLocale })
  }

  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger
        className={buttonText({ intent: 'default', disabled: false, className: 'outline-none' })}
      >
        {t('Language')}
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align='center'
          sideOffset={5}
          className={clsx(
            'data-[side=top]:animate-slide-up data-[side=bottom]:animate-slide-down',
            'z-50 rounded-lg px-1.5 py-1 shadow-md',
            'bg-paper-light dark:bg-paper-dark',
            'border outline-none dark:border-gray-500'
          )}
        >
          {LANGS.map((l, i) => (
            <DropdownMenuPrimitive.Item
              key={`${l.value}-${i}`}
              onClick={() => changeLocale(l.value)}
              className={buttonText({
                intent: 'default',
                disabled: false,
                className: 'outline-none',
              })}
            >
              {l.label}
            </DropdownMenuPrimitive.Item>
          ))}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  )
}
