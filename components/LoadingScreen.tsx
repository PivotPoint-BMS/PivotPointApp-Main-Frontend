import { motion } from 'framer-motion'
//
import Logo from './Logo'

export default function LoadingScreen() {
  return (
    <div className='fixed top-0 right-0 z-[999] flex h-screen w-screen items-center justify-center bg-white dark:bg-dark'>
      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: 360 }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeatDelay: 1,
          repeat: Infinity,
        }}
      >
        <Logo height={64} width={64} />
      </motion.div>

      <motion.div
        animate={{
          scale: [1.2, 1, 1, 1.2, 1.2],
          rotate: [270, 0, 0, 270, 270],
          opacity: [0.25, 1, 1, 1, 0.25],
          borderRadius: ['25%', '25%', '50%', '50%', '25%'],
        }}
        transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
        className='absolute h-28 w-28 rounded-xl border-4 border-primary-400/80 dark:border-primary-100/50'
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1.2, 1, 1],
          rotate: [0, 270, 270, 0, 0],
          opacity: [1, 0.25, 0.25, 0.25, 1],
          borderRadius: ['25%', '25%', '50%', '50%', '25%'],
        }}
        transition={{
          ease: 'linear',
          duration: 3.2,
          repeat: Infinity,
        }}
        className='absolute h-32 w-32 rounded-xl border-8 border-primary-400/80 dark:border-primary-100/50'
      />
    </div>
  )
}
