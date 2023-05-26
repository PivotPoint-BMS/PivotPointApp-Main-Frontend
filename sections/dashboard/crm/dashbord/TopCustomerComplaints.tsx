// utils
import { merge } from 'lodash'
import { fNumber } from 'utils/formatNumber'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import Card from 'components/Card'
import CardContent from 'components/CardContent'
import CardHeader from 'components/CardHeader'
import ReactApexChart, { BaseOptionChart } from 'components/chart'

export default function TopCustomerComplaints({
  labels,
  data,
}: {
  labels: string[]
  data: number[]
}) {
  const { t } = useTranslate()
  const chartOptions = merge(BaseOptionChart(), {
    labels: labels.slice(0, 6),
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
    <Card fullWidth className='h-full sm:col-span-2 md:col-span-1'>
      <CardHeader title={t('Top Customer Discussions')} />
      <CardContent>
        <ReactApexChart
          type='donut'
          series={data.slice(0, 6)}
          options={chartOptions}
          height={350}
          width='100%'
        />
      </CardContent>
    </Card>
  )
}
