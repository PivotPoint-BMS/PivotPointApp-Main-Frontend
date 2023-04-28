import clsx from 'clsx'
// radix
import Backdrop from './Backdrop'
import Button from './Button'

interface AlertDialogProps {
  open: boolean
  title?: string
  description?: string
  cancelText: string
  confirmText: string
  onConfirm: () => void
  onClose: () => void
}

export default function AlertDialog({
  open,
  cancelText,
  confirmText,
  description,
  title,
  onConfirm,
  onClose,
}: AlertDialogProps) {
  if (open)
    return (
      <Backdrop open={open}>
        <div
          className={clsx(
            'fixed z-[10000]',
            'w-[95vw] max-w-md rounded-lg p-4 md:w-full',
            'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
            'bg-white dark:bg-gray-800',
            'focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75'
          )}
        >
          {title && (
            <h1 className='text-lg font-medium text-gray-900 dark:text-gray-100'>{title}</h1>
          )}
          {description && (
            <p className='mt-2 mb-4 text-sm font-normal text-gray-700 dark:text-gray-400'>
              {description}
            </p>
          )}
          <div className=' flex justify-end space-x-2'>
            <Button
              variant='outlined'
              intent='default'
              className={clsx(
                'inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium',
                'bg-white text-gray-900 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-100 hover:dark:bg-gray-600',
                'border border-gray-300 dark:border-transparent',
                'focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75'
              )}
              onClick={onClose}
            >
              {cancelText}
            </Button>
            <Button
              variant='contained'
              intent='primary'
              className={clsx(
                'inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium',
                'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-700 dark:text-gray-100 dark:hover:bg-primary-600',
                'border border-transparent',
                'focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75'
              )}
              onClick={onConfirm}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </Backdrop>
    )
  return null
}
