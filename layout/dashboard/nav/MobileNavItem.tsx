import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
// radix
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
// hooks
import useTranslate from 'hooks/useTranslate'
// utils
import clsx from 'clsx'
import getActivePath from 'utils/getActivePath'
import { Icon as Iconify } from '@iconify/react'
import Badge from '@/components/Badge'

type Props =
  | {
      href: string
      name: string
      icon: React.ReactElement
      asLink?: boolean
      onClick?: () => void
      subItems: {
        name: string
        href: string
        icon: string
        disabled?: boolean
        badge?: {
          label: string
          icon?: string
        }
      }[]
    }
  | {
      name: string
      icon: React.ReactElement
      onClick?: () => void
      asLink?: never
      href?: never
      subItems?: never
    }

function NavItemMobile({ name, icon, asLink = false, href = '', onClick, subItems }: Props) {
  const { pathname, asPath } = useRouter()
  const { t } = useTranslate()
  const active = getActivePath(href, pathname, asPath)
  const [isOpen, setIsOpen] = useState(false)

  return asLink ? (
    <CollapsiblePrimitive.Root open={isOpen} onOpenChange={setIsOpen} className='w-full'>
      <CollapsiblePrimitive.Trigger
        className={clsx(
          'group flex w-full items-center gap-2 rounded-xl p-4 text-secondary-900 dark:text-white',
          active && 'bg-primary-500/10 dark:bg-gray-300/10'
        )}
      >
        <Link href={href} className='flex flex-1 items-center' onClick={onClick}>
          {icon}
          <h3 className='truncate text-xs font-medium capitalize group-hover:opacity-100  ltr:ml-3 rtl:mr-3'>
            {name}
          </h3>
          {name && (
            <span className='absolute left-12 top-0 m-2 h-max w-max origin-left scale-0 rounded-lg bg-gray-300 p-2 text-xs font-medium text-rich-black shadow-xl transition-all duration-300'>
              {name}
            </span>
          )}
        </Link>
        <Iconify
          icon='material-symbols:arrow-drop-down-rounded'
          height={20}
          width={20}
          className='transform duration-300 ease-in-out group-data-[state=open]:rotate-180'
        />
      </CollapsiblePrimitive.Trigger>
      <CollapsiblePrimitive.Content className='mt-2 flex flex-col space-y-4'>
        {subItems?.map((item, i) => (
          <Link
            key={i}
            href={item.disabled ? '' : item.href}
            className={clsx(
              'flex items-center gap-3 rounded-xl py-3 px-5 ltr:ml-6 rtl:mr-6',
              getActivePath(item.href, pathname, asPath)
                ? 'bg-secondary-700 text-gray-200 hover:bg-secondary-800 dark:text-white'
                : 'bg-gray-100 text-secondary-900 hover:bg-gray-100/60 dark:bg-secondary-100/20 dark:text-white dark:hover:bg-secondary-200/50',
              item.disabled &&
                'cursor-not-allowed opacity-40 hover:bg-gray-100/40 dark:hover:bg-secondary-100/60'
            )}
            onClick={onClick}
          >
            <Iconify icon={item.icon} height={20} width={20} />
            <label className='flex-1 text-[10px] font-medium capitalize'>{t(item.name)}</label>
            {item.badge && (
              <Badge
                icon={
                  icon && (
                    <Iconify icon={item.badge.icon ? item.badge.icon : ''} height={20} width={20} />
                  )
                }
                label={t(item.badge?.label)}
                intent='primary'
                className='truncate text-[10px]'
              />
            )}
          </Link>
        ))}
      </CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  ) : (
    <button
      className='relative flex w-full items-center rounded-xl p-4 text-secondary-900 transition-colors dark:text-white'
      onClick={onClick}
    >
      {icon}
      <label className='w-max text-xs font-medium capitalize ltr:ml-3 rtl:mr-3'>{name}</label>
    </button>
  )
}

export default NavItemMobile
