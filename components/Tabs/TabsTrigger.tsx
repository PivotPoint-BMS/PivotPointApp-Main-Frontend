import React, { forwardRef } from 'react'
import { Trigger, TabsTriggerProps } from '@radix-ui/react-tabs'
import clsx from 'clsx'

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ children, className, ...props }, ref) => (
    <Trigger
      ref={ref}
      {...props}
      className={clsx(
        'relative flex cursor-pointer items-center justify-start gap-3  px-1 pt-3 pb-3 text-sm transition-all',
        'before:absolute before:bottom-0 before:h-[3px] before:w-full before:rounded-t-full before:bg-primary-600 before:transition-all ltr:before:left-0 rtl:before:right-0',
        'before:duration-500 data-[state=inactive]:before:w-0',
        'data-[state=inactive]:text-gray-600 dark:data-[state=inactive]:text-gray-400',
        className
      )}
    >
      {children}
    </Trigger>
  )
)

export default TabsTrigger
