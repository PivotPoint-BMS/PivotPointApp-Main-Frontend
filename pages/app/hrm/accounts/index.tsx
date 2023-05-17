import React from 'react'
// next
import Head from 'next/head'
// hooks
import useTranslate from 'hooks/useTranslate'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// sections
import AccountsList from 'sections/dashboard/hrm/accounts/list/AccountsList'
// layout
import Layout from 'layout/Index'
// components
import { Icon } from '@iconify/react'
import { HeaderBreadcrumbs, Button, Card } from 'components'

function index() {
  const { t } = useTranslate()
  return (
    <>
      <Head>
        <title>{t('Accounts')} | Pivot Point BMS</title>
      </Head>
      <div className='flex max-w-full flex-col overflow-hidden px-5'>
        <HeaderBreadcrumbs
          heading={t('Accounts')}
          links={[
            { name: t('Dashboard'), href: PATH_DASHBOARD.root },
            { name: t('Human Resource'), href: PATH_DASHBOARD.crm.root },
            { name: t('Accounts') },
          ]}
          action={
            <Button startIcon={<Icon icon='ic:round-add' height={24} />}>
              {t('Create Account')}
            </Button>
          }
        />
        <Card fullWidth className='overflow-hidden'>
          <AccountsList />
        </Card>
      </div>
    </>
  )
}
index.getLayout = function getLayout(page: JSX.Element) {
  return <Layout variant='dashboard'>{page}</Layout>
}

export default index
