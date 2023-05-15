import React, { forwardRef } from 'react'
import { cva, VariantProps } from 'class-variance-authority'

export const iconButton = cva('rounded-full flex items-start justify-center outline-none', {
  variants: {
    intent: {
      default: [
        'text-gray-700 hover:bg-gray-300 active:bg-gray-800/40 outline focus-visible:bg-gray-800/40',
        'dark:text-gray-300 dark:hover:bg-gray-500/25 dark:active:bg-gray-500/50',
      ],
      primary: [
        'text-primary-700 hover:bg-primary-300 active:bg-primary-800/40 outline focus-visible:bg-primary-800/40',
        'dark:text-primary-300 dark:hover:bg-primary-500/25 dark:active:bg-primary-500/50',
      ],
    },
    size: {
      small: 'p-2',
      medium: 'p-2',
      large: '',
    },
    disabled: {
      true: [
        'cursor-not-allowed bg-gray-100 hover:!bg-gray-100 active:bg-gray-100 text-gray-300',
        'dark:bg-gray-600 dark:hover:bg-gray-600 dark:active:bg-gray-600 dark:text-gray-400',
      ],
    },
  },
  defaultVariants: {
    intent: 'default',
    size: 'medium',
  },
})

export interface IconButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButton> {
  children: React.ReactNode | React.ReactNode[]

  type?: 'button' | 'reset' | 'submit'
  disabled?: boolean
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { children, intent, className, size, type = 'button', disabled, ...other }: IconButtonProps,
    ref
  ) => (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={iconButton({ intent, size, disabled, class: className })}
      {...other}
    >
      {children}
    </button>
  )
)

export default IconButton
