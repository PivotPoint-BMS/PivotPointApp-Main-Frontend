/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react'
import clsx from 'clsx'
// dnd-kit
import type { DraggableSyntheticListeners } from '@dnd-kit/core'
import { CSS, Transform } from '@dnd-kit/utilities'
// type
import { Deal } from 'types'
// hooks
import useTranslate from 'hooks/useTranslate'
// redux
import { useAppDispatch } from 'store/hooks'
import { previewDeal } from 'store/slices/dealPreviewSlice'
// components
import { Card, CardContent, IconButton } from 'components'

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
  transition?: string | null
  deal: Deal
  onRemove?(): void
}

export const Item = React.memo(
  React.forwardRef<HTMLDivElement, Props>(
    (
      {
        dragOverlay,
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
      const { t } = useTranslate()
      const dispatch = useAppDispatch()
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
          onClick={(e) => {
            e.stopPropagation()
            dispatch(previewDeal(deal.id.toString() || ''))
          }}
        >
          <Card
            fullWidth
            className={clsx(
              'h-full select-none transition-shadow hover:shadow-lg dark:shadow-black/25',
              dragOverlay && 'scale-105 shadow-lg transition-all',
              dragging && !dragOverlay && 'opacity-40'
            )}
          >
            <CardContent className='flex items-center justify-between'>
              <div className='flex flex-col items-start gap-2'>
                <p className='text-lg font-semibold'>{deal.title}</p>
                <p className='text-sm font-semibold'>
                  <span className='text-gray-600 dark:text-gray-400'>
                    {t('Potential Deal Value')} :{' '}
                  </span>
                  {deal.potentialDealValue}
                </p>
                <p className='text-sm font-semibold'>
                  <span className='text-gray-600 dark:text-gray-400'>
                    {t('Success Probability')} :{' '}
                  </span>
                  {deal.successProbability}%
                </p>
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
