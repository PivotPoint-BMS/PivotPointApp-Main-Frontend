import React from 'react'
import SimpleBarReact, { Props } from 'simplebar-react'

type ScrollbarProps = Props & {
  children: React.ReactNode | React.ReactNode[]
}

export default function Scrollbar({ children, ...other }: ScrollbarProps) {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)

  if (isMobile) {
    return (
      <div className='overflow-x-auto' {...other}>
        {children}
      </div>
    )
  }

  return (
    <SimpleBarReact clickOnTrack={false} {...other}>
      {children}
    </SimpleBarReact>
  )
}
