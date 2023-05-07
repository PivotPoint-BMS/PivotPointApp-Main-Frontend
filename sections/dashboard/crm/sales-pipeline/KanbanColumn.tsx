/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx'
import type { DraggableSyntheticListeners } from '@dnd-kit/core'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import { Button, Card, CardContent, CardHeader, IconButton } from 'components'
import { Icon as Iconify } from '@iconify/react'

interface KanbanColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string
  isOverContainer?: boolean
  listeners?: DraggableSyntheticListeners
  handleProps?: any
}

export default function KanbanColumn({
  name,
  isOverContainer,
  children,
  listeners,
  handleProps,
}: KanbanColumnProps) {
  const { t } = useTranslate()
  return (
    <Card className={clsx('min-w-[250px]', isOverContainer && 'bg-gray-100')}>
      <CardHeader
        title={name || ''}
        actions={
          <IconButton
            {...listeners}
            tabIndex={0}
            {...handleProps}
            className='cursor-grab fill-gray-500'
          >
            <svg viewBox='0 0 20 20' width='12'>
              <path d='M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z'></path>
            </svg>
          </IconButton>
        }
      />
      <CardContent className='flex flex-col gap-2'>
        {children}
        <Button
          className='mt-4 w-full'
          variant='text'
          size='large'
          startIcon={<Iconify icon='ic:round-plus' height={24} />}
        >
          {t('Add Deal')}
        </Button>
      </CardContent>
    </Card>
  )
}
