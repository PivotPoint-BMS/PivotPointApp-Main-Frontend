import React, { forwardRef } from 'react'
import { cva, VariantProps } from 'class-variance-authority'

const card = cva('rounded-lg divide-gray-300 bg-paper-light dark:bg-paper-dark', {
  variants: {
    variant: {
      elevated: 'shadow-xl',
      outlined: 'border  dark:border-gray-500',
      'outlined-dashed': 'border border-dashed  dark:border-gray-500',
      default: 'border-none',
    },
    fullWidth: {
      true: 'w-full',
      false: 'w-fit',
    },
    divided: {
      true: 'divide-y dark:divide-gray-500',
    },
  },
  defaultVariants: {
    variant: 'outlined',
    fullWidth: false,
    divided: false,
  },
})

export interface CardProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof card> {
  children: React.ReactNode | React.ReactNode[]
}
//
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant, fullWidth, divided, className }, ref) => (
    <div ref={ref} className={card({ fullWidth, variant, divided, class: className })}>
      {children}
    </div>
  )
)

export default Card
