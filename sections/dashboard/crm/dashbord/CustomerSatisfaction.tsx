import React from 'react'
import { merge } from 'lodash'
import moment from 'moment'
import Link from 'next/link'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import ReactApexChart, { BaseOptionChart } from 'components/chart'
import Card from 'components/Card'
import CardContent from 'components/CardContent'
import CardHeader from 'components/CardHeader'
import Button from 'components/Button'
import { Icon } from '@iconify/react'
import { PATH_DASHBOARD } from 'routes/paths'

export default function CustomerSatisfaction({
  dataNegative,
  dataPositive,
  dataNeutral,
  days,
}: {
  dataNegative: number[]
  dataPositive: number[]
  dataNeutral: number[]
  days: string[]
}) {
  const { t } = useTranslate()
  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: 'top', horizontalAlign: 'right' },
    colors: ['#1FAA69', '#FF0800', '#0070BB'],
    xaxis: {
      categories: days.map((day) => moment(day).format('DD MMM')),
    },
  })
  return (
    <Card fullWidth className='sm:col-span-2 md:col-span-3'>
      <CardHeader
        title={t('Customer Satisfaction (last 30 days)')}
        subheader={t('Customer feedback analysis based on reviews sent through external API')}
        actions={
          <Link href={PATH_DASHBOARD.crm['sentiment-analysis']}>
            <Button
              variant='text'
              intent='secondary'
              endIcon={<Icon icon='mingcute:external-link-fill' />}
            >
              {t('More Info')}
            </Button>
          </Link>
          /* <Badge label={t('Beta')} intent='warning' /> */
        }
      />
      <CardContent>
        <ReactApexChart
          type='bar'
          series={[
            { name: t('Positive'), data: dataPositive },
            { name: t('Negative'), data: dataNegative },
            { name: t('Neutral'), data: dataNeutral },
          ]}
          options={chartOptions}
          height={364}
          width='100%'
        />
      </CardContent>
    </Card>
  )
}
