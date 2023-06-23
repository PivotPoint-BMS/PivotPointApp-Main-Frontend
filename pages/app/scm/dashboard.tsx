import React from 'react'
// next
import Head from 'next/head'
// hooks
import useTranslate from 'hooks/useTranslate'
// api
import { useGetScmStatsQuery } from 'store/api/stats/statsApi'
// layout
import Layout from 'layout/Index'
import RoleBasedGuard from 'guards/RoleBasedGuard'
// sections
import DeliveriesGraph from 'sections/dashboard/scm/dashboard/DeliveriesGraph'
import DeliveriesStatus from 'sections/dashboard/scm/dashboard/DeliveriesStatus'
import InvoicesGraph from 'sections/dashboard/scm/dashboard/InvoicesGraph'
import InvoicesStatus from 'sections/dashboard/scm/dashboard/InvoicesStatus'
// components
import { Card, CardContent, CardHeader, HeaderBreadcrumbs, LoadingIndicator } from 'components'

function index() {
  const { t } = useTranslate()
  const { data, isLoading } = useGetScmStatsQuery()

  return (
    <>
      <Head>
        <title>{t('Supply Chain & Inventory')} | Pivot Point BMS</title>
      </Head>
      <div className='px-5'>
        {isLoading ? (
          <div className='flex h-56 w-full items-center justify-center'>
            <LoadingIndicator />
          </div>
        ) : (
          <>
            <HeaderBreadcrumbs heading={t('Supply Chain & Inventory')} />
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>
              <Card fullWidth className='h-full'>
                <CardHeader
                  title={t('Deliveries')}
                  // actions={
                  //   <div className='flex items-start gap-1'>
                  //     <Icon
                  //       icon='solar:graph-down-bold-duotone'
                  //       height={20}
                  //       className='text-red-500'
                  //     />
                  //     <p className='text-sm font-medium'>-2.6%</p>
                  //   </div>
                  // }
                />
                <CardContent className='flex items-center justify-between'>
                  <h6 className='text-3xl font-semibold'>{data?.data.monthDeliveries || 0}</h6>
                </CardContent>
              </Card>
              <Card fullWidth className='h-full'>
                <CardHeader
                  title={t('New Invoices')}
                  // actions={
                  //   <div className='flex items-start gap-1'>
                  //     <Icon
                  //       icon='solar:graph-up-bold-duotone'
                  //       height={20}
                  //       className='text-green-500'
                  //     />
                  //     <p className='text-sm font-medium'>+30%</p>
                  //   </div>
                  // }
                />
                <CardContent className='flex items-center justify-between'>
                  <h6 className='text-3xl font-semibold'>{data?.data.monthInvoices || 0} </h6>
                </CardContent>
              </Card>
              <Card fullWidth className='h-full'>
                <CardHeader
                  title={t('Fulfilled Invoices')}
                  // actions={
                  //   <div className='flex items-start gap-1'>
                  //     <Icon
                  //       icon='solar:graph-down-bold-duotone'
                  //       height={20}
                  //       className='text-red-500'
                  //     />
                  //     <p className='text-sm font-medium'>-5%</p>
                  //   </div>
                  // }
                />
                <CardContent className='flex items-center justify-between'>
                  <h6 className='text-3xl font-semibold'>{data?.data.fulfilledInvoices || 0}</h6>
                </CardContent>
              </Card>
              <Card fullWidth className='h-full'>
                <CardHeader
                  title={t('Invoices To Pay')}

                  // actions={
                  //   <div className='flex items-start gap-1'>
                  //     <Icon
                  //       icon='solar:graph-up-bold-duotone'
                  //       height={20}
                  //       className='text-green-500'
                  //     />
                  //     <p className='text-sm font-medium'>+10%</p>
                  //   </div>
                  // }
                />
                <CardContent className='flex items-center justify-between'>
                  <h6 className='text-3xl font-semibold'>
                    {data?.data.invoicesSummart.pending || 0}{' '}
                  </h6>
                </CardContent>
              </Card>
              <InvoicesGraph
                dates={data?.data.invoicesData.days || []}
                newInvoices={data?.data.invoicesData.newInvs || []}
                completedInvoices={data?.data.invoicesData.complInvs || []}
                paidInvoices={data?.data.invoicesData.paidInvs || []}
              />
              <InvoicesStatus
                data={[
                  data?.data.invoicesSummart.new || 0,
                  data?.data.invoicesSummart.pending || 0,
                  data?.data.invoicesSummart.paid || 0,
                  data?.data.invoicesSummart.completed || 0,
                ]}
                labels={[t('New'), t('Pending'), t('Paid'), t('Completed')]}
              />
              <DeliveriesStatus
                data={[
                  data?.data.deliveriesSummary.initiated || 0,
                  data?.data.deliveriesSummary.inTransit || 0,
                  data?.data.deliveriesSummary.arrivedAtDestination || 0,
                  data?.data.deliveriesSummary.deliveryComplete || 0,
                ]}
                labels={[
                  t('Initiated'),
                  t('In Transit'),
                  t('Arrived At Destination'),
                  t('Completed'),
                ]}
              />
              <DeliveriesGraph
                dates={data?.data.deliveriesData.days || []}
                initiatedDeliveries={data?.data.deliveriesData.initiated || []}
                inTransitDeliveries={data?.data.deliveriesData.inTransit || []}
                completedDeliveries={data?.data.deliveriesData.deliveryComplete || []}
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}
index.getLayout = function getLayout(page: JSX.Element) {
  return (
    <Layout variant='dashboard'>
      <RoleBasedGuard accessibleRoles={['Owner', 'SCM']}>{page}</RoleBasedGuard>
    </Layout>
  )
}

export default index
