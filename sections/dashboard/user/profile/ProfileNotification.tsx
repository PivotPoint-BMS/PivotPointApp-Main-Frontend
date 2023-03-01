import React from 'react'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import Card from '@/components/Card'
import CardContent from '@/components/CardContent'
import Checkbox from '@/components/Checkbox'

export default function ProfileNotification() {
  const { t } = useTranslate()
  return (
    <Card className='!w-full'>
      <CardContent className='flex flex-col gap-5'>
        <h1 className='font-medium text-gray-600 dark:text-gray-400'>{t('Activity')}</h1>
        <div className='inline-flex items-center gap-5'>
          <Checkbox />
          <label className=''>
            {t('Email me when')} {t('password change')}
          </label>
        </div>
        <h1 className='mt-5 font-medium text-gray-600 dark:text-gray-400'>{t('Application')}</h1>
        <div className='inline-flex items-center gap-5'>
          <Checkbox />
          <label className=''>{t('Weekly reports')}</label>
        </div>
        <div className='inline-flex items-center gap-5'>
          <Checkbox />
          <label className=''>{t('Subscription renewal')}</label>
        </div>
        <div className='inline-flex items-center gap-5'>
          <Checkbox />
          <label className=''>{t('Successful renewal')}</label>
        </div>
      </CardContent>
    </Card>
  )
}
