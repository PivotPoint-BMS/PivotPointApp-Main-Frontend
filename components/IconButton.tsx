import { cva, VariantProps } from 'class-variance-authority'
import React, { forwardRef } from 'react'

const iconButton = cva('rounded-full flex items-start justify-center', {
  variants: {
    intent: {
      default: [
        'text-gray-700 hover:bg-gray-300 active:bg-gray-800/40 focus:bg-gray-800/40 focus:outline-gray-900',
        'dark:text-gray-300 dark:hover:bg-gray-500/25 dark:active:bg-gray-500/50 dark:focus:outline-gray-900',
      ],
    },
    size: {
      small: 'p-2',
      medium: 'p-2',
      large: '',
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
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, intent, className, size, type = 'button', ...other }: IconButtonProps, ref) => (
    <button
      ref={ref}
      type={type}
      className={iconButton({ intent, size, class: className })}
      {...other}
    >
      {children}
    </button>
  )
)

export default IconButton
