import { Icon } from '@iconify/react'
import { HTMLProps, useEffect, useRef } from 'react'

export default function IndeterminateCheckbox({
  indeterminate,
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof indeterminate === 'boolean' && ref.current) {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate])

  return (
    <label className='checkbox-container'>
      <input
        {...rest}
        ref={ref}
        type='checkbox'
        className='absolute h-0 w-0 cursor-pointer opacity-0'
      />
      <span className='checkbox-checkmark'>
        <Icon
          icon='material-symbols:check-small-rounded'
          className='checkbox-checked h-5 w-5 self-center'
        />
        <Icon
          icon='material-symbols:check-indeterminate-small-rounded'
          className='checkbox-indeterminate h-5 w-5 self-center'
        />
      </span>
    </label>
  )
}
