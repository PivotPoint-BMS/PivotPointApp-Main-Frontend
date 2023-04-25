import { ReactNode } from 'react'
import { clsx } from 'clsx'
// radix
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

interface TooltipProps extends TooltipPrimitive.TooltipContentProps {
  title: string
  children: ReactNode | ReactNode[]
}

export default function Tooltip({ children, title, className, ...props }: TooltipProps) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          className={clsx(
            'data-[side=top]:animate-slide-down-fade',
            'data-[side=right]:animate-slide-left-fade',
            'data-[side=bottom]:animate-slide-up-fade',
            'data-[side=left]:animate-slide-right-fade',
            'inline-flex items-center rounded-md px-4 py-2.5',
            'bg-white dark:bg-gray-800',
            'drop-shadow-xl',
            className
          )}
          {...props}
        >
          <TooltipPrimitive.Arrow className='fill-current text-white dark:text-gray-800' />
          <span className='block text-xs leading-none text-gray-700 dark:text-gray-100'>
            {title}
          </span>
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
