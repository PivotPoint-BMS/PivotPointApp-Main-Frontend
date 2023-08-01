import React from 'react'
// next
import Head from 'next/head'
import { useRouter } from 'next/router'
// hooks
import useTranslate from 'hooks/useTranslate'
// redux
import { wrapper } from 'store'
// apis
import {
  getInvoice,
  getRunningQueriesThunk,
  useGetInvoiceQuery,
} from 'store/api/scm/invoices/invoicesApis'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// layout
import Layout from 'layout/Index'
// guards
import RoleBasedGuard from 'guards/RoleBasedGuard'
// sections
import CreateEditInvoiceForm from 'sections/dashboard/scm/invoices/CreateEditInvoiceForm'
// components
import { HeaderBreadcrumbs, LoadingIndicator } from 'components'

function index() {
  const { t } = useTranslate()
  const {
    query: { id },
    isFallback,
  } = useRouter()

  const { data: currentInvoice, isLoading } = useGetInvoiceQuery(
    id?.toString() ? id?.toString() : '',
    {
      skip: isFallback,
      refetchOnFocus: true,
    }
  )

  return (
    <>
      <Head>
        <title>{t('Edit Invoice')} | Pivot Point BMS</title>
      </Head>
      <div className='flex max-w-full flex-col px-5'>
        <HeaderBreadcrumbs
          heading={t('Edit Invoice')}
          links={[
            { name: t('Dashboard'), href: PATH_DASHBOARD.root },
            { name: t('Supply Chain & Inventory'), href: PATH_DASHBOARD.scm.dashboard },
            { name: t('Invoices'), href: PATH_DASHBOARD.scm.invoices.root },
            { name: t('Edit Invoice') },
          ]}
        />
        {isLoading ? (
          <div className='flex h-56 w-full items-center justify-center'>
            <LoadingIndicator />
          </div>
        ) : (
          <CreateEditInvoiceForm isEdit currentInvoice={currentInvoice?.data} />
        )}
      </div>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query: { id } }) => {
      store.dispatch(getInvoice.initiate(id?.toString() ? id?.toString() : ''))

      await Promise.all(store.dispatch(getRunningQueriesThunk()))

      return {
        props: {},
      }
    }
)

index.getLayout = function getLayout(page: JSX.Element) {
  return (
    <Layout variant='dashboard'>
      <RoleBasedGuard accessibleRoles={['Owner', 'SCM']}>{page}</RoleBasedGuard>
    </Layout>
  )
}

export default index
