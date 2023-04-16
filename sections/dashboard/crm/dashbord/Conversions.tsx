import React from 'react'
import { merge } from 'lodash'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import Card from '@/components/Card'
import CardContent from '@/components/CardContent'
import CardHeader from '@/components/CardHeader'
import ReactApexChart, { BaseOptionChart } from '@/components/chart'

const CHART_DATA = [
  { name: 'Successfull Conversions', data: [10, 41, 35, 151, 49, 62, 69, 91, 48] },
  { name: 'Failed Conversions', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
]

export default function Conversions() {
  const { t } = useTranslate()

  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: 'top', horizontalAlign: 'right' },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
  })

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
