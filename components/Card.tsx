import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'

const card = cva('rounded-xl divide-gray-300 bg-paper-light dark:bg-paper-dark', {
  variants: {
    variant: {
      elevated: 'shadow-xl',
      outlined: 'border border-gray-400 dark:border-gray-500',
      'outlined-dashed': 'border border-dashed border-gray-400 dark:border-gray-500',
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
    variant: 'outlined-dashed',
    fullWidth: false,
    divided: false,
  },
})

export interface CardProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof card> {
  children: React.ReactNode | React.ReactNode[]
}

export default function Card({ children, variant, fullWidth, divided, className }: CardProps) {
  return <div className={card({ fullWidth, variant, divided, class: className })}>{children}</div>
}
