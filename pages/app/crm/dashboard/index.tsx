import React, { useEffect } from 'react'

// next
import Head from 'next/head'
// api
import { useGetCrmStatsQuery } from 'store/api/stats/statsApi'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// sections
import {
  CustomerSatisfaction,
  Conversions,
  TopCustomerComplaints,
} from 'sections/dashboard/crm/dashbord'
// layout
import Layout from 'layout/Index'
// components
import { HeaderBreadcrumbs, Card, CardHeader, CardContent, LoadingIndicator } from 'components'

function Dashboard() {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const { data, isError, isLoading, isSuccess, isFetching } = useGetCrmStatsQuery(undefined, {
    pollingInterval: 5 * 60 * 60 * 1000, // 5 hours
  })

  useEffect(() => {
    if (isError) {
      open({
        message: t('A problem has occurred while retrieving data.'),
        type: 'error',
        variant: 'contained',
      })
    }
  }, [isError, isSuccess, isFetching, isLoading])

  return (
    <>
      <Head>
        <title>{t('Customer Relationship')} | Pivot Point BMS</title>
      </Head>
      <div className='px-5'>
        {isLoading ? (
          <div className='flex h-56 w-full items-center justify-center'>
            <LoadingIndicator />
          </div>
        ) : (
          <>
            <HeaderBreadcrumbs heading={t('Customer Relationship')} />
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>
              <Card fullWidth className='h-full'>
                <CardHeader
                  title={t('Total Contacts')}
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
                  <h6 className='text-3xl font-semibold'>{data?.data.contactsTotal || 0}</h6>
                </CardContent>
              </Card>
              <Card fullWidth className='h-full'>
                <CardHeader
                  title={t('Total Leads')}
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
                  <h6 className='text-3xl font-semibold'>
                    {data?.data.leadsTotal || 0}{' '}
                    <span className='text-primary-600'>({data?.data.newLeads || 0})</span>
                  </h6>
                </CardContent>
              </Card>
              <Card fullWidth className='h-full'>
                <CardHeader
                  title={t('Successful Conversions')}
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
                  <h6 className='text-3xl font-semibold'>{data?.data.convertedLeads || 0}</h6>
                </CardContent>
              </Card>
              <Card fullWidth className='h-full'>
                <CardHeader
                  title={t('Total Deals')}

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
                    {data?.data.dealsTotal}{' '}
                    <span className='text-primary-600'>({data?.data.newLeads || 0})</span>
                  </h6>
                </CardContent>
              </Card>
              <CustomerSatisfaction
                dataNegative={data?.data.sentimentAnalysisData.negative || []}
                dataPositive={data?.data.sentimentAnalysisData.positive || []}
                months={data?.data.sentimentAnalysisData.months || []}
              />
              <TopCustomerComplaints
                data={data?.data.complaintsChartData.complaintsNumber || []}
                labels={data?.data.complaintsChartData.complaint || []}
              />
              <Conversions
                dates={data?.data.leadsChartData.date || []}
                convertedLeads={data?.data.leadsChartData.convertedLeads || []}
                newLeads={data?.data.leadsChartData.newLeads || []}
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}

Dashboard.getLayout = function getLayout(page: JSX.Element) {
  return <Layout variant='dashboard'>{page}</Layout>
}

export default Dashboard
