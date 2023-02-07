import React from 'react'
// next
import Link from 'next/link'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// components
import Logo from '@/components/Logo'

export default function LogoOnlyLayout({
  children,
}: {
  children: React.ReactNode | React.ReactNode[]
}) {
  return (
    <>
      <header className='absolute left-0 top-0 z-10 w-full bg-white/80 px-5 py-3 backdrop-blur-sm dark:bg-secondary-900/80 md:px-10'>
        <Link href={PATH_DASHBOARD.root}>
          <Logo height={60} width={60} />
        </Link>
      </header>
      {children}
    </>
  )
}
