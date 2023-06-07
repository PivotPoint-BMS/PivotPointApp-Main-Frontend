import React, { forwardRef } from 'react'
import { List, TabsListProps } from '@radix-ui/react-tabs'
import clsx from 'clsx'

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ children, className, ...props }, ref) => (
    <List
      ref={ref}
      {...props}
      className={clsx(
        'w-full overflow-x-auto py-1',
        'flex items-center gap-4',
        'bg-gray-100 px-1 dark:bg-gray-900',
        className
      )}
    >
      {children}
    </List>
  )
)

export default TabsList
