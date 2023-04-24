import { useEffect, useState } from 'react'
import clsx from 'clsx'
// next
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
// radix
import * as TabsPrimitive from '@radix-ui/react-tabs'
// hooks
import useTranslate from 'hooks/useTranslate'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// sections
import ContactsList from 'sections/dashboard/crm/contacts-leads/contacts-list'
import LeadsList from 'sections/dashboard/crm/contacts-leads/leads-list'
// components
import { Icon as Iconify } from '@iconify/react'
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs'
import Card from '@/components/Card'
import Button from '@/components/Button'

const TABS = [
  { name: 'Contacts', value: 'contacts' },
  { name: 'Leads', value: 'leads' },
]

export default function index() {
  const { t, locale } = useTranslate()
  const { push, pathname, query } = useRouter()
  const [tab, setTab] = useState(query?.tab ? (query?.tab as string) : 'contacts')

  useEffect(() => {
    push(pathname, { query: { tab } })
  }, [pathname, tab])

  return (
    <>
      <Head>
        <title>{t('Lead Details')} | Pivot Point BMS</title>
      </Head>
      <div className='flex max-w-full flex-col overflow-hidden px-5'>
        <HeaderBreadcrumbs
          heading={t('Contacts & Leads')}
          links={[
            { name: t('Dashboard'), href: PATH_DASHBOARD.root },
            { name: t('Customer Relationship'), href: PATH_DASHBOARD.crm.root },
            { name: t('Contacts & Leads') },
          ]}
          action={
            <Link href={PATH_DASHBOARD.crm['contacts-leads'].create}>
              <Button startIcon={<Iconify icon='ic:round-add' height={24} />}>
                {t('Create Lead')}
              </Button>
            </Link>
          }
        />
        <Card fullWidth className='overflow-hidden'>
          <TabsPrimitive.Root
            defaultValue='contacts'
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
            className='overflow-hidden'
            value={tab}
            onValueChange={(value) => setTab(value)}
          >
            <TabsPrimitive.List className='flex w-full items-center gap-8 bg-gray-100 px-4  dark:bg-gray-900'>
              {TABS.map((item, i) => (
                <TabsPrimitive.Trigger
                  key={i}
                  value={item.value}
                  className={clsx(
                    'relative flex cursor-pointer items-center justify-start gap-3  px-1 pt-3 pb-3 text-sm transition-all',
                    'before:absolute before:bottom-0 before:h-[3px] before:w-full before:rounded-t-full before:bg-primary-600 before:transition-all ltr:before:left-0 rtl:before:right-0',
                    'before:duration-500 data-[state=inactive]:before:w-0',
                    'data-[state=inactive]:text-gray-600 dark:data-[state=inactive]:text-gray-400'
                  )}
                >
                  <div className='flex w-max cursor-pointer items-center gap-2'>
                    <label className='cursor-pointer font-medium'>{t(item.name)}</label>
                  </div>
                </TabsPrimitive.Trigger>
              ))}
            </TabsPrimitive.List>
            <TabsPrimitive.Content value='contacts' className='w-full'>
              <ContactsList />
            </TabsPrimitive.Content>
            <TabsPrimitive.Content value='leads' className='w-full'>
              <LeadsList />
            </TabsPrimitive.Content>
          </TabsPrimitive.Root>
        </Card>
      </div>
    </>
  )
}
