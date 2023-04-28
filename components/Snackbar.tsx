import { useEffect, useState } from 'react'
// motion
import { Variants, motion } from 'framer-motion'
// hooks
import useSnackbar from 'hooks/useSnackbar'
// types
import { SnackbarOptions } from 'types'
// components
import Alert from './Alert'

export interface SnackbarProps extends SnackbarOptions, React.HTMLAttributes<HTMLDivElement> {
  id: string
}

export default function Snackbar({
  id,
  message,
  autoHideDuration = 4000,
  type,
  variant,
}: SnackbarProps) {
  const { close } = useSnackbar()
  const [opened, setOpened] = useState(true)

  const variants: Variants = {
    closed: { x: '-200%' },
    opened: { x: 0 },
  }

  useEffect(() => {
    if (opened) {
      setTimeout(() => {
        setOpened(false)
      }, autoHideDuration)
      setTimeout(() => {
        close(id)
      }, autoHideDuration + 600)
    }
  }, [opened])

  return (
    <motion.div
      initial='closed'
      animate={opened ? 'opened' : 'closed'}
      variants={variants}
      transition={{ duration: 0.5 }}
    >
      <Alert variant={variant} intent={type}>
        <span className='text-[0.9rem]'>{message}</span>
      </Alert>
    </motion.div>
  )
}
