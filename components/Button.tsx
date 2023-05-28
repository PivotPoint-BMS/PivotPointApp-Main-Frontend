import React, { forwardRef } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { ClassProp } from 'class-variance-authority/dist/types'

export const buttonContained = cva(
  'select-none flex items-center justify-center gap-2 font-semibold rounded-lg capitalize transition-all',
  {
    variants: {
      intent: {
        primary: [
          'bg-primary-600 hover:bg-primary-700 text-white active:bg-primary-500',
          'dark:bg-primary-700 dark:hover:bg-primary-700/70 dark:active:bg-primary-600',
        ],
        secondary: [
          'bg-secondary-500 hover:bg-secondary-700 text-white active:bg-secondary-400',
          'dark:bg-secondary-600 dark:hover:bg-secondary-700/70 dark:active:bg-secondary-500',
        ],
        error: [
          'bg-red-500 hover:bg-red-700 text-white active:bg-red-400',
          'dark:bg-red-600 dark:hover:bg-red-700/70 dark:active:bg-red-500',
        ],
        default: [
          'bg-gray-300 hover:bg-gray-400 active:bg-gray-200',
          ' dark:bg-gray-200 text-black dark:hover:bg-gray-400 dark:active:bg-gray-100',
        ],
      },
      size: {
        small: 'text-[13px] px-2 py-1',
        medium: 'text-sm px-4 py-2',
        large: 'text-[15px] px-6 py-2',
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
  }
)

export const buttonOutlined = cva(
  'select-none flex items-center justify-center gap-2 font-semibold rounded-lg capitalize border transition-all',
  {
    variants: {
      intent: {
        primary: [
          'border-primary-200 text-primary-600 hover:border-primary-600 hover:bg-primary-600/10 active:bg-primary-600/30',
          'dark:border-primary-600 dark:text-primary-200 dark:hover:border-primary-200 dark:hover:bg-primary-400/10 dark:active:bg-primary-400/30',
        ],
        secondary: [
          'border-secondary-200 text-secondary-600 hover:border-secondary-600 hover:bg-secondary-600/10 active:bg-secondary-600/30',
          'dark:border-secondary-600 dark:text-secondary-200 dark:hover:border-secondary-200 dark:hover:bg-secondary-400/10 dark:active:bg-secondary-400/30',
        ],
        error: [
          'border-red-300 text-red-600 hover:border-red-600 hover:bg-red-600/10 active:bg-red-600/30',
          'dark:border-red-600 dark:text-red-400 dark:hover:border-red-200 dark:hover:bg-red-400/10 dark:active:bg-secondary-400/30',
        ],
        default: [
          ' text-gray-900 hover:bg-gray-600/10 hover:border-black active:bg-gray-600/40',
          'dark:border-gray-500 dark:text-white dark:hover:bg-gray-500/25 dark:hover:border-white dark:active:bg-gray-400/50 dark:focus:outline-gray-900',
        ],
      },
      size: {
        small: 'text-[13px] px-2 py-1',
        medium: 'text-sm px-4 py-2',
        large: 'text-[15px] px-6 py-2',
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
  }
)

export const buttonText = cva(
  'select-none flex items-center justify-center gap-2 font-semibold rounded-lg capitalize transition-all',
  {
    variants: {
      intent: {
        primary: [
          'text-primary-600 hover:bg-primary-600/10 active:bg-primary-600/30',
          'dark:text-primary-200 dark:hover:bg-primary-400/10',
        ],
        secondary: [
          'text-secondary-600 hover:bg-secondary-600/10 active:bg-secondary-600/30',
          'dark:text-secondary-200 dark:hover:bg-secondary-400/10',
        ],
        error: [
          'text-red-600 hover:bg-red-600/10 active:bg-red-600/30',
          'dark:text-red-400 dark:hover:bg-red-400/10',
        ],
        default: [
          'text-gray-900 hover:bg-gray-600/10  active:bg-gray-600/40',
          'dark:text-white dark:hover:bg-gray-500/25 dark:focus:outline-gray-900',
        ],
      },
      size: {
        small: 'text-[13px] px-2 py-1',
        medium: 'text-sm px-4 py-2',
        large: 'text-[15px] px-6 py-2',
      },
      disabled: {
        true: 'cursor-not-allowed dark:bg-gray-600 dark:hover:bg-gray-600 dark:active:bg-gray-600',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'medium',
      disabled: true,
    },
  }
)

export interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonContained & typeof buttonOutlined> {
  variant?: 'contained' | 'outlined' | 'text'
  type?: 'button' | 'reset' | 'submit'
  loading?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'contained',
      intent,
      size,
      type = 'button',
      loading = false,
      className,
      disabled = false,
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => {
    const getVariant = (
      classProps:
        | ({
            intent?: 'primary' | 'secondary' | 'error' | 'default' | null | undefined
            size?: 'small' | 'medium' | 'large' | null | undefined
            disabled?: boolean | null | undefined
          } & ClassProp)
        | undefined
    ) => {
      if (variant === 'contained') return buttonContained({ ...classProps })
      if (variant === 'outlined') return buttonOutlined({ ...classProps })
      if (variant === 'text') return buttonText({ ...classProps })
      return buttonContained({ ...classProps })
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        {...props}
        type={type}
        className={getVariant({
          class: className,
          intent,
          size,
          disabled: disabled || loading,
        })}
      >
        {startIcon && !loading && <span>{startIcon}</span>}
        <span className='flex items-center justify-center gap-1'>
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
        </span>
        {endIcon && <span>{endIcon}</span>}
      </button>
    )
  }
)

export default Button
