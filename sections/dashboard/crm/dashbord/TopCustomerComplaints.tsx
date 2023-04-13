// utils
import { merge } from 'lodash'
import { fNumber } from 'utils/formatNumber'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import Card from '@/components/Card'
import CardContent from '@/components/CardContent'
import CardHeader from '@/components/CardHeader'
import ReactApexChart, { BaseOptionChart } from '@/components/chart'

const CHART_DATA = [4344, 5435, 1443, 4443, 443]

export default function TopCustomerComplaints() {
  const { t } = useTranslate()
  const chartOptions = merge(BaseOptionChart(), {
    labels: [
      'Product quality',
      'Shipping and delivery',
      'Billing and payment',
      'Customer service',
      'Other ',
    ],
    stroke: { colors: ['#ffffff00'] },
    legend: { horizontalAlign: 'center' },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName: number) => fNumber(seriesName),
        title: {
          formatter: (seriesName: number) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '90%',
          labels: {
            value: {
              formatter: (val: number) => fNumber(val),
            },
            total: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter: (w: any) => {
                const sum = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0)
                return fNumber(sum)
              },
            },
          },
        },
      },
    },
  })
  return (
    <Card fullWidth className='h-full'>
      <CardHeader title={t('Top Customer Complaints')} />
      <CardContent className='flex items-center justify-center'>
        <ReactApexChart
          type='donut'
          series={CHART_DATA}
          options={chartOptions}
          height={350}
          width='100%'
        />
      </CardContent>
    </Card>
  )
}
