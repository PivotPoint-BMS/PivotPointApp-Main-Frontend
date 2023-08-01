// hooks
import useTranslate from 'hooks/useTranslate'
// redux
import { useAppSelector } from 'store/hooks'
// apis
import { useGetLeadActivitiesQuery } from 'store/api/crm/contact-leads/leadApis'
// components
import { CardContent, LoadingIndicator } from 'components'
import ActivityCard from './ActivityCard'

export default function Activities({ leadId }: { leadId: string }) {
  const { t } = useTranslate()
  const { PageNumber, PageSize } = useAppSelector((state) => state.pagination)
  const { data, isLoading, isSuccess } = useGetLeadActivitiesQuery({
    id: leadId,
    PageNumber,
    PageSize,
  })

  if (isLoading)
    return (
      <CardContent className='h-full'>
        <h1 className='mb-4 text-lg font-medium'>{t('Upcoming Activities')}</h1>
        <div className='flex h-56 w-full items-center justify-center'>
          <LoadingIndicator />
        </div>
      </CardContent>
    )

  if (isSuccess && data.data.length > 0)
    return (
      <CardContent>
        <div className='space-y-2'>
          {data.data.map((activity) => (
            <ActivityCard activity={activity} />
          ))}
        </div>
      </CardContent>
    )

  return (
    <CardContent className='h-full'>
      <div className='flex h-56 w-full items-center justify-center'>
        <h6>{t('No Activities')}</h6>
      </div>
    </CardContent>
  )
}
