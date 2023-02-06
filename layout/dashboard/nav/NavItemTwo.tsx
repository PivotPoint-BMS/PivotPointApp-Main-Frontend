import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx'
// hooks
import useTranslate from 'hooks/useTranslate'
// utils
import getActivePath from 'utils/getActivePath'
// components
import { Icon as Iconify } from '@iconify/react'
import Badge from '@/components/Badge'

type Props = {
  name: string
  href: string
  icon: string
  disabled: boolean
  isCollapsed: boolean
  badge?: {
    icon?: string
    label: string
  }
}

export default function NavItemTwo({ name, href, icon, badge, disabled, isCollapsed }: Props) {
  const { pathname, asPath } = useRouter()
  const active = getActivePath(href, pathname, asPath)
  const { t } = useTranslate()

  return (
    <Link
      href={disabled ? '' : href}
      className={clsx(
        'flex w-full min-w-fit items-center rounded-xl p-4 text-white',
        active
          ? 'bg-secondary-500 hover:bg-secondary-800 dark:bg-secondary-100 dark:hover:bg-secondary-200'
          : 'bg-secondary-400/60 hover:bg-secondary-500/60 dark:bg-secondary-200/20 dark:hover:bg-secondary-300/50',
        disabled &&
          'cursor-not-allowed opacity-40 hover:bg-gray-100/40 dark:hover:bg-secondary-100/60'
      )}
    >
      <Iconify icon={icon} height={20} width={20} />
      <label
        className={clsx(
          'flex-1 cursor-pointer font-medium capitalize ',
          isCollapsed
            ? 'truncate text-[0px] opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:text-xs group-hover:opacity-100'
            : 'ml-3 text-xs'
        )}
      >
        {name}
      </label>
      {badge && (
        <Badge
          icon={
            badge.icon && <Iconify icon={badge.icon ? badge.icon : ''} height={20} width={20} />
          }
          label={t(badge?.label)}
          intent='error'
          className={clsx('truncate text-[10px]', isCollapsed && 'hidden group-hover:block')}
        />
      )}
    </Link>
  )
}
