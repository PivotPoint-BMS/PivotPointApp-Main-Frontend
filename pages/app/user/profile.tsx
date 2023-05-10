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
import ProfileSupport from 'sections/dashboard/user/profile/ProfileSupport'
// components
import { Icon as Iconify } from '@iconify/react'
import { HeaderBreadcrumbs, Scrollbar } from 'components'

const TABS = [
  { name: 'General', icon: 'mdi:user-circle', value: 'general' },
  { name: 'Password', icon: 'mdi:password', value: 'password' },
  { name: 'Billing', icon: 'basil:invoice-solid', value: 'billing' },
  { name: 'Notification', icon: 'ic:round-notifications', value: 'notification' },
  { name: 'Support', icon: 'material-symbols:contact-support-rounded', value: 'support' },
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
          defaultValue='general'
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
          <TabsPrimitive.Content value='general' className='w-full py-6'>
            <ProfileGeneral />
          </TabsPrimitive.Content>
          <TabsPrimitive.Content value='password' className='w-full py-6'>
            <ProfilePassword />
          </TabsPrimitive.Content>
          <TabsPrimitive.Content value='billing' className='w-full py-6'>
            <ProfileBilling />
          </TabsPrimitive.Content>
          <TabsPrimitive.Content value='notification' className='w-full py-6'>
            <ProfileNotification />
          </TabsPrimitive.Content>
          <TabsPrimitive.Content value='support' className='w-full py-6'>
            <ProfileSupport />
          </TabsPrimitive.Content>
        </TabsPrimitive.Root>
      </div>
    </>
  )
}
