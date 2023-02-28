import { m } from 'framer-motion'
import { forwardRef } from 'react'
import IconButton, { IconButtonProps } from '../IconButton'

interface AnimateWrapProps {
  children: React.ReactNode
  size?: 'small' | 'medium' | 'large'
}

const varSmall = {
  hover: { scale: 1.1 },
  tap: { scale: 0.95 },
}

const varMedium = {
  hover: { scale: 1.09 },
  tap: { scale: 0.97 },
}

const varLarge = {
  hover: { scale: 1.08 },
  tap: { scale: 0.99 },
}

function AnimateWrap({ size, children }: AnimateWrapProps) {
  const isSmall = size === 'small'
  const isLarge = size === 'large'

  return (
    <m.div
      whileTap='tap'
      whileHover='hover'
      variants={(isSmall && varSmall) || (isLarge && varLarge) || varMedium}
      className='inline-flex'
    >
      {children}
    </m.div>
  )
}

interface IconButtonAnimateProps extends IconButtonProps {
  children: React.ReactNode
  color?: 'inherit' | 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'
  size?: 'small' | 'medium' | 'large'
}

const IconButtonAnimate = forwardRef<HTMLButtonElement, IconButtonAnimateProps>(
  ({ children, size = 'medium', ...other }: IconButtonAnimateProps, ref) => (
    <AnimateWrap size={size}>
      <IconButton size={size} ref={ref} {...other}>
        {children}
      </IconButton>
    </AnimateWrap>
  )
)

export default IconButtonAnimate

// ----------------------------------------------------------------------
