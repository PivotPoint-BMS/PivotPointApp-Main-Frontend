import React, { Suspense } from 'react'
import SideBar from './SideBar'

function Layout({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  return (
    <div className='flex'>
      <SideBar />
      <div className='flex-1'>
        <Suspense fallback={<p>Loading feed...</p>}>{children}</Suspense>
      </div>
    </div>
  )
}

export default Layout
