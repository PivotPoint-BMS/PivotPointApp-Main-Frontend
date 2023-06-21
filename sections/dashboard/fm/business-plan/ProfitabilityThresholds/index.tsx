/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react'
import { sentenceCase } from 'text-case'
import { BusinessPlan } from 'types'
import useTranslate from 'hooks/useTranslate'
import { Card, CardContent, CardHeader } from 'components'
import Table from './Table'

export default function index({
  data,
  years,
}: {
  data: BusinessPlan['profitabilityThresholds']
  years: number[]
}) {
  const { t } = useTranslate()
  const [columns, setColumns] = useState<
    {
      id: string
      label: number | string
      accessor: string
      align: string
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
          else
            prev.push({
              index: i,
              label: key !== 'neutral' ? sentenceCase(key) : 'SR/CA * 12',
              [year.toString()]: Number(item[key]),
            })
          return prev
        })
      })
    })
  }, [years])

  return (
    <Card fullWidth>
      <CardHeader
        title={t('Profitability Thresholds')}
        className='!pb-2'
        subheader={t(
          'A profitability thresholds table presents the minimum levels of profitability that need to be achieved in order to ensure financial viability and success of the business.'
        )}
      />
      <CardContent>
        <Table columns={columns} data={tableData} />
      </CardContent>
    </Card>
  )
}
