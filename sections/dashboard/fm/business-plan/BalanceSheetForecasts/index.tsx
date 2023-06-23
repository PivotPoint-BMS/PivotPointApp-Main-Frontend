/* eslint-disable quotes */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react'
import { BusinessPlan } from 'types'
import useTranslate from 'hooks/useTranslate'
import { Card, CardContent, CardHeader } from 'components'
import Table from './Table'

export default function index({
  data,
  years,
}: {
  data: BusinessPlan['balanceSheetForecasts']
  years: number[]
}) {
  const { t } = useTranslate()
  const [columns, setColumns] = useState<
    {
      id: string
      label: number | string
      accessor: string
      align: string
      enableRowSpan?: boolean
    }[]
  >([])
  const [tableData, setTableData] = useState<{ [key: string]: number | string }[]>([])

  useEffect(() => {
    setColumns([
      {
        id: 'label',
        label: '',
        accessor: 'label',
        align: 'left',
      },
    ])

    for (let i = 0; i < years.length; i++) {
      const column = {
        id: i.toString(),
        label: years[i],
        accessor: i.toString(),
        align: 'right',
      }

      setColumns((prev) => [...prev, { ...column }])
    }
  }, [years])

  useEffect(() => {
    data.forEach((item, year) => {
      Object.keys(item).forEach((key, i) => {
        setTableData((prev) => {
          const element = prev.find((e) => e.index === i)
          if (element) element[year.toString()] = Number(item[key])
          else prev.push({ index: i, label: key, [year.toString()]: Number(item[key]) })
          return prev
        })
      })
    })
  }, [years])

  return (
    <Card fullWidth>
      <CardHeader
        title={t('Balance Sheet Forecasts')}
        className='!pb-2'
        subheader={t(
          " A balance sheet forecasts table provides a projected snapshot of an organization's assets, liabilities, and equity over a specific period, offering insights into its financial position and potential future performance."
        )}
      />
      <CardContent>
        <Table columns={columns} data={tableData} />
      </CardContent>
    </Card>
  )
}
