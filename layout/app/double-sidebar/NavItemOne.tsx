import clsx from 'clsx'
// next
import Link from 'next/link'
import { useRouter } from 'next/router'
// radix
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
// hooks
import useTranslate from 'hooks/useTranslate'
// utils
import getActivePath from 'utils/getActivePath'
// components
import Badge from 'components/Badge'
import { ReactNode, useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { useAppSelector } from 'store/hooks'

type Props =
  | {
      href: string
      name?: string
      icon: React.ReactElement
      asLink?: boolean
      collapsible?: boolean
      disabled?: boolean
      roles?: string[]
      badge?: {
        label: string
        color?: 'primary' | 'secondary' | 'info' | 'warning' | 'error' | 'success' | 'default'
      }
      onClick?: () => never
      subItems?: {
        name: string
        icon?: ReactNode | string
        onClick?: () => void
        href?: string
        disabled?: boolean
      }[]
    }
  | {
      name?: string
      icon: React.ReactElement
      onClick?: () => void
      asLink?: never
      collapsible?: boolean
      href?: never
      disabled?: never
      badge?: never
      roles?: never
      subItems?: {
        name: string
        icon?: ReactNode | string
        onClick: () => void
        href?: string
        disabled?: boolean
      }[]
    }

function NavItemOne({
  name,
  icon,
  asLink = false,
  collapsible,
  href = '',
  onClick,
  badge,
  roles,
  disabled,
  subItems,
}: Props) {
  const { t } = useTranslate()
  const { pathname, asPath } = useRouter()
  const active = getActivePath(href, pathname, asPath)
  const [isOpen, setIsOpen] = useState(false)

  const { user } = useAppSelector((state) => state.session)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  if (collapsible)
    return (
      <CollapsiblePrimitive.Root open={isOpen} onOpenChange={setIsOpen} className='w-full'>
        <CollapsiblePrimitive.Trigger
          disabled={disabled}
          className={clsx(
            'group flex w-full items-center gap-2 rounded-lg p-4 text-secondary-900 hover:bg-secondary-500/10 dark:text-white dark:hover:bg-gray-300/10',
            active && 'bg-primary-500/10 dark:bg-gray-300/10'
          )}
        >
          <div
            className={clsx(
              'flex flex-1 items-center whitespace-normal',
              disabled &&
                'pointer-events-none cursor-not-allowed opacity-40 hover:bg-secondary-500/10 dark:hover:bg-gray-300/10'
            )}
          >
            <div>{icon}</div>
            <label className='w-max cursor-pointer text-[0px] font-medium capitalize opacity-0 transition-all duration-300 group-hover:mx-3 group-hover:text-xs group-hover:opacity-100'>
              {name}
            </label>
          </div>

          <div>
            <Icon
              icon='material-symbols:arrow-drop-down-rounded'
              height={20}
              width={20}
              className='hidden scale-0 transform duration-300 ease-in-out group-hover:block group-hover:scale-100 group-data-[state=open]:rotate-180'
            />
          </div>
        </CollapsiblePrimitive.Trigger>
        <CollapsiblePrimitive.Content className='mt-2 hidden flex-col space-y-2 group-hover:flex'>
          {subItems?.map((item, i) =>
            item.href ? (
              <Link
                key={i}
                href={item.href}
                className={clsx(
                  'flex items-center gap-3 rounded-lg py-3 px-5 ltr:ml-3 rtl:mr-3',
                  getActivePath(item.href, pathname, asPath)
                    ? 'bg-secondary-700 text-gray-200 hover:bg-secondary-800 dark:text-white'
                    : 'bg-gray-100 text-secondary-900 hover:bg-gray-100/60 dark:bg-secondary-100/20 dark:text-white dark:hover:bg-secondary-200/50',
                  item.disabled &&
                    'pointer-events-none cursor-not-allowed opacity-40 hover:bg-secondary-500/10 dark:hover:bg-gray-300/10'
                )}
              >
                <div>{item.icon}</div>
                <label className='cursor-pointer text-xs font-medium capitalize'>
                  {t(item.name)}
                </label>
              </Link>
            ) : (
              <button
                key={i}
                className={clsx(
                  'flex items-center gap-3 rounded-lg py-3 px-5 ltr:ml-3 rtl:mr-3',
                  'bg-gray-100 text-secondary-900 hover:bg-gray-100/60 dark:bg-secondary-100/20 dark:text-white dark:hover:bg-secondary-200/50'
                )}
                onClick={item.onClick}
              >
                <div>{item.icon}</div>
                <label className='cursor-pointer text-xs font-medium capitalize'>
                  {t(item.name)}
                </label>
              </button>
            )
          )}
        </CollapsiblePrimitive.Content>
      </CollapsiblePrimitive.Root>
    )

  return asLink ? (
    <Link
      href={href}
      className={clsx([
        'relative flex w-fit items-center rounded-lg p-4 text-secondary-900 transition-all group-hover:w-full dark:text-white',
        active
          ? 'bg-secondary-500/10 hover:bg-secondary-500/25 dark:bg-gray-300/10 dark:hover:bg-gray-200/20'
          : 'hover:bg-secondary-500/10 dark:hover:bg-gray-300/10',
        (disabled || user?.position.every((item) => !roles?.includes(item))) &&
          'pointer-events-none cursor-not-allowed opacity-40 hover:bg-secondary-500/10 dark:hover:bg-gray-300/10',
      ])}
    >
      {icon}
      <label className='w-max flex-1 cursor-pointer text-[0px] font-medium capitalize opacity-0 transition-all duration-300 group-hover:mx-3 group-hover:text-xs group-hover:opacity-100'>
        {name}
      </label>
      {badge && (
        <Badge
          label={t(badge.label)}
          intent={badge.color || 'default'}
          className={clsx('hidden truncate text-[10px] group-hover:block')}
        />
      )}
    </Link>
  ) : (
    <button
      className={clsx([
        'relative flex w-fit items-center rounded-lg p-4 text-secondary-900 transition-all group-hover:w-full dark:text-white',
        'hover:bg-secondary-500/10 dark:hover:bg-gray-300/10',
        disabled &&
          'pointer-events-none cursor-not-allowed opacity-40 hover:bg-secondary-500/10 dark:hover:bg-gray-300/10',
      ])}
      onClick={onClick}
    >
      {icon}
      <label className='w-max cursor-pointer text-[0px] font-medium capitalize opacity-0 transition-all duration-300  group-hover:text-xs group-hover:opacity-100 ltr:group-hover:ml-3 rtl:group-hover:mr-3'>
        {name}
      </label>
      {name && (
        <span className='absolute left-12 top-0 m-2 h-max w-max origin-left scale-0 cursor-pointer rounded-lg bg-gray-300 p-2 text-xs font-medium text-rich-black shadow-xl transition-all duration-300'>
          {name}
        </span>
      )}
    </button>
  )
}

export default NavItemOne
