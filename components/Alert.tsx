import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { Icon as Iconify } from '@iconify/react'

export const alertContained = cva('flex w-full items-center rounded-xl px-4 py-3 gap-3', {
  variants: {
    intent: {
      info: 'bg-blue-200/80 text-blue-800 dark:text-blue-100 dark:bg-blue-700/30',
      warning: 'bg-orange-200/80 text-orange-900 dark:text-orange-100 dark:bg-orange-500/20',
      error: 'bg-red-200/80 text-red-900 dark:text-red-100 dark:bg-red-500/20',
    },
  },
  defaultVariants: {
    intent: 'info',
  },
})

export const alertOutlined = cva('flex w-full items-center rounded-xl px-4 py-3 gap-3', {
  variants: {
    intent: {
      info: 'border-2 border-blue-400 text-blue-600 dark:text-blue-100',
      warning: 'border-2 border-orange-400 text-orange-600 dark:text-orange-100',
      error: 'border-2 border-red-400 text-red-600 dark:text-red-100',
    },
  },
  defaultVariants: {
    intent: 'info',
  },
})

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertContained & typeof alertOutlined> {
  variant?: 'contained' | 'outlined'
}

export default function Alert({
  variant = 'contained',
  intent,
  className,
  children,
  ...props
}: AlertProps) {
  const getIcon = () => {
    if (intent === 'error') return 'material-symbols:error-circle-rounded'
    if (intent === 'warning') return 'material-symbols:warning-rounded'
    return 'material-symbols:info-rounded'
  }

  return (
    <div
      {...props}
      className={
        variant === 'contained'
          ? alertContained({ intent, class: className })
          : alertOutlined({ intent, class: className })
      }
    >
      <div className='flex h-full'>
        <Iconify icon={getIcon()} height={20} width={20} />
      </div>
      {children}
    </div>
  )
}
