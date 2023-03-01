import React from 'react'
// next
import Head from 'next/head'
// hoos
import useTranslate from 'hooks/useTranslate'
// routes
import { PATH_ACCOUNT, PATH_DASHBOARD } from 'routes/paths'
// componenets
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs'

export default function Settings() {
  const { t } = useTranslate()
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
      </div>
    </>
  )
}
