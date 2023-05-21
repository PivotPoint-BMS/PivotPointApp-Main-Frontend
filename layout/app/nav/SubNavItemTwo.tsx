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
import { Badge } from 'components'

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

export default function SubNavItemTwo({ name, href, icon, badge, disabled, isCollapsed }: Props) {
  const { pathname, asPath } = useRouter()
  const active = getActivePath(href, pathname, asPath)
  const { t } = useTranslate()

  return (
    <Link
      href={disabled ? '' : href}
      className={clsx(
        'flex w-full items-center rounded-xl p-4 text-white',
        active
          ? 'bg-secondary-800 hover:bg-secondary-900 dark:bg-secondary-800 dark:hover:bg-secondary-700'
          : 'bg-secondary-400/50 hover:bg-secondary-500/80 dark:bg-secondary-300/10 dark:hover:bg-secondary-300/20',
        disabled &&
          'pointer-events-none cursor-not-allowed opacity-40 hover:bg-gray-100/40 dark:hover:bg-secondary-100/60'
      )}
    >
      <Iconify icon={icon} height={20} width={20} />
      <label
        className={clsx(
          'flex-1 cursor-pointer font-medium capitalize ',
          isCollapsed
            ? 'truncate text-[0px] opacity-0 transition-all duration-300 group-hover:text-xs group-hover:opacity-100 ltr:group-hover:ml-3 rtl:group-hover:mr-3'
            : 'text-xs ltr:ml-3 rtl:mr-3',
          disabled && 'cursor-not-allowed'
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
          intent='warning'
          className={clsx('truncate text-[10px]', isCollapsed && 'hidden group-hover:block')}
        />
      )}
    </Link>
  )
}
