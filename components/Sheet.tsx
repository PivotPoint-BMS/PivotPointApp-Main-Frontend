import React, { ReactNode, useEffect, useState } from 'react'
import clsx from 'clsx'
// framer motion
import { motion, Variant } from 'framer-motion'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import { Icon } from '@iconify/react'
import IconButton from './IconButton'

export interface SheetProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  handleClose: () => void
  title?: string
  actions?: ReactNode
}

function Sheet({ isOpen, handleClose, children, actions, title, className }: SheetProps) {
  const { locale } = useTranslate()
  const [backdropOpen, setBackdropOpen] = useState(false)
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    setOpened(isOpen)
    setBackdropOpen(isOpen)
  }, [isOpen])

  const variants: { [key: string]: Variant } = {
    closed: { x: locale === 'ar' ? '-100%' : '100%' },
    opened: { x: '0%' },
  }

  const onClose = () => {
    setOpened(false)
    setTimeout(() => {
      handleClose()
    }, 400)
    setTimeout(() => {
      setBackdropOpen(false)
    }, 200)
  }

  return (
    <motion.div
      initial='closed'
      animate={backdropOpen ? 'opened' : 'closed'}
      variants={{ closed: { opacity: 0 }, opened: { opacity: 1 } }}
      transition={{ type: 'keyframes', duration: 0.1 }}
      className={clsx(
        'fixed top-0 right-0 z-50 flex h-screen w-screen bg-gray-800/80 backdrop-blur-sm transition-all dark:bg-gray-500/20',
        isOpen ? 'block' : 'hidden'
      )}
    >
      <div className='flex-1' onClick={onClose}></div>
      <motion.div
        initial='closed'
        animate={opened ? 'opened' : 'closed'}
        variants={variants}
        transition={{ type: 'keyframes' }}
      >
        <div
          className={clsx(
            'm-0 flex h-screen flex-col bg-white py-4 shadow-2xl shadow-white/80 transition-all delay-100 dark:border-gray-600 dark:bg-paper-dark dark:shadow-black/80',
            className
          )}
        >
          <div className='flex w-full items-center gap-4 border-b px-4 pb-4'>
            <div className='flex w-full items-center gap-2'>
              <IconButton onClick={onClose}>
                <Icon icon='ic:round-close' height={22} />
              </IconButton>
              <h6 className='flex-1 text-xl font-semibold'>{title}</h6>
              {actions}
            </div>
          </div>
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Sheet
