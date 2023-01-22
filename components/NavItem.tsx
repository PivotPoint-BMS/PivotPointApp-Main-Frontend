import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Props =
  | {
      href: string
      tooltip?: string
      icon: React.ReactElement
      asLink?: boolean
      onClick?: () => never
    }
  | {
      tooltip?: string
      icon: React.ReactElement
      onClick?: () => void
      asLink?: never
      href?: never
    }

function NavItem({ tooltip, icon, asLink = false, href = '', onClick }: Props) {
  const router = useRouter()

  return asLink ? (
    <Link
      href={href}
      className={clsx([
        'relative flex w-full items-center rounded-xl p-4 text-primary-900 transition-all dark:text-white',
        router.asPath.split('/')[1] === href.split('/')[1]
          ? 'bg-primary-500/10 hover:bg-primary-500/25 dark:bg-gray-300/10 dark:hover:bg-gray-200/20'
          : 'hover:bg-primary-500/10 dark:hover:bg-gray-300/10',
      ])}
    >
      {icon}
      <h3 className='w-max text-[0px] opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:text-sm group-hover:opacity-100'>
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
      className='relative flex w-full items-center rounded-xl p-4 text-primary-900 transition-colors hover:bg-primary-500/10 dark:text-white dark:hover:bg-gray-300/10'
      onClick={onClick}
    >
      {icon}
      <h3 className='w-max text-[0px] opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:text-sm group-hover:opacity-100'>
        {tooltip}
      </h3>
      {tooltip && (
        <span className='absolute left-12 top-0 m-2 h-max w-max origin-left scale-0 rounded-lg bg-gray-300 p-2 text-xs font-medium text-rich-black shadow-xl transition-all duration-300'>
          {tooltip}
        </span>
      )}
    </button>
  )
}

export default NavItem
