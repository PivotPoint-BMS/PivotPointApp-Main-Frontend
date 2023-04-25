import { useState } from 'react'
import moment from 'moment'
import { clsx } from 'clsx'
// radix
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import { Icon as Iconify } from '@iconify/react'
import Card from '@/components/Card'
import IconButton from '@/components/IconButton'

export default function NoteCard() {
  const { t } = useTranslate()
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Card variant='elevated' fullWidth className='!h-full border dark:border-gray-500'>
      <CollapsiblePrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
        <div className='flex select-none items-center gap-2 rounded-md px-4 py-2 text-left text-sm font-medium'>
          <CollapsiblePrimitive.Trigger
            className={clsx(
              'group flex select-none items-center rounded-full text-left text-sm font-medium',
              'focus:outline-none focus-visible:ring focus-visible:ring-gray-900 focus-visible:ring-opacity-75'
            )}
          >
            <IconButton>
              <Iconify
                icon='material-symbols:chevron-right-rounded'
                height={24}
                className='transform text-gray-500 duration-300 ease-in-out group-data-[state=open]:rotate-90'
              />
            </IconButton>
          </CollapsiblePrimitive.Trigger>
          <div className='flex flex-1 items-center gap-3'>
            <Iconify
              icon='fluent:clipboard-task-list-ltr-20-filled'
              height={24}
              className='rounded-full bg-secondary-100/40 p-1 text-secondary-900'
            />{' '}
            <p>My Playlists</p>
          </div>{' '}
          <p className='text-gray-500'>{t('Due:')} </p>
          <Iconify icon='material-symbols:calendar-today' height={20} className='text-gray-600' />
          <p>{moment('2023-04-23').format('LLL')}</p>
          <IconButton className='border'>
            <Iconify icon='material-symbols:more-horiz' height={20} />
          </IconButton>
        </div>
        <CollapsiblePrimitive.Content className='mt-4 flex flex-col space-y-4 px-4 pb-4'>
          {' '}
          <p className='text-gray-500'>{t('Due:')} </p>
        </CollapsiblePrimitive.Content>
      </CollapsiblePrimitive.Root>
    </Card>
  )
}
