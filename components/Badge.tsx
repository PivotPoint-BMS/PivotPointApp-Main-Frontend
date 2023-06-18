import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'

export const badgeContained = cva(
  'flex truncate w-max items-center justify-center text-xs rounded-full py-1 font-bold select-none',
  {
    variants: {
      intent: {
        primary: 'bg-primary-500/80 text-white dark:text-primary-900 dark:bg-primary-500/60',
        secondary:
          'bg-secondary-100/50 text-secondary-900 dark:text-secondary-100 dark:bg-secondary-300/20',
        info: 'bg-blue-200/80 text-blue-900 dark:text-blue-100 dark:bg-blue-500/20',
        warning: 'bg-orange-200/80 text-orange-900 dark:text-orange-100 dark:bg-orange-500/20',
        error: 'bg-red-200/80 text-red-900 dark:text-red-100 dark:bg-red-500/20',
        success: 'bg-green-200/80 text-green-900 dark:text-green-100 dark:bg-green-500/20',
        default: 'bg-gray-200 text-black dark:text-white dark:bg-gray-600',
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

export const badgeOutlined = cva(
  'flex truncate items-center w-max text-xs rounded-full py-1 font-bold select-none',
  {
    variants: {
      intent: {
        primary: 'border border-primary-400 text-primary-600 dark:text-primary-100',
        secondary: 'border border-secondary-400 text-secondary-600 dark:text-secondary-100',
        info: 'border border-blue-400 text-blue-600 dark:text-blue-100',
        warning: 'border border-orange-400 text-orange-600 dark:text-orange-100',
        error: 'border border-red-400 text-red-600 dark:text-red-100',
        success: 'border border-green-400 text-green-600 dark:text-green-100',
        default: 'border border-black text-black dark:text-white dark:border-white',
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
  }
)

export const badgeGhost = cva(
  'flex truncate items-start justify-center w-max rounded-full py-1 font-bold select-none',
  {
    variants: {
      intent: {
        primary:
          'border border-primary-400 bg-primary-400/20 text-primary-600 dark:text-primary-100',
        secondary:
          'border border-secondary-400 bg-secondary-400/20 text-secondary-600 dark:text-secondary-100',
        info: 'border border-blue-400 bg-blue-400/20 text-blue-600 dark:text-blue-100',
        warning: 'border border-orange-400 bg-orange-400/20 text-orange-600 dark:text-orange-100',
        error: 'border border-red-400 bg-red-400/20 text-red-600 dark:text-red-100',
        success: 'border border-green-400 bg-green-400/20 text-green-600 dark:text-green-100',
        default:
          'border border-black bg-gray-400/30 text-black dark:text-white dark:border-white dark:bg-white/10',
      },

      size: {
        small: 'px-2 text-xs',
        medium: 'px-2 text-[13px]',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'small',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeContained & typeof badgeOutlined> {
  variant?: 'contained' | 'outlined' | 'ghost'
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
  if (variant === 'ghost')
    return (
      <span {...props} className={badgeGhost({ intent, size, class: className })}>
        {icon && <span className='ltr:mr-2 rtl:ml-2'>{icon}</span>}
        {label}
      </span>
    )
  if (variant === 'outlined')
    return (
      <span {...props} className={badgeOutlined({ intent, size, class: className })}>
        {icon && <span className='ltr:mr-2 rtl:ml-2'>{icon}</span>}
        {label}
      </span>
    )
  return (
    <span {...props} className={badgeContained({ intent, size, class: className })}>
      {icon && <span className='ltr:mr-2 rtl:ml-2'>{icon}</span>}
      {label}
    </span>
  )
}
