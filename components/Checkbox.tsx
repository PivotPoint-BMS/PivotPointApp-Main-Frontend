import React, { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react"
// components
import { Icon as Iconify } from "@iconify/react"
import clsx from "clsx"

const Checkbox = forwardRef<
  HTMLInputElement,
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & { label?: string }
>(({ className, label, ...props }, ref) => (
  <div className='flex items-center gap-2'>
    <label className='checkbox-container group'>
      <input
        {...props}
        ref={ref}
        type='checkbox'
        className='absolute h-0 w-0 cursor-pointer opacity-0'
      />
      <span
        className={clsx(
          "checkbox-checkmark ring-primary-400 ring-offset-1 group-focus-within:ring-2 dark:ring-primary-500",
          className
        )}
      >
        <Iconify
          icon='material-symbols:check-small-rounded'
          className='checkbox-checked h-5 w-5 self-center'
        />
        <Iconify
          icon='material-symbols:check-indeterminate-small-rounded'
          className='checkbox-indeterminate h-5 w-5 self-center'
        />
      </span>
    </label>
    {label && <label>{label}</label>}
  </div>
))

export default Checkbox
