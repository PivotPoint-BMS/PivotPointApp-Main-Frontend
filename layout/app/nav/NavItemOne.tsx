import clsx from 'clsx'
// next
import Link from 'next/link'
import { useRouter } from 'next/router'
// hooks
import useTranslate from 'hooks/useTranslate'
// utils
import getActivePath from 'utils/getActivePath'
// components
import Badge from 'components/Badge'

type Props =
  | {
      href: string
      name?: string
      icon: React.ReactElement
      asLink?: boolean
      disabled?: boolean
      badge?: {
        label: string
        color?: 'primary' | 'secondary' | 'info' | 'warning' | 'error' | 'success' | 'default'
      }
      onClick?: () => never
    }
  | {
      name?: string
      icon: React.ReactElement
      onClick?: () => void
      asLink?: never
      href?: never
      disabled?: never
      badge?: never
    }

function NavItemOne({ name, icon, asLink = false, href = '', onClick, badge, disabled }: Props) {
  const { t } = useTranslate()
  const { pathname, asPath } = useRouter()
  const active = getActivePath(href, pathname, asPath)

  return asLink ? (
    <Link
      href={href}
      className={clsx([
        'relative flex w-fit items-center rounded-xl p-4 text-secondary-900 transition-all group-hover:w-full dark:text-white',
        active
          ? 'bg-secondary-500/10 hover:bg-secondary-500/25 dark:bg-gray-300/10 dark:hover:bg-gray-200/20'
          : 'hover:bg-secondary-500/10 dark:hover:bg-gray-300/10',
        disabled &&
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
      className='relative flex w-full items-center rounded-xl p-4 text-secondary-900 transition-colors hover:bg-secondary-500/10 dark:text-white dark:hover:bg-gray-300/10'
      onClick={onClick}
    >
      {icon}
      <label className='w-max text-[0px] font-medium capitalize opacity-0 transition-all duration-300 group-hover:text-xs  group-hover:opacity-100 ltr:group-hover:ml-3 rtl:group-hover:mr-3'>
        {name}
      </label>
      {name && (
        <span className='absolute left-12 top-0 m-2 h-max w-max origin-left scale-0 rounded-lg bg-gray-300 p-2 text-xs font-medium text-rich-black shadow-xl transition-all duration-300'>
          {name}
        </span>
      )}
    </button>
  )
}

export default NavItemOne
