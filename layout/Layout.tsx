import React, { Suspense } from 'react'
// hooks
import useResponsive from 'hooks/useResponsive'
import Header from './Header'
import SidebarDesktop from './SidebarDesktop'
import SidebarMobile from './SidebarMobile'

function Layout({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  const isDesktop = useResponsive('lg', 'up')

  return (
    <div className='flex h-screen w-full'>
      <Header />
      {isDesktop ? <SidebarDesktop /> : <SidebarMobile />}
      <div className='flex-1 p-2'>
        <Suspense fallback={<p>Loading feed...</p>}>{children}</Suspense>
      </div>
    </div>
  )
}

export default Layout
