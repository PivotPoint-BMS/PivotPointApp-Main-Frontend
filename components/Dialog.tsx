import { HTMLAttributes } from "react"
import clsx from "clsx"
// motion
import { motion } from "framer-motion"
// Components
import { Icon } from "@iconify/react"
import IconButton from "./IconButton"
import Backdrop from "./Backdrop"

interface DialogProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  open: boolean
  title?: string
  description?: string
  handleClose?: () => void
  fullScreen?: boolean
}

export default function Dialog({
  open,
  description,
  title,
  children,
  className,
  handleClose,
  fullScreen,
}: DialogProps) {
  if (open)
    return (
      <Backdrop open={open} onClick={handleClose}>
        <motion.div
          initial={{ opacity: 0 }}
          variants={{ open: { opacity: 1 }, close: { opacity: 0 } }}
          animate={open ? "open" : "close"}
          transition={{ duration: 0.3 }}
          className={clsx(
            "fixed z-[10000] p-4",
            "bg-white shadow-2xl shadow-white/40 dark:bg-paper-dark dark:shadow-black/40",
            "focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75",
            fullScreen
              ? "top-0 left-0 h-full w-full"
              : "top-[50%] left-[50%] max-h-screen w-[95vw]  max-w-lg -translate-x-[50%] -translate-y-[50%] overflow-y-scroll rounded md:w-full",
            className
          )}
        >
          <div className='mb-2 flex items-start justify-between py-2 px-4'>
            <div className='space-y-2'>
              {title && (
                <h1 className='text-lg font-medium text-gray-900 dark:text-gray-100'>{title}</h1>
              )}
              {description && (
                <p className='mt-2 mb-4 text-sm font-normal text-gray-700 dark:text-gray-400'>
                  {description}
                </p>
              )}
            </div>
            {handleClose && (
              <IconButton onClick={handleClose}>
                <Icon icon='ic:round-close' height={20} />
              </IconButton>
            )}
          </div>
          {children}
        </motion.div>
      </Backdrop>
    )
  return null
}
