import React from 'react'
import clsx from 'clsx'
// next
import Head from 'next/head'
// radix
import * as TabsPrimitive from '@radix-ui/react-tabs'
// hooks
import useTranslate from 'hooks/useTranslate'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// sections
import UnassinedTickets from 'sections/dashboard/crm/customer-service/UnassinedTickets'
// layout
import Layout from 'layout'
// components
import { HeaderBreadcrumbs, Button } from 'components'
import { Icon } from '@iconify/react'

const TABS = [
  { name: 'Unassined', value: 'unassined' },
  { name: 'Assigned to me', value: 'assigned-to-me' },
  { name: 'All Tickets', value: 'all-tickets' },
  { name: 'Archive', value: 'archive' },
]

function index() {
  const { t, locale } = useTranslate()
  return (
    <>
      <Head>
        <title>{t('Customer Service')} | Pivot Point BMS</title>
      </Head>
      <div className='flex w-full flex-col px-5'>
        <HeaderBreadcrumbs
          heading={t('Customer Service')}
          links={[
            { name: t('Dashboard'), href: PATH_DASHBOARD.root },
            { name: t('Customer Relationship'), href: PATH_DASHBOARD.crm.root },
            { name: t('Customer Service') },
          ]}
          action={
            <Button startIcon={<Icon icon='ic:round-add' height={24} />}>{t('New Ticket')}</Button>
          }
        />
        <TabsPrimitive.Root defaultValue='unassined' dir={locale === 'ar' ? 'rtl' : 'ltr'}>
          <TabsPrimitive.List className=' scrollbar-none flex w-full items-center gap-4 overflow-x-scroll   rounded-lg border bg-gray-50 p-1 dark:bg-gray-800'>
            {TABS.map((item, i) => (
              <TabsPrimitive.Trigger
                key={i}
                value={item.value}
                className={clsx(
                  'relative flex min-w-max cursor-pointer items-center justify-start gap-3 rounded-md p-2 transition-all',
                  'data-[state=active]:bg-primary-600 data-[state=active]:text-white data-[state=active]:shadow',
                  'dark:data-[state=active]:bg-primary-700',
                  'data-[state=inactive]:text-gray-600 dark:data-[state=inactive]:text-gray-400'
                )}
              >
                <label className='cursor-pointer font-medium'>{t(item.name)}</label>
              </TabsPrimitive.Trigger>
            ))}
          </TabsPrimitive.List>
          <TabsPrimitive.Content value='unassined' className='w-full overflow-visible py-6'>
            <UnassinedTickets />
          </TabsPrimitive.Content>
        </TabsPrimitive.Root>
      </div>
    </>
  )
}

index.getLayout = function getLayout(page: JSX.Element) {
  return <Layout variant='dashboard'>{page}</Layout>
}

export default index
