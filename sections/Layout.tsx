import React, { Suspense } from 'react'
import Header from './Header'
import SideBar from './SideBar'

function Layout({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  return (
    <div className='flex h-screen w-full'>
      <Header />
      <SideBar />
      <div className='flex-1 p-2'>
        <Suspense fallback={<p>Loading feed...</p>}>{children}</Suspense>
      </div>
    </div>
  )
}

export default Layout
