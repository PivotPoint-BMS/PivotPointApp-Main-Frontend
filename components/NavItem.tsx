import clsx from 'clsx'
import Link from 'next/link'

type Props =
  | {
      href: string
      tooltip?: string
      icon: React.ReactElement
      isActive: boolean
      asLink?: boolean
      onClick?: () => never
    }
  | {
      tooltip?: string
      icon: React.ReactElement
      onClick?: () => void
      isActive?: never
      asLink?: never
      href?: never
    }

function NavItem({ tooltip, icon, isActive, asLink = false, href = '', onClick }: Props) {
  return asLink ? (
    <Link
      href={href}
      className={clsx([
        'relative flex w-full items-center rounded-xl p-4 text-primary-900 transition-all group-hover:gap-3 dark:text-white',
        isActive
          ? 'bg-primary-500/10 hover:bg-primary-500/25 dark:bg-gray-300/10 dark:hover:bg-gray-200/20'
          : 'hover:bg-primary-500/10 dark:hover:bg-gray-300/10',
      ])}
    >
      {icon}
      <h3 className='hidden text-sm transition-all delay-75 duration-300 group-hover:block'>
        {tooltip}
      </h3>
      {tooltip && (
        <span className='absolute left-12 top-0 m-2 h-max w-max origin-left scale-0 rounded-lg bg-gray-300 p-2 text-xs font-medium text-rich-black shadow-xl transition-all duration-300'>
          {tooltip}
        </span>
      )}
    </Link>
  ) : (
    <button
      className='relative flex w-full items-center gap-3 rounded-xl p-3 text-primary-900 transition-colors hover:bg-primary-500/10 dark:text-white dark:hover:bg-gray-300/10'
      onClick={onClick}
    >
      {icon}
      <h3 className='hidden text-sm duration-300 group-hover:block'>{tooltip}</h3>
      {tooltip && (
        <span className='absolute left-12 top-0 m-2 h-max w-max origin-left scale-0 rounded-lg bg-gray-300 p-2 text-xs font-medium text-rich-black shadow-xl transition-all duration-300'>
          {tooltip}
        </span>
      )}
    </button>
  )
}

export default NavItem
