// hooks
import useTranslate from 'hooks/useTranslate'
// assets
import slackLogo from 'public/slack.png'
import trelloLogo from 'public/trello.png'
import shopifyLogo from 'public/shopify.png'
// components
import { Icon as Iconify } from '@iconify/react'
import Card from '@/components/Card'
import CardContent from '@/components/CardContent'
import Image from '@/components/Image'
import Button from '@/components/Button'

export default function SettingsIntegration() {
  const { t } = useTranslate()
  return (
    <div className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3'>
      <Card>
        <CardContent className='flex h-full flex-col gap-2'>
          <Image src={slackLogo.src} height={32} width={32} />
          <h1 className='text-xl font-medium'>{t('Slack')}</h1>
          <p className='flex-1 text-sm text-gray-600 dark:text-gray-400'>
            {t('Slack description')}
          </p>
          <Button variant='outlined' startIcon={<Iconify icon='fluent:plug-connected-20-filled' />}>
            {t('Connect')}
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardContent className='flex h-full flex-col gap-2'>
          <Image src={trelloLogo.src} height={32} width={32} />
          <h1 className='text-xl font-medium'>{t('Trello')}</h1>
          <p className='flex-1 text-sm text-gray-600 dark:text-gray-400'>
            {t('Trello description')}
          </p>
          <Button variant='outlined' startIcon={<Iconify icon='fluent:plug-connected-20-filled' />}>
            {t('Connect')}
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardContent className='flex h-full flex-col gap-2'>
          <Image src={shopifyLogo.src} height={32} width={32} />
          <h1 className='text-xl font-medium'>{t('Shopify')}</h1>
          <p className='flex-1 text-sm text-gray-600 dark:text-gray-400'>
            {t('Shopify description')}
          </p>
          <Button variant='outlined' startIcon={<Iconify icon='fluent:plug-connected-20-filled' />}>
            {t('Connect')}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
