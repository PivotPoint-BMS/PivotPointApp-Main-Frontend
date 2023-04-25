import React from 'react'
// motion
import { HTMLMotionProps, Transition, Variants, motion } from 'framer-motion'
import clsx from 'clsx'

type LoadingIndicatorProps = HTMLMotionProps<'div'> & {
  dotsClassName?: string
}

const ContainerVariants: Variants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const DotVariants: Variants = {
  initial: {
    y: '0%',
  },
  animate: {
    y: ['0%', '100%', '0%'],
  },
}

const DotTransition: Transition = {
  duration: 0.8,
  repeat: Infinity,
  ease: 'easeInOut',
  type: 'keyframes',
}

export default function LoadingIndicator({ className, dotsClassName }: LoadingIndicatorProps) {
  return (
    <div>
      <motion.div
        className={clsx('flex h-14 w-28 items-center justify-around', className)}
        variants={ContainerVariants}
        initial='initial'
        animate='animate'
      >
        <motion.span
          className={clsx('h-6 w-6 rounded-full bg-primary-500', dotsClassName)}
          variants={DotVariants}
          transition={DotTransition}
        />
        <motion.span
          className={clsx('h-6 w-6 rounded-full bg-primary-500', dotsClassName)}
          variants={DotVariants}
          transition={DotTransition}
        />
        <motion.span
          className={clsx('h-6 w-6 rounded-full bg-primary-500', dotsClassName)}
          variants={DotVariants}
          transition={DotTransition}
        />
      </motion.div>
    </div>
  )
}
