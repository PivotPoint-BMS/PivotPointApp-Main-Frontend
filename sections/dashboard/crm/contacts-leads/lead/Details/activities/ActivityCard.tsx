import moment from 'moment'
// types
import { Activity } from 'types'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import { Icon as Iconify } from '@iconify/react'
import Card from 'components/Card'

export default function ActivityCard({ activity }: { activity: Activity }) {
  const { t } = useTranslate()

  return (
    <Card variant='elevated' fullWidth className='!h-full border dark:border-gray-500'>
      <div className='flex select-none items-center gap-2 rounded-md px-4 py-2 text-left text-sm font-medium'>
        <div className='flex flex-1 flex-col  gap-3'>
          <p className='text-lg font-medium'>{activity.description}</p>
          <p>
            <span className='text-gray-600 dark:text-gray-400'>{t('By:')} </span>{' '}
            {activity.createdBy}
          </p>
        </div>{' '}
        <Iconify icon='material-symbols:calendar-today' height={20} className='text-gray-600' />
        <p className='text-gray-600 dark:text-gray-400'>{moment(activity.created).format('LLL')}</p>
        {/* <IconButton className='border'>
            <Iconify icon='material-symbols:more-horiz' height={20} />
          </IconButton> */}
      </div>
    </Card>
  )
}
