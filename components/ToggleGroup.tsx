import React from "react"
import { clsx } from "clsx"
// radix
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { Icon as Iconify } from "@iconify/react"

interface ToggleItem {
  value: string
  label: string
  icon: string
}

interface ToggleGroupProps extends ToggleGroupPrimitive.ToggleGroupSingleProps {
  settings: ToggleItem[]
}

export default function ToggleGroup({ settings, ...props }: ToggleGroupProps) {
  return (
    <ToggleGroupPrimitive.Root {...props}>
      {settings.map(({ value, label, icon }, i) => (
        <ToggleGroupPrimitive.Item
          key={`group-item-${i}-${label}`}
          value={value}
          aria-label={label}
          className={clsx(
            "group data-[state=off]:bg-gray-100 dark:data-[state=off]:bg-transparent dark:data-[state=on]:bg-gray-600",
            "border-y px-2.5 py-2 first:rounded-l-md first:border-x last:rounded-r-md last:border-x",
            "border-gray-200 data-[state=on]:shadow-md dark:border-gray-600",
            "focus:relative focus:outline-none focus-visible:z-20 focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-opacity-75"
          )}
        >
          <Iconify icon={icon} className='h-5 w-5 text-gray-700 dark:text-gray-100' />
        </ToggleGroupPrimitive.Item>
      ))}
    </ToggleGroupPrimitive.Root>
  )
}
