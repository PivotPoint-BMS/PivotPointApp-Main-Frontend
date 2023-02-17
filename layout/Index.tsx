import React from 'react'
// guards
import AuthGuard from 'guards/AuthGuard'
// hooks
import useResponsive from 'hooks/useResponsive'
import Header from './dashboard/header/Header'
// components
import SidebarDesktop from './dashboard/nav/SidebarDesktop'
import SidebarMobile from './dashboard/nav/SidebarMobile'
import LogoOnlyLayout from './LogoOnlyLayout'

function Layout({
  children,
  variant = 'dashboard',
}: {
  children: React.ReactNode | React.ReactNode[]
  variant: 'dashboard' | 'logoOnly' | 'main'
}) {
  const isDesktop = useResponsive('lg', 'up')

  if (variant === 'main') {
    return <> {children} </>
  }

  if (variant === 'logoOnly') {
    return <LogoOnlyLayout> {children} </LogoOnlyLayout>
  }

  return (
    <AuthGuard>
      <div className='flex h-screen w-full'>
        <Header />
        {isDesktop ? <SidebarDesktop /> : <SidebarMobile />}
        <div className='flex-1 p-2'>{children}</div>
      </div>
    </AuthGuard>
  )
}

export default Layout
