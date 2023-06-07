import React, { forwardRef } from 'react'
import { Content, TabsContentProps } from '@radix-ui/react-tabs'
import clsx from 'clsx'

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ children, className, ...props }, ref) => (
    <Content ref={ref} {...props} className={clsx('w-full', className)}>
      {children}
    </Content>
  )
)

export default TabsContent
