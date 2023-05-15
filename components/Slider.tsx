import * as SliderPrimitive from '@radix-ui/react-slider'
import { clsx } from 'clsx'
import React from 'react'

type SliderProps = SliderPrimitive.SliderProps

const Slider = ({ className, ...props }: SliderProps) => (
  <SliderPrimitive.Root
    className={clsx('relative flex h-5 w-full touch-none items-center', className)}
    {...props}
  >
    <SliderPrimitive.Track className='relative h-1 w-full grow rounded-full  bg-gray-300 dark:bg-gray-500'>
      <SliderPrimitive.Range className='absolute h-full  rounded-full bg-primary-600 dark:bg-primary-400' />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={clsx(
        'block h-5 w-5 rounded-full bg-primary-600 dark:bg-primary-400',
        'focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75'
      )}
    />
  </SliderPrimitive.Root>
)

export default Slider
