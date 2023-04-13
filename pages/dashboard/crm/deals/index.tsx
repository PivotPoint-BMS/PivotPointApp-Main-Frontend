import React, { useState } from 'react'
// next
import Head from 'next/head'
// hooks
import useTranslate from 'hooks/useTranslate'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// sections
import { DealsKanban, DealsList } from 'sections/dashboard/crm/deals'
// components
import { Icon as Iconify } from '@iconify/react'
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs'
import Button from '@/components/Button'
import ToggleGroup from '@/components/ToggleGroup'

export default function index() {
  const { t } = useTranslate()
  const [view, setView] = useState('list')
  return (
    <>
      <Head>
        <title>{t('Deals')} | Pivot Point BMS</title>
      </Head>
      <div className='flex w-full flex-col overflow-hidden px-5'>
        <HeaderBreadcrumbs
          heading={t('Deals')}
          links={[
            { name: t('Dashboard'), href: PATH_DASHBOARD.root },
            { name: t('Customer Relationship'), href: PATH_DASHBOARD.crm.root },
            { name: t('Deals') },
          ]}
          action={
            <div className='flex items-center justify-center gap-5'>
              <ToggleGroup
                type='single'
                settings={[
                  {
                    icon: 'material-symbols:format-list-bulleted',
                    label: 'List',
                    value: 'list',
                  },
                  {
                    icon: 'tabler:layout-kanban',
                    label: 'Kanban',
                    value: 'kanban',
                  },
                ]}
                value={view}
                onValueChange={(value) => {
                  if (value.length > 0) setView(value)
                }}
              />
              <Button startIcon={<Iconify icon='ic:round-add' height={24} />}>
                {t('Create Deal')}
              </Button>
            </div>
          }
        />
        {view === 'kanban' ? <DealsKanban /> : <DealsList />}
      </div>
    </>
  )
}
