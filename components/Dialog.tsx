import { ReactNode } from 'react'
import clsx from 'clsx'
// motion
import { motion } from 'framer-motion'
// radix
import Backdrop from './Backdrop'

interface DialogProps {
  open: boolean
  title?: string
  description?: string
  children: ReactNode
}

export default function Dialog({ open, description, title, children }: DialogProps) {
  if (open)
    return (
      <Backdrop open={open}>
        <motion.div
          initial={{ opacity: 0 }}
          variants={{ open: { opacity: 1 }, close: { opacity: 0 } }}
          animate={open ? 'open' : 'close'}
          transition={{ duration: 0.3 }}
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
          {children}
        </motion.div>
      </Backdrop>
    )
  return null
}
