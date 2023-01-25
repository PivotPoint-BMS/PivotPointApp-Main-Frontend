import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Icon as Iconify } from '@iconify/react'

type Props = {
  name: string
  href: string
  icon: string
}

export default function NavItemTwo({ name, href, icon }: Props) {
  const router = useRouter()
  return (
    <Link
      href={href}
      className={clsx(
        'flex w-full items-center gap-3 rounded-xl py-3 px-5',
        router.asPath.split('/')[2] === href.split('/')[1]
          ? 'bg-secondary-600 text-gray-200 hover:bg-secondary-700 dark:text-gray-100'
          : 'bg-gray-100/40 text-secondary-600 hover:bg-gray-100/60 dark:bg-secondary-100/60 dark:text-gray-300 dark:hover:bg-secondary-200/50'
      )}
    >
      <Iconify icon={icon} height={20} width={20} />
      <h4 className='text-xs capitalize'>{name}</h4>
    </Link>
  )
}
