import clsx from 'clsx'
// radix
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { ReactNode, useState } from 'react'

interface AlertDialogProps {
  title?: string
  description?: string
  cancelText: string
  confirmText: string
  onConfirm: () => void
  children: ReactNode
}

export default function AlertDialog({
  cancelText,
  confirmText,
  description,
  title,
  onConfirm,
  children,
}: AlertDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AlertDialogPrimitive.Root open={isOpen} defaultOpen={false} onOpenChange={setIsOpen}>
      <AlertDialogPrimitive.Trigger asChild>{children}</AlertDialogPrimitive.Trigger>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className='fixed inset-0 z-[9999] bg-black/50' />
        <AlertDialogPrimitive.Content
          className={clsx(
            'fixed z-[10000]',
            'w-[95vw] max-w-md rounded-lg p-4 md:w-full',
            'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
            'bg-white dark:bg-gray-800',
            'focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75'
          )}
        >
          {title && (
            <AlertDialogPrimitive.Title className='text-lg font-medium text-gray-900 dark:text-gray-100'>
              {title}
            </AlertDialogPrimitive.Title>
          )}
          {description && (
            <AlertDialogPrimitive.Description className='mt-2 mb-4 text-sm font-normal text-gray-700 dark:text-gray-400'>
              {description}
            </AlertDialogPrimitive.Description>
          )}
          <div className=' flex justify-end space-x-2'>
            <AlertDialogPrimitive.Cancel
              className={clsx(
                'inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium',
                'bg-white text-gray-900 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-100 hover:dark:bg-gray-600',
                'border border-gray-300 dark:border-transparent',
                'focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75'
              )}
              onClick={() => setIsOpen(false)}
            >
              {cancelText}
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action
              className={clsx(
                'inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium',
                'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-700 dark:text-gray-100 dark:hover:bg-primary-600',
                'border border-transparent',
                'focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75'
              )}
              onClick={onConfirm}
            >
              {confirmText}
            </AlertDialogPrimitive.Action>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  )
}
