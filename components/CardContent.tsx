import clsx from "clsx"
import React from "react"

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode | React.ReactNode[]
}

export default function CardContent({ children, className }: CardContentProps) {
  return <div className={clsx("w-full p-4", className)}>{children}</div>
}
