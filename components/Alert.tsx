import React from "react"
import { cva, VariantProps } from "class-variance-authority"
import { Icon as Iconify } from "@iconify/react"

export const alertContained = cva("flex w-full items-start rounded px-4 py-3 gap-3", {
  variants: {
    intent: {
      success: "bg-green-600 !text-white dark:!text-black/90 dark:bg-green-300",
      info: "bg-blue-600 !text-white dark:!text-black/90 dark:bg-blue-300",
      warning:
        "bg-orange-600 !text-white dark:!text-black/90 dark:!text-orange-900 dark:bg-orange-300",
      error: "bg-red-600 !text-white dark:!text-black/90 dark:bg-red-300",
    },
  },
  defaultVariants: {
    intent: "info",
  },
})

export const alertGhost = cva("flex w-full items-start rounded px-4 py-3 gap-3", {
  variants: {
    intent: {
      success: "bg-green-200/60 !text-green-800 dark:!text-green-100 dark:bg-green-700/30",
      info: "bg-blue-200/60 !text-blue-800 dark:!text-blue-100 dark:bg-blue-700/30",
      warning: "bg-orange-200/60 !text-orange-900 dark:!text-orange-100 dark:bg-orange-500/20",
      error: "bg-red-200/60 !text-red-900 dark:!text-red-100 dark:bg-red-500/20",
    },
  },
  defaultVariants: {
    intent: "info",
  },
})

export const alertOutlined = cva("flex w-full items-start rounded px-4 py-3 gap-3", {
  variants: {
    intent: {
      success: "border-2 border-green-400 !text-green-600 dark:!text-green-100",
      info: "border-2 border-blue-400 !text-blue-600 dark:!text-blue-100",
      warning: "border-2 border-orange-400 !text-orange-600 dark:!text-orange-100",
      error: "border-2 border-red-400 !text-red-600 dark:!text-red-100",
    },
  },
  defaultVariants: {
    intent: "info",
  },
})

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertContained & typeof alertOutlined> {
  variant?: "contained" | "outlined" | "ghost"
}

export default function Alert({
  variant = "contained",
  intent,
  className,
  children,
  ...props
}: AlertProps) {
  const getIcon = () => {
    if (intent === "error") return "material-symbols:error-circle-rounded"
    if (intent === "warning") return "material-symbols:warning-rounded"
    if (intent === "success") return "material-symbols:check-circle-rounded"
    return "material-symbols:info-rounded"
  }

  if (variant === "ghost")
    return (
      <div {...props} className={alertGhost({ intent, class: className })}>
        <div className='flex h-full'>
          <Iconify icon={getIcon()} height={20} width={20} />
        </div>
        {children}
      </div>
    )

  if (variant === "outlined")
    return (
      <div {...props} className={alertOutlined({ intent, class: className })}>
        <div className='flex h-full'>
          <Iconify icon={getIcon()} height={20} width={20} />
        </div>
        {children}
      </div>
    )

  return (
    <div {...props} className={alertContained({ intent, class: className })}>
      <div className='flex h-full'>
        <Iconify icon={getIcon()} height={20} width={20} />
      </div>
      {children}
    </div>
  )
}
