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
import SettingsSupport from 'sections/dashboard/user/settings/SettingsSupport'
// componenets
import { Icon as Iconify } from '@iconify/react'
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs'
import Scrollbar from '@/components/Scrollbar'

const TABS = [
  { name: 'Email', icon: 'ion:mail', value: '1' },
  { name: 'Storage', icon: 'material-symbols:home-storage-rounded', value: '2' },
  { name: 'Integration', icon: 'mdi:link-box', value: '3' },
  { name: 'Data Export', icon: 'mingcute:file-export-fill', value: '5' },
  { name: 'Support', icon: 'material-symbols:contact-support-rounded', value: '6' },
]

export default function Settings() {
  const { t, locale } = useTranslate()
  return (
    <>
      <Head>
        <title>PivotPoint BMS | {t('Settings')}</title>
      </Head>
      <div className='flex max-w-full flex-col overflow-hidden px-5'>
        <HeaderBreadcrumbs
          heading={t('Settings')}
          links={[
            { name: t('Dashboard'), href: PATH_DASHBOARD.root },
            { name: t('User'), href: PATH_ACCOUNT.profile },
            { name: t('Settings') },
          ]}
        />
        <TabsPrimitive.Root
          defaultValue='1'
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
          <TabsPrimitive.Content value='1' className={clsx('w-full py-6')}>
            <SettingsEmail />
          </TabsPrimitive.Content>{' '}
          <TabsPrimitive.Content value='2' className={clsx('w-full py-6')}>
            <SettingsStorage />
          </TabsPrimitive.Content>{' '}
          <TabsPrimitive.Content value='3' className={clsx('w-full py-6')}>
            <SettingsIntegration />
          </TabsPrimitive.Content>{' '}
          <TabsPrimitive.Content value='4' className={clsx('w-full py-6')}>
            <SettingsSecurity />
          </TabsPrimitive.Content>{' '}
          <TabsPrimitive.Content value='5' className={clsx('w-full py-6')}>
            <SettingsData />
          </TabsPrimitive.Content>{' '}
          <TabsPrimitive.Content value='6' className={clsx('w-full py-6')}>
            <SettingsSupport />
          </TabsPrimitive.Content>
        </TabsPrimitive.Root>
      </div>
    </>
  )
}
