import React from "react"
import clsx from "clsx"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cva, VariantProps } from "class-variance-authority"

export const switchClass = cva(
  [
    "group",
    "data-[state=unchecked]:bg-gray-400 dark:data-[state=unchecked]:bg-gray-500",
    "relative inline-flex h-[24px] w-[44px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out",
    "focus:outline-none focus-visible:ring focus-visible:ring-gray-900  dark:focus-visible:ring-white focus-visible:ring-opacity-75",
  ],
  {
    variants: {
      intent: {
        primary: [
          "data-[state=checked]:bg-primary-500 hover:bg-primary-700 active:bg-primary-600",
          "dark:data-[state=checked]:bg-primary-400 dark:hover:bg-primary-700/70 dark:active:bg-primary-600",
        ],
        secondary: [
          "data-[state=checked]:bg-secondary-500 hover:bg-secondary-700 active:bg-secondary-600",
          "dark:bg-secondary-700 dark:hover:bg-secondary-700/70 dark:active:bg-secondary-600",
        ],
      },
      size: {
        small: "h-[20px] w-[36px]",
        medium: "h-[22px] w-[38px]",
        large: "h-[24px] w-[44px]",
      },
      disabled: {
        true: [
          "cursor-not-allowed",
          "bg-gray-400 hover:bg-gray-400 active:bg-gray-400",
          "dark:bg-gray-600 dark:hover:bg-gray-600 dark:active:bg-gray-600",
        ],
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "medium",
      disabled: true,
    },
  }
)

export interface SwitchProps
  extends SwitchPrimitive.SwitchProps,
    React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof switchClass> {
  disabled?: boolean
}

export default function Switch({
  intent,
  disabled = false,
  size = "medium",
  className,
  ...other
}: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      className={switchClass({ intent, disabled, size, class: className })}
      disabled={disabled}
      {...other}
    >
      <SwitchPrimitive.Thumb
        className={clsx(
          size === "small" &&
            "ltr:group-data-[state=checked]:translate-x-4 rtl:group-data-[state=checked]:-translate-x-4",
          size === "medium" &&
            "ltr:group-data-[state=checked]:translate-x-4 rtl:group-data-[state=checked]:-translate-x-4",
          size === "large" &&
            "ltr:group-data-[state=checked]:translate-x-5 rtl:group-data-[state=checked]:-translate-x-5",
          "group-data-[state=unchecked]:translate-x-0",
          "pointer-events-none inline-block aspect-square  h-full transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
        )}
      />
    </SwitchPrimitive.Root>
  )
}
