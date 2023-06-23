import React from 'react'
import { merge } from 'lodash'
import moment from 'moment'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import Card from 'components/Card'
import CardContent from 'components/CardContent'
import CardHeader from 'components/CardHeader'
import ReactApexChart, { BaseOptionChart } from 'components/chart'

export default function InvoicesGraph({
  newInvoices,
  paidInvoices,
  completedInvoices,
  dates,
}: {
  newInvoices: number[]
  paidInvoices: number[]
  completedInvoices: number[]
  dates: string[]
}) {
  const { t } = useTranslate()

  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: 'top', horizontalAlign: 'right' },
    xaxis: {
      categories: dates.map((date) => moment(date).format('DD MMM')),
    },
  })

  const CHART_DATA = [
    { name: t('New Invoices'), data: newInvoices },
    { name: t('Paid Invoices'), data: paidInvoices },
    { name: t('Completed Invoices'), data: completedInvoices },
  ]

  return (
    <Card fullWidth className='sm:col-span-2 md:col-span-3'>
      <CardHeader title={t('Invoices last 30 days')} />
      <CardContent>
        <ReactApexChart
          type='area'
          series={CHART_DATA}
          options={chartOptions}
          height={364}
          width='100%'
        />
      </CardContent>
    </Card>
  )
}
