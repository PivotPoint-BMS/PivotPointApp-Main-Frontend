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

export default function DeliveriesGraph({
  initiatedDeliveries,
  inTransitDeliveries,
  completedDeliveries,
  dates,
}: {
  initiatedDeliveries: number[]
  inTransitDeliveries: number[]
  completedDeliveries: number[]
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
    { name: t('Initiated'), data: initiatedDeliveries },
    { name: t('In Transit'), data: inTransitDeliveries },
    { name: t('Completed'), data: completedDeliveries },
  ]

  return (
    <Card fullWidth className='sm:col-span-2 md:col-span-3'>
      <CardHeader title={t('Deliveries last 30 days')} />
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
