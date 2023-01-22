import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'

export const buttonContained = cva('py-2 px-3 select-none', {
  variants: {
    intent: {
      primary:
        'bg-primary-600 hover:bg-primary-700 transition-all text-white active:bg-primary-500',
      secondary:
        'bg-secondary-600 hover:bg-secondary-700 transition-all text-white active:bg-secondary-500',
    },
    size: {
      small: 'text-sm  rounded-xl',
      medium: 'rounded-xl',
      large: 'text-lg  rounded-xl',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'medium',
  },
})

export const buttonOutlined = cva('py-2 px-3 select-none font-medium', {
  variants: {
    intent: {
      primary:
        'border-2 border-primary-200 text-primary-600 hover:bg-primary-600/10 active:bg-primary-600/20',
      secondary:
        'border-2 border-secondary-200 text-secondary-600 hover:bg-secondary-600/10 active:bg-secondary-600/20',
    },
    size: {
      small: 'text-sm  rounded-xl',
      medium: 'rounded-xl',
      large: 'text-lg  rounded-xl',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'medium',
  },
})

export interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonContained & typeof buttonOutlined> {
  variant?: 'contained' | 'outlined'
}

export default function Button({
  children,
  variant = 'contained',
  intent,
  size,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={
        variant === 'contained'
          ? buttonContained({ intent, size, className })
          : buttonOutlined({ intent, size, className })
      }
    >
      {children}
    </button>
  )
}
