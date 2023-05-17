import React from 'react'
import { merge } from 'lodash'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import Card from 'components/Card'
import CardContent from 'components/CardContent'
import CardHeader from 'components/CardHeader'
import ReactApexChart, { BaseOptionChart } from 'components/chart'
import moment from 'moment'

export default function Conversions({
  newLeads,
  convertedLeads,
  dates,
}: {
  newLeads: number[]
  convertedLeads: number[]
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
    { name: t('New Leads'), data: newLeads },
    { name: t('Successfull Conversions'), data: convertedLeads },
  ]

  return (
    <Card fullWidth className='sm:col-span-2 md:col-span-4'>
      <CardHeader title={t('Conversions')} />
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
