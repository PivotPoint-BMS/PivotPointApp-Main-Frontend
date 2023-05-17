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

export default function CustomerSatisfaction({
  dataNegative,
  dataPositive,
  months,
}: {
  dataNegative: number[]
  dataPositive: number[]
  months: number[]
}) {
  const { t } = useTranslate()
  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: 'top', horizontalAlign: 'right' },
    xaxis: {
      categories: months,
    },
  })
  return (
    <Card fullWidth className='overflow-scroll sm:col-span-2 md:col-span-3'>
      <CardHeader
        title={t('Customer Satisfaction')}
        actions={<Badge label={t('Beta')} intent='warning' />}
      />
      <CardContent>
        <div className='min-w-[400px]'>
          <ReactApexChart
            type='line'
            series={[
              { name: t('Positive'), data: dataPositive },
              { name: t('Negative'), data: dataNegative },
            ]}
            options={chartOptions}
            height={364}
            width='100%'
          />
        </div>
      </CardContent>
    </Card>
  )
}
