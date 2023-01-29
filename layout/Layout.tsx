import React from 'react'
// hooks
import useResponsive from 'hooks/useResponsive'
import Header from './Header'
// components
import SidebarDesktop from './SidebarDesktop'
import SidebarMobile from './SidebarMobile'

function Layout({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  const isDesktop = useResponsive('lg', 'up')

  return (
    <div className='flex h-screen w-full'>
      <Header />
      {isDesktop ? <SidebarDesktop /> : <SidebarMobile />}
      <div className='flex-1 p-2'>{children}</div>
    </div>
  )
}

export default Layout
