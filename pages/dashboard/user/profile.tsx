import React from 'react'
import clsx from 'clsx'
// next
import Head from 'next/head'
// radix
import * as TabsPrimitive from '@radix-ui/react-tabs'
// routes
import { PATH_ACCOUNT, PATH_DASHBOARD } from 'routes/paths'
// hooks
import useTranslate from 'hooks/useTranslate'
// sections
import ProfileGeneral from 'sections/dashboard/user/profile/ProfileGeneral'
import ProfilePassword from 'sections/dashboard/user/profile/ProfilePassword'
import ProfileBilling from 'sections/dashboard/user/profile/ProfileBilling'
import ProfileNotification from 'sections/dashboard/user/profile/ProfileNotification'
import ProfileApi from 'sections/dashboard/user/profile/ProfileApi'
// components
import { Icon as Iconify } from '@iconify/react'
import { HeaderBreadcrumbs, Scrollbar } from 'components'

const TABS = [
  { name: 'General', icon: 'mdi:user-circle', value: '1' },
  { name: 'Password', icon: 'mdi:password', value: '2' },
  { name: 'Billing', icon: 'basil:invoice-solid', value: '3' },
  { name: 'Notification', icon: 'ic:round-notifications', value: '4' },
  { name: 'Api', icon: 'ant-design:api-filled', value: '5' },
]

export default function Profile() {
  const { t, locale } = useTranslate()

  return (
    <>
      <Head>
        <title>PivotPoint BMS | {t('Profile')}</title>
      </Head>
      <div className='flex max-w-full flex-col overflow-hidden px-5'>
        <HeaderBreadcrumbs
          heading={t('Profile')}
          links={[
            { name: t('Dashboard'), href: PATH_DASHBOARD.root },
            { name: t('User'), href: PATH_ACCOUNT.profile },
            { name: t('Profile') },
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
            <ProfileGeneral />
          </TabsPrimitive.Content>
          <TabsPrimitive.Content value='2' className={clsx('w-full py-6')}>
            <ProfilePassword />
          </TabsPrimitive.Content>
          <TabsPrimitive.Content value='3' className={clsx('w-full py-6')}>
            <ProfileBilling />
          </TabsPrimitive.Content>
          <TabsPrimitive.Content value='4' className={clsx('w-full py-6')}>
            <ProfileNotification />
          </TabsPrimitive.Content>
          <TabsPrimitive.Content value='5' className={clsx('w-full py-6')}>
            <ProfileApi />
          </TabsPrimitive.Content>
        </TabsPrimitive.Root>
      </div>
    </>
  )
}
