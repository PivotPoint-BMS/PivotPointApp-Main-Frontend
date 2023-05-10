import React from 'react'
import clsx from 'clsx'
// next
import Head from 'next/head'
// radix
import * as TabsPrimitive from '@radix-ui/react-tabs'
// hoos
import useTranslate from 'hooks/useTranslate'
// routes
import { PATH_ACCOUNT, PATH_DASHBOARD } from 'routes/paths'
// sections
import SettingsEmail from 'sections/dashboard/user/settings/SettingsEmail'
import SettingsStorage from 'sections/dashboard/user/settings/SettingsStorage'
import SettingsIntegration from 'sections/dashboard/user/settings/SettingsIntegration'
import SettingsSecurity from 'sections/dashboard/user/settings/SettingsSecurity'
import SettingsData from 'sections/dashboard/user/settings/SettingsData'
import SettingsApi from 'sections/dashboard/user/settings/SettingsApi'
// componenets
import { Icon as Iconify } from '@iconify/react'
import { HeaderBreadcrumbs, Scrollbar } from 'components'

const TABS = [
  { name: 'Email', icon: 'ion:mail', value: 'email' },
  { name: 'Storage', icon: 'material-symbols:home-storage-rounded', value: 'storage' },
  { name: 'Integration', icon: 'mdi:link-box', value: 'integration' },
  { name: 'Data Export', icon: 'mingcute:file-export-fill', value: 'data-export' },
  { name: 'API', icon: 'ant-design:api-filled', value: 'api' },
]

export default function Settings() {
  const { t, locale } = useTranslate()
  return (
    <>
      <Head>
        <title>PivotPoint BMS | {t('Company Settings')}</title>
      </Head>
      <div className='flex max-w-full flex-col overflow-hidden px-5'>
        <HeaderBreadcrumbs
          heading={t('Company Settings')}
          links={[
            { name: t('Dashboard'), href: PATH_DASHBOARD.root },
            { name: t('User'), href: PATH_ACCOUNT.profile },
            { name: t('Company Settings') },
          ]}
        />
        <TabsPrimitive.Root
          defaultValue='email'
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
          className='overflow-hidden'
        >
          <Scrollbar className='w-full py-3'>
            <TabsPrimitive.List className={clsx('flex w-full items-center gap-8')}>
              {TABS.map((item, i) => (
                <TabsPrimitive.Trigger
                  key={i}
                  value={item.value}
                  className={clsx(
                    'relative flex cursor-pointer items-center justify-start gap-3 px-1 pt-3 pb-3 transition-all',
                    'before:absolute before:bottom-0 before:h-[3px] before:w-full before:rounded-full before:bg-primary-600 before:transition-all ltr:before:left-0 rtl:before:right-0',
                    'before:duration-500 data-[state=inactive]:before:w-0',
                    'data-[state=inactive]:text-gray-600 dark:data-[state=inactive]:text-gray-400'
                  )}
                >
                  <div className='flex w-max cursor-pointer items-center gap-2'>
                    {item.icon && <Iconify icon={item.icon} height={20} width={20} />}
                    <label className='cursor-pointer font-medium'>{t(item.name)}</label>
                  </div>
                </TabsPrimitive.Trigger>
              ))}
            </TabsPrimitive.List>
          </Scrollbar>
          <TabsPrimitive.Content value='email' className={clsx('w-full py-6')}>
            <SettingsEmail />
          </TabsPrimitive.Content>{' '}
          <TabsPrimitive.Content value='storage' className={clsx('w-full py-6')}>
            <SettingsStorage />
          </TabsPrimitive.Content>{' '}
          <TabsPrimitive.Content value='integration' className={clsx('w-full py-6')}>
            <SettingsIntegration />
          </TabsPrimitive.Content>{' '}
          <TabsPrimitive.Content value='4' className={clsx('w-full py-6')}>
            <SettingsSecurity />
          </TabsPrimitive.Content>{' '}
          <TabsPrimitive.Content value='data-export' className={clsx('w-full py-6')}>
            <SettingsData />
          </TabsPrimitive.Content>{' '}
          <TabsPrimitive.Content value='api' className={clsx('w-full py-6')}>
            <SettingsApi />
          </TabsPrimitive.Content>
        </TabsPrimitive.Root>
      </div>
    </>
  )
}
