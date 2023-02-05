import clsx from 'clsx'
import React from 'react'

export interface CardContentProps {
  children: React.ReactNode | React.ReactNode[]
}

export default function CardContent({ children }: CardContentProps) {
  return <div className={clsx('w-full p-4')}>{children}</div>
}
