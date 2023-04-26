import React from 'react'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import { Icon as Iconify } from '@iconify/react'
import Card from 'components/Card'
import CardContent from 'components/CardContent'
import Progressbar from 'components/Progressbar'
import Checkbox from 'components/Switch'
import Button from 'components/Button'

export default function SettingsStorage() {
  const { t } = useTranslate()
  return (
    <Card className='!w-full'>
      <CardContent className='flex flex-col gap-5'>
        <div className='inline-flex items-center gap-5'>
          <Checkbox />
          <label>{t('Activate')}</label>
        </div>
        <div className='flex flex-col gap-1'>
          <div className='flex items-center justify-between'>
            <label className='text-sm font-medium dark:text-white'>{t('Storage Usage')}</label>
            <p className='text-sm font-medium dark:text-white'>(80%)</p>
          </div>
          <Progressbar progress={80} />
          <div className='flex items-center justify-between'>
            <p className='text-sm font-medium dark:text-white'>0 {t('GB')}</p>
            <p className='text-sm font-medium dark:text-white'>20 {t('GB')}</p>
          </div>
        </div>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
          <Button variant='outlined' startIcon={<Iconify icon='ion:plus' />}>
            {t('Add Storage')}
          </Button>
          <Button variant='outlined' startIcon={<Iconify icon='tabler:external-link' />}>
            {t('Access Settings')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
