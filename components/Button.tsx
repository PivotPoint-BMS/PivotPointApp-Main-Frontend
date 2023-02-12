import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'

export const buttonContained = cva('py-2 px-3 select-none flex items-center justify-center', {
  variants: {
    intent: {
      primary: [
        'bg-primary-600 hover:bg-primary-700 transition-all text-white active:bg-primary-500',
        'dark:bg-primary-700 dark:hover:bg-primary-700/70 dark:active:bg-primary-600',
      ],
      secondary:
        'bg-secondary-600 hover:bg-secondary-700 transition-all text-white active:bg-secondary-500',
      default:
        'bg-gray-200 hover:bg-gray-300 transition-all active:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-700 dark:active:bg-gray-500',
    },
    size: {
      small: 'text-sm  rounded-lg',
      medium: 'rounded-lg',
      large: 'text-lg  rounded-xl',
    },

    disabled: {
      true: [
        'cursor-not-allowed bg-gray-400 hover:bg-gray-400 active:bg-gray-400',
        'cursor-not-allowed dark:bg-gray-600 dark:hover:bg-gray-600 dark:active:bg-gray-600',
      ],
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'medium',
    disabled: true,
  },
})

export const buttonOutlined = cva('py-2 px-3 select-none font-medium', {
  variants: {
    intent: {
      primary:
        'border-2 border-primary-200 text-primary-600 hover:bg-primary-600/10 active:bg-primary-600/20',
      secondary:
        'border-2 border-secondary-200 text-secondary-600 hover:bg-secondary-600/10 active:bg-secondary-600/20',
      default: '',
    },
    size: {
      small: 'text-sm  rounded-lg',
      medium: 'rounded-lg',
      large: 'text-lg  rounded-xl',
    },
    disabled: {
      true: 'cursor-not-allowed bg-gray-400 hover:bg-gray-400 active:bg-gray-400',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'medium',
    disabled: true,
  },
})

export interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonContained & typeof buttonOutlined> {
  variant?: 'contained' | 'outlined'
  type?: 'button' | 'reset' | 'submit'
  loading?: boolean
}

export default function Button({
  children,
  variant = 'contained',
  intent,
  size,
  type = 'button',
  loading = false,
  className,
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      {...props}
      type={type}
      className={
        variant === 'contained'
          ? buttonContained({
              class: className,
              intent,
              size,
              disabled: disabled || loading,
            })
          : buttonOutlined({
              class: className,
              intent,
              size,
              disabled: disabled || loading,
            })
      }
    >
      {loading && (
        <svg
          className='-ml-1 h-5 w-5 animate-spin text-white ltr:mr-3 rtl:ml-3'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          ></circle>
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          ></path>
        </svg>
      )}
      {children}
    </button>
  )
}
