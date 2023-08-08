import { clsx } from "clsx"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import React, { ReactNode } from "react"
import { Icon } from "@iconify/react"

interface PopoverProps
  extends PopoverPrimitive.PopoverContentProps,
    React.RefAttributes<HTMLDivElement> {
  trigger: ReactNode
}

const Popover = ({ trigger, children, className }: PopoverProps) => (
  <div className='relative inline-block text-left'>
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Content
        align='center'
        sideOffset={4}
        className={clsx(
          "border data-[side=top]:animate-slide-up data-[side=bottom]:animate-slide-down",
          "z-50 w-fit rounded-lg p-4 shadow-lg",
          "bg-paper-light dark:bg-paper-dark",
          className
        )}
      >
        {children}

        <PopoverPrimitive.Close
          className={clsx(
            "absolute top-3.5 inline-flex items-center justify-center rounded-full p-1 ltr:right-3.5 rtl:left-3.5",
            "focus:outline-none focus-visible:ring focus-visible:ring-opacity-75"
          )}
        >
          <Icon
            icon='ic:round-close'
            className='h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400'
          />
        </PopoverPrimitive.Close>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Root>
  </div>
)

export default Popover
