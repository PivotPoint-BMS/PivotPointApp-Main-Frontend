import React from "react"
import { HTMLMotionProps, motion } from "framer-motion"
//
import { varContainer } from "./variants"

// ----------------------------------------------------------------------

interface MotionContainerProps extends HTMLMotionProps<"div"> {
  action?: boolean
}

export default function MotionContainer({
  animate,
  action = false,
  children,
  ...other
}: MotionContainerProps) {
  if (action) {
    return (
      <motion.div
        initial={false}
        animate={animate ? "animate" : "exit"}
        variants={varContainer()}
        {...other}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial='initial'
      whileInView='animate'
      viewport={{ once: true, amount: 0.3 }}
      variants={varContainer({ staggerIn: 0.2 })}
      {...other}
    >
      {children}
    </motion.div>
  )
}
