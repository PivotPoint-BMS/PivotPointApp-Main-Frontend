import React from 'react'
// redux
import { useAppSelector } from 'store/hooks'
// components
import Snackbar from './Snackbar'

export default function SnackbarProvider({
  children,
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  const { isOpen, autoHideDuration, message, side, type, variant } = useAppSelector(
    (state) => state.snackbar
  )
  return (
    <div>
      {children}
      <Snackbar
        isOpen={isOpen}
        message={message}
        autoHideDuration={autoHideDuration}
        side={side}
        type={type}
        variant={variant}
      />
    </div>
  )
}
