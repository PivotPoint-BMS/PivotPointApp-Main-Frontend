import React, { Suspense, useEffect } from 'react'
import { useRouter } from 'next/router'
// redux
import { useAppDispatch } from 'store/hooks'
import { close } from 'store/sideBarSlice'
// hooks
import useResponsive from 'hooks/useResponsive'
import Header from './Header'
// components
import SidebarDesktop from './SidebarDesktop'
import SidebarMobile from './SidebarMobile'

function Layout({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  const isDesktop = useResponsive('lg', 'up')
  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(close())
  }, [router.pathname])

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
