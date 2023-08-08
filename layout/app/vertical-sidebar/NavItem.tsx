import clsx from 'clsx'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
// radix
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
// hooks
import useTranslate from 'hooks/useTranslate'
import { useAppSelector } from 'store/hooks'
// utils
import getActivePath from 'utils/getActivePath'
// utils
import { Icon as Iconify } from '@iconify/react'
import { Badge } from 'components'

type Props =
  | {
      href: string
      root: string
      name: string
      icon: React.ReactElement
      asLink?: boolean
      disabled?: boolean
      onClick?: () => void
      roles?: string[]
      subItems?: {
        name: string
        href?: string
        icon?: string
        disabled?: boolean
        badge?: {
          color?: 'primary' | 'secondary' | 'info' | 'warning' | 'error' | 'success' | 'default'
          label: string
        }
        onClick?: () => void
      }[]
    }
  | {
      name: string
      icon: React.ReactElement
      onClick?: () => void
      asLink?: never
      roles?: string[]
      disabled?: boolean
      href?: never
      root: never
      subItems?: never
      badge?: never
    }

function NavItem({
  name,
  icon,
  asLink = false,
  disabled,
  href = '',
  root,
  onClick,
  subItems,
  roles,
}: Props) {
  const { pathname, asPath } = useRouter()
  const { t } = useTranslate()
  const active = getActivePath(root, pathname, asPath)
  const { user } = useAppSelector((state) => state.session)
  const [isOpen, setIsOpen] = useState(active)

  return asLink ? (
    <CollapsiblePrimitive.Root open={isOpen} onOpenChange={setIsOpen} className='w-full'>
      <CollapsiblePrimitive.Trigger
        disabled={disabled || (roles && user?.position.every((item) => !roles?.includes(item)))}
        className={clsx(
          'group flex w-full items-center gap-2 rounded-lg p-4 hover:bg-gray-500/10 dark:text-white',
          active && 'bg-primary-600/20 text-primary-900 hover:!bg-primary-500/25'
        )}
      >
        {subItems ? (
          <div
            className={clsx(
              'flex flex-1 items-center gap-3 whitespace-normal',
              (disabled || (roles && user?.position.every((item) => !roles?.includes(item)))) &&
                'pointer-events-none cursor-not-allowed opacity-40 hover:bg-secondary-500/10 dark:hover:bg-gray-300/10'
            )}
          >
            {icon}
            <div className='w-full whitespace-normal'>
              <h3 className='flex-1 whitespace-normal text-start text-xs font-semibold'>{name}</h3>
            </div>
          </div>
        ) : (
          <Link
            href={href}
            className={clsx(
              'flex flex-1 items-center gap-3 whitespace-normal',
              disabled &&
                'pointer-events-none cursor-not-allowed opacity-40 hover:bg-secondary-500/10 dark:hover:bg-gray-300/10'
            )}
            onClick={onClick}
          >
            {icon}
            <div className='w-full whitespace-normal '>
              <h3 className='flex-1 whitespace-normal text-start text-xs font-semibold'>{name}</h3>
            </div>
          </Link>
        )}
        {subItems && !disabled && (
          <div>
            <Iconify
              icon='mdi:chevron-down'
              height={18}
              width={18}
              className='transform duration-300 ease-in-out group-data-[state=open]:rotate-180'
            />
          </div>
        )}
      </CollapsiblePrimitive.Trigger>
      <CollapsiblePrimitive.Content className='mt-1 flex flex-col space-y-2'>
        {subItems?.map((item, i) =>
          item.href ? (
            <Link
              key={i}
              href={item.disabled ? '' : item.href}
              className={clsx(
                'flex items-center gap-2 rounded-lg py-3 px-2 hover:bg-gray-500/10 ltr:ml-2 rtl:mr-2 dark:hover:bg-gray-500/30',
                !getActivePath(item.href, pathname, asPath) && 'text-gray-500 dark:text-gray-400',
                item.disabled &&
                  'pointer-events-none cursor-not-allowed opacity-40 hover:bg-secondary-500/10 dark:hover:bg-gray-300/10'
              )}
              onClick={onClick}
            >
              <Iconify
                icon='mdi:circle-small'
                height={20}
                width={20}
                className={clsx(
                  getActivePath(item.href, pathname, asPath) && 'scale-[2.5] text-primary-600',
                  'transition-all'
                )}
              />
              <label
                className={clsx(
                  'flex-1 cursor-pointer text-xs',
                  getActivePath(item.href, pathname, asPath) ? 'font-semibold' : 'font-medium'
                )}
              >
                {t(item.name)}
              </label>
              {item.badge && (
                <Badge
                  label={t(item.badge?.label)}
                  intent={item.badge?.color || 'primary'}
                  className='truncate text-[10px]'
                />
              )}
            </Link>
          ) : (
            <button
              key={i}
              className={clsx(
                'flex items-center gap-3 rounded-lg py-3 px-5',
                'bg-gray-100 text-secondary-900 hover:bg-gray-100/60 dark:bg-secondary-100/20 dark:text-white dark:hover:bg-secondary-200/50',
                item.disabled &&
                  'pointer-events-none cursor-not-allowed opacity-40 hover:bg-secondary-500/10 dark:hover:bg-gray-300/10'
              )}
              onClick={item.onClick}
            >
              {item.icon && <Iconify icon={item.icon} height={20} width={20} />}
              <label className='cursor-pointer text-[10px] font-medium capitalize'>
                {t(item.name)}
              </label>
            </button>
          )
        )}
      </CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  ) : (
    <button
      className='relative flex w-full items-center rounded-lg p-4 text-secondary-900 transition-colors dark:text-white'
      onClick={onClick}
    >
      {icon}
      <label className='w-max text-xs font-medium capitalize ltr:ml-2 rtl:mr-2'>{name}</label>
    </button>
  )
}

export default NavItem
