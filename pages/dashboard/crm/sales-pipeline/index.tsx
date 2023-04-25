import React from 'react'
// next
import Head from 'next/head'
// hooks
import useTranslate from 'hooks/useTranslate'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// sections
import DealsKanban from 'sections/dashboard/crm/sales-pipeline/DealsKanban'
// components
import { Icon as Iconify } from '@iconify/react'
import { HeaderBreadcrumbs, Button } from 'components'

export default function index() {
  const { t } = useTranslate()
  return (
    <>
      <Head>
        <title>{t('Sales Pipeline')} | Pivot Point BMS</title>
      </Head>
      <div className='flex w-full flex-col overflow-hidden px-5'>
        <HeaderBreadcrumbs
          heading={t('Sales Pipeline')}
          links={[
            { name: t('Dashboard'), href: PATH_DASHBOARD.root },
            { name: t('Customer Relationship'), href: PATH_DASHBOARD.crm.root },
            { name: t('Sales Pipeline') },
          ]}
          action={
            <Button startIcon={<Iconify icon='ic:round-add' height={24} />}>
              {t('Create Deal')}
            </Button>
          }
        />
        <DealsKanban />
      </div>
    </>
  )
}
