/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react'
import type { DraggableSyntheticListeners } from '@dnd-kit/core'
import { CSS, Transform } from '@dnd-kit/utilities'
import { Deal } from 'types'
import Card from 'components/Card'
import CardContent from 'components/CardContent'
import clsx from 'clsx'
import Checkbox from 'components/Checkbox'
import IconButton from 'components/IconButton'

export interface Props {
  dragOverlay?: boolean
  color?: string
  disabled?: boolean
  dragging?: boolean
  handleProps?: any
  height?: number
  index?: number
  fadeIn?: boolean
  transform?: Transform | null
  listeners?: DraggableSyntheticListeners
  sorting?: boolean
  transition?: string | null
  deal: Deal
  onRemove?(): void
}

export const Item = React.memo(
  React.forwardRef<HTMLDivElement, Props>(
    (
      {
        dragOverlay,
        onRemove,
        deal,
        listeners,
        disabled,
        dragging,
        fadeIn,
        transform,
        transition,
        handleProps,
        ...props
      },
      ref
    ) => {
      useEffect(() => {
        if (!dragOverlay) {
          return
        }

        document.body.style.cursor = 'grabbing'

        // eslint-disable-next-line consistent-return
        return () => {
          document.body.style.cursor = ''
        }
      }, [dragOverlay])

      return (
        <div
          ref={ref}
          data-cypress='draggable-item'
          {...props}
          style={{
            height: '100%',
            transition: transition || '',
            transform: CSS.Transform.toString(transform || null),
          }}
          className={clsx(fadeIn && 'animate-fade-in duration-500', disabled && 'opacity-30')}
        >
          <Card
            fullWidth
            className={clsx(
              'h-full',
              dragOverlay && 'scale-105 shadow-lg transition-all',

              dragging && !dragOverlay && 'opacity-40'
            )}
          >
            <CardContent className='flex items-center justify-between'>
              <div className='flex h-fit items-center justify-start gap-2 p-1'>
                <Checkbox className='!rounded-full' />
                <p>{deal.title}</p>
              </div>
              <IconButton
                {...listeners}
                tabIndex={0}
                {...handleProps}
                className='cursor-grab fill-gray-600 dark:fill-gray-300'
              >
                <svg viewBox='0 0 20 20' width='12'>
                  <path d='M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z'></path>
                </svg>
              </IconButton>
            </CardContent>
          </Card>
        </div>
      )
    }
  )
)
