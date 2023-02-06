import React from 'react'
// hooks
import useResponsive from 'hooks/useResponsive'
import Header from './dashboard/header/Header'
// components
import SidebarDesktop from './dashboard/nav/SidebarDesktop'
import SidebarMobile from './dashboard/nav/SidebarMobile'

function Layout({
  children,
  variant = 'dashboard',
}: {
  children: React.ReactNode | React.ReactNode[]
  variant: 'dashboard' | 'logoOnly'
}) {
  const isDesktop = useResponsive('lg', 'up')

  if (variant === 'logoOnly') {
    return <> {children} </>
  }

  return (
    <div className='flex h-screen w-full'>
      <Header />
      {isDesktop ? <SidebarDesktop /> : <SidebarMobile />}
      <div className='flex-1 p-2'>{children}</div>
    </div>
  )
}

export default Layout
