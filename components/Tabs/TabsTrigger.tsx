import React, { forwardRef } from "react"
import { Trigger, TabsTriggerProps } from "@radix-ui/react-tabs"
import clsx from "clsx"

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ children, className, disabled, ...props }, ref) => (
    <Trigger
      ref={ref}
      {...props}
      className={clsx(
        "relative flex cursor-pointer items-center gap-3 p-3 text-sm outline-none transition-all",
        "data-[state=active]:bg-primary-600 data-[state=active]:text-white dark:data-[state=active]:bg-primary-700",
        "data-[state=inactive]:text-gray-600 dark:data-[state=inactive]:text-gray-400",
        "rounded ring-black focus-visible:bg-primary-500 focus-visible:ring-1 dark:focus-visible:bg-primary-600",
        disabled && "!text-gray-300 dark:!text-gray-600",
        className
      )}
      disabled={disabled}
    >
      {children}
    </Trigger>
  )
)

export default TabsTrigger
