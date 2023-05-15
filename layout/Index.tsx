import React from 'react'
// guards
import AuthGuard from 'guards/AuthGuard'
// hooks
import useResponsive from 'hooks/useResponsive'
// config
import { HEADER } from 'config'
// components
import Header from './app/header/Header'
import SidebarDesktop from './app/nav/SidebarDesktop'
import SidebarMobile from './app/nav/SidebarMobile'
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
        <main
          className='h-full w-full flex-1 overflow-hidden'
          style={{ paddingTop: HEADER.DESKTOP_HEIGHT }}
        >
          {children}
        </main>
      </div>
    </AuthGuard>
  )
}

export default Layout
