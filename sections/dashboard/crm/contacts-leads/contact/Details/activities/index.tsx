// hooks
import useTranslate from 'hooks/useTranslate'
// components
import CardContent from 'components/CardContent'
import ActivityCard from './ActivityCard'

export default function Activities() {
  const { t } = useTranslate()
  return (
    <CardContent className='h-full'>
      <h1 className='mb-4 text-lg font-medium'>{t('Upcoming Activities')}</h1>

      <ActivityCard />
    </CardContent>
  )
}
