import React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva, VariantProps } from "class-variance-authority"
import clsx from "clsx"

const progressbar = cva("duration-300 ease-in-out rounded-full", {
  variants: {
    intent: {
      primary: ["bg-primary-500", "dark:bg-primary-400"],
      secondary: ["bg-secondary-500", "dark:bg-secondary-300"],
    },
    size: {
      small: "h-2",
      medium: "h-3",
      large: "h-4",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
})

export interface ProgressbarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressbar> {
  progress?: number
  rootClassName?: string
}

export default function Progressbar({
  progress,
  intent,
  className,
  rootClassName,
}: ProgressbarProps) {
  return (
    <ProgressPrimitive.Root
      value={progress}
      className={clsx(
        rootClassName,
        "h-fit w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600"
      )}
    >
      <ProgressPrimitive.Indicator
        style={{ width: `${progress}%` }}
        className={progressbar({ intent, class: className })}
      />
    </ProgressPrimitive.Root>
  )
}
