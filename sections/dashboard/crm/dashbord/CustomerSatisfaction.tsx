import React from 'react'
import { merge } from 'lodash'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import Card from 'components/Card'
import CardContent from 'components/CardContent'
import CardHeader from 'components/CardHeader'
import ReactApexChart, { BaseOptionChart } from 'components/chart'
import Badge from 'components/Badge'

const CHART_DATA = [{ name: 'Customer Satisfaction', data: [10, 41, 35, 51, 49, 62, 69, 91, 99] }]

export default function CustomerSatisfaction() {
  const { t } = useTranslate()
  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
  })
  return (
    <Card fullWidth className='sm:col-span-2 md:col-span-4'>
      <CardHeader
        title={t('Customer Satisfaction')}
        actions={<Badge label='Beta' intent='warning' />}
      />
      <CardContent>
        <ReactApexChart
          type='line'
          series={CHART_DATA}
          options={chartOptions}
          height={364}
          width='100%'
        />
      </CardContent>
    </Card>
  )
}
