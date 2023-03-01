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
import ProfileTeam from 'sections/dashboard/user/profile/ProfileTeam'
// components
import { Icon as Iconify } from '@iconify/react'
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs'
import Scrollbar from '@/components/Scrollbar'

const Tabs = [
  { name: 'General', icon: 'mdi:user-circle', value: '1' },
  { name: 'Password', icon: 'material-symbols:password-rounded', value: '2' },
  { name: 'Team', icon: 'ion:people', value: '3' },
  { name: 'Billing', icon: 'mdi:invoice', value: '4' },
  { name: 'Notification', icon: 'ic:round-notifications', value: '5' },
  { name: 'Api', icon: 'ant-design:api-filled', value: '6' },
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
              {Tabs.map((item, i) => (
                <TabsPrimitive.Trigger
                  key={i}
                  value={item.value}
                  className={clsx(
                    'flex cursor-pointer items-center justify-start gap-3 border-primary-500 px-1 pt-3 pb-3 transition-all data-[state=active]:border-b-[3px] data-[state=active]:pb-[9px] data-[state=active]:pb-[-3px] data-[state=inactive]:text-gray-600 dark:border-primary-400 dark:data-[state=inactive]:text-gray-400'
                  )}
                >
                  <div className='flex cursor-pointer items-center gap-2'>
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
            <ProfileTeam />
          </TabsPrimitive.Content>
          <TabsPrimitive.Content value='4' className={clsx('w-full py-6')}>
            <ProfileBilling />
          </TabsPrimitive.Content>
          <TabsPrimitive.Content value='5' className={clsx('w-full py-6')}>
            <ProfileNotification />
          </TabsPrimitive.Content>
          <TabsPrimitive.Content value='6' className={clsx('w-full py-6')}>
            <ProfileApi />
          </TabsPrimitive.Content>
        </TabsPrimitive.Root>
      </div>
    </>
  )
}
