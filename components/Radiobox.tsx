import React, { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react"
// components
import { Icon as Iconify } from "@iconify/react"
import clsx from "clsx"

const Checkbox = forwardRef<
  HTMLInputElement,
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & { label?: string }
>(({ label, className, ...props }, ref) => (
  <div className='flex items-center gap-2'>
    <label className='radio-container'>
      <input
        {...props}
        ref={ref}
        type='radio'
        className='absolute h-0 w-0 cursor-pointer opacity-0'
      />
      <span className={clsx("radio-checkmark", className)}>
        <Iconify icon='fluent-mdl2:radio-bullet' className='radio-checked h-5 w-5 self-center' />
      </span>
    </label>
    {label && <label>{label}</label>}
  </div>
))

export default Checkbox
