import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'

export const badgeContained = cva(
  'flex w-max items-center text-xs rounded-full py-1 font-semibold select-none',
  {
    variants: {
      intent: {
        primary: 'bg-primary-500/80 text-white dark:text-primary-800 dark:bg-primary-500/20',
        secondary:
          'bg-secondary-100/50 text-secondary-900 dark:text-secondary-100 dark:bg-secondary-300/20',
        info: 'bg-blue-200/80 text-blue-900 dark:text-blue-100 dark:bg-blue-500/20',
        warning: 'bg-orange-200/80 text-orange-900 dark:text-orange-100 dark:bg-orange-500/20',
        error: 'bg-red-200/80 text-red-900 dark:text-red-100 dark:bg-red-500/20',
      },
      size: {
        small: 'px-2 h-6',
        medium: 'px-3 h-8',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'small',
    },
  }
)

export const badgeOutlined = cva('w-max text-xs rounded-full py-1 font-semibold select-none', {
  variants: {
    intent: {
      primary: 'border-2 border-primary-400 text-primary-600 dark:text-primary-100',
      secondary: 'border-2 border-secondary-400 text-secondary-600 dark:text-secondary-100',
      info: 'border-2 border-blue-400 text-blue-600 dark:text-blue-100',
      warning: 'border-2 border-orange-400 text-orange-600 dark:text-orange-100',
      error: 'border-2 border-red-400 text-red-600 dark:text-red-100',
    },

    size: {
      small: 'px-2 h-6',
      medium: 'px-2 h-8',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'small',
  },
})

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeContained & typeof badgeOutlined> {
  variant?: 'contained' | 'outlined'
  icon?: React.ReactNode
  label: string
}

export default function Badge({
  variant = 'contained',
  intent,
  size,
  className,
  icon,
  label,
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={
        variant === 'contained'
          ? badgeContained({ intent, size, className })
          : badgeOutlined({ intent, size, className })
      }
    >
      {icon && <span className='ltr:mr-2 rtl:ml-2'>{icon}</span>}
      <p className='truncate'>{label}</p>
    </span>
  )
}
