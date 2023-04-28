import { useEffect, useState } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
// motion
import { Variants, motion } from 'framer-motion'
// hooks
import useSnackbar from 'hooks/useSnackbar'
// types
import { SnackbarOptions } from 'types'
// components
import Alert from './Alert'

export const snackbarClass = cva(['fixed z-[99999] w-fit h-fit drop-shadow-lg'], {
  variants: {
    side: {
      top: ['top-10 left-1/2'],
      bottom: ['bottom-10 left-1/2'],
      right: ['top-1/2 right-10'],
      left: ['top-1/2 left-10'],
      'top-left': ['top-10 left-10'],
      'top-right': ['top-10 right-10'],
      'bottom-left': ['bottom-10 left-10'],
      'bottom-right': ['bottom-10 right-10'],
    },
  },
  defaultVariants: { side: 'bottom-left' },
})

export interface SnackbarProps
  extends SnackbarOptions,
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof snackbarClass> {
  side?:
    | 'top'
    | 'bottom'
    | 'right'
    | 'left'
    | 'top-left'
    | 'bottom-left'
    | 'top-right'
    | 'bottom-right'
  isOpen: boolean
}

export default function Snackbar({
  message,
  autoHideDuration = 4000,
  isOpen,
  side = 'bottom-left',
  type,
  variant,
}: SnackbarProps) {
  const [opened, setOpened] = useState(false)

  const variants: { [key: string]: Variants } = {
    top: {
      closed: { y: '-200%' },
      opened: { y: 0, x: '-50%' },
    },
    bottom: {
      closed: { y: '200%' },
      opened: { y: 0, x: '-50%' },
    },
    right: {
      closed: { x: '200%' },
      opened: { x: 0, y: '-50%' },
    },
    left: {
      closed: { x: '-200%' },
      opened: { x: 0, y: '-50%' },
    },
    'bottom-right': {
      closed: { x: '200%' },
      opened: { x: 0 },
    },
    'bottom-left': {
      closed: { x: '-200%' },
      opened: { x: 0 },
    },
    'top-right': {
      closed: { x: '200%' },
      opened: { x: 0 },
    },
    'top-left': {
      closed: { x: '-200%' },
      opened: { x: 0 },
    },
  }

  const { close } = useSnackbar()

  useEffect(() => {
    setOpened(isOpen)
  }, [isOpen])

  const handleClose = () => {
    setOpened(false)
    setTimeout(() => {
      close()
    }, 600)
  }

  useEffect(() => {
    if (opened) {
      setTimeout(() => {
        handleClose()
      }, autoHideDuration)
    }
  }, [opened])

  return (
    <motion.div
      initial='closed'
      animate={opened ? 'opened' : 'closed'}
      variants={variants[side]}
      className={snackbarClass({ side })}
      transition={{ duration: 0.5 }}
    >
      <Alert variant={variant} intent={type}>
        <span className='text-[0.9rem]'>{message}</span>
      </Alert>
    </motion.div>
  )
}
