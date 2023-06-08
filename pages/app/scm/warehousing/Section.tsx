import React from 'react'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import clsx from 'clsx'
import Button from 'components/Button'
import { Icon } from '@iconify/react'
import Progressbar from 'components/Progressbar'
import useTranslate from 'hooks/useTranslate'

function Section() {
  const { t } = useTranslate()
  return (
    <div className='group relative h-full w-full cursor-pointer rounded-md bg-gray-300 ring-secondary-400 transition-all '>
      <HoverCardPrimitive.Root>
        <HoverCardPrimitive.Trigger asChild>
          <h1 className='absolute top-1/2 -left-2 -translate-y-1/2 rounded-md bg-white p-2 font-semibold text-gray-600 shadow-xl group-hover:bg-secondary-400 group-hover:text-white'>
            A1
          </h1>
        </HoverCardPrimitive.Trigger>
        <HoverCardPrimitive.Content
          align='start'
          side='right'
          className={clsx(
            ' data[side=top]:animate-slide-up data[side:bo=tom]:animate-slide-down',
            'max-w-sm rounded-md p-4 md:w-full',
            'bg-white dark:bg-gray-800',
            'focus-visible:ring-secondary-500-500 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75',
            'shadow-xl'
          )}
        >
          <HoverCardPrimitive.Arrow className='fill-current text-white dark:text-gray-800' />

          <div className='flex h-full w-full flex-col space-y-4'>
            <p className='text-lg font-semibold'>Section A1</p>
            <p>
              <span className='text-sm text-gray-600'>Capacity :</span> 400
            </p>
            <Progressbar progress={16} intent='secondary' />
            <Button startIcon={<Icon icon='mdi:eye' />} variant='outlined' intent='secondary'>
              {t('View Details')}
            </Button>
          </div>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Root>
      <div className='h-full w-1/6 rounded-md bg-gray-600'></div>
    </div>
  )
}

export default Section
