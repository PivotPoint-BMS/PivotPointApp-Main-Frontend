import React from 'react'
import Head from 'next/head'
import { merge } from 'lodash'
import moment from 'moment'
// hooks
import useTranslate from 'hooks/useTranslate'
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs'
import LoadingIndicator from 'components/LoadingIndicator'
import { useGetCrmStatsQuery } from 'store/api/stats/statsApi'
import Card from 'components/Card'
import CardHeader from 'components/CardHeader'
import CardContent from 'components/CardContent'
import ReactApexChart, { BaseOptionChart } from 'components/chart'
import Layout from 'layout/Index'
import RoleBasedGuard from 'guards/RoleBasedGuard'

function index() {
  const { t } = useTranslate()
  const { data, isLoading } = useGetCrmStatsQuery(undefined, {
    pollingInterval: 5 * 60 * 60 * 1000, // 5 hours
  })
  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: 'top', horizontalAlign: 'right' },
    colors: ['#1FAA69', '#FF0800', '#0070BB'],
    xaxis: {
      categories: data?.data.sentimentAnalysisData.date.map((day) => moment(day).format('DD MMM')),
    },
  })
  return (
    <>
      <Head>
        <title>{t('Customer Satisfaction')} | Pivot Point BMS</title>
      </Head>
      <div className='px-5'>
        {isLoading ? (
          <div className='flex h-56 w-full items-center justify-center'>
            <LoadingIndicator />
          </div>
        ) : (
          <>
            <HeaderBreadcrumbs heading={t('Customer Satisfaction')} />
            <Card fullWidth>
              <CardHeader
                title={t('Customer Satisfaction (last 30 days)')}
                subheader={t(
                  'Customer feedback analysis based on reviews sent through external API'
                )}
              />
              <CardContent>
                <ReactApexChart
                  type='bar'
                  series={[
                    { name: t('Positive'), data: data?.data.sentimentAnalysisData.positive || [] },
                    { name: t('Negative'), data: data?.data.sentimentAnalysisData.negative || [] },
                    { name: t('Neutral'), data: data?.data.sentimentAnalysisData.neutral || [] },
                  ]}
                  options={chartOptions}
                  height={300}
                  width='100%'
                />
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </>
  )
}

index.getLayout = function getLayout(page: JSX.Element) {
  return (
    <Layout variant='dashboard'>
      <RoleBasedGuard accessibleRoles={['Owner', 'CRM']}>{page}</RoleBasedGuard>
    </Layout>
  )
}
export default index
