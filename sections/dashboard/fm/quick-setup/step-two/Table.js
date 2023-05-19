/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react'
// react table
import { useTable, useFlexLayout, useResizeColumns, useSortBy } from 'react-table'
// hooks
import useTranslate from 'hooks/useTranslate'
// utils
import { fCurrency } from 'utils/formatNumber'
// components
import Button from 'components/Button'
import { Icon } from '@iconify/react'
import Cell from './Cell'
import Header from './Header'

const defaultColumn = {
  minWidth: 50,
  width: 150,
  maxWidth: 400,
  Cell,
  Header,
  sortType: 'alphanumericFalsyLast',
}

export default function Table({ columns, data, dispatch: dataDispatch }) {
  // : {
  // columns: {
  //   id: string
  //   label: string
  //   accessor: string
  //   dataType: string
  //   placeholder: string
  // }[]
  // data: {
  //   [key: string]: string
  //   service: string
  // }[]
  // dispatch: (params: { type: string; action?: any }) => void
  // }
  const { t } = useTranslate()
  const yearTotal = useMemo(
    () =>
      columns.slice(1, columns.length).map((column) => {
        if (column.id !== 'service')
          return data.reduce(
            (partialSum, a) => partialSum + (parseInt(a[column.accessor], 10) || 0),
            0
          )
        return 0
      }),
    [data, columns]
  )
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn,
      dataDispatch,
      autoResetSortBy: true,
      autoResetFilters: true,
      autoResetRowState: true,
    },
    useFlexLayout,
    useResizeColumns,
    useSortBy
  )

  // useEffect(() => {
  //   console.log(data)
  // }, [data, columns])

  return (
    <>
      <div className='flex w-full justify-center overflow-x-scroll'>
        <div className='container min-w-fit max-w-full rounded-lg rounded-r-none border border-b-0'>
          <table {...getTableProps()} className='w-full'>
            <thead className='overflow-x-scroll'>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} className='divide-x'>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} className='border-b bg-gray-100'>
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row)
                return (
                  <tr
                    {...row.getRowProps()}
                    key={`table-row-${i}`}
                    className='divide-x border-b last-of-type:border-b-0'
                  >
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                )
              })}
              <tr className='flex divide-x border-b bg-gray-100 last-of-type:border-b-0 dark:bg-paper-dark-contrast'>
                <td className='text flex-1 p-2 px-5 text-center font-medium'>
                  {t('Total HT Annual')}
                </td>
                {yearTotal.map((total) => (
                  <td className='flex-1 p-2 px-5  text-right font-medium'>{fCurrency(total)}</td>
                ))}
              </tr>
            </tbody>
          </table>
          <Button
            variant='outlined'
            startIcon={<Icon icon='ic:round-add' />}
            intent='default'
            className='w-full !justify-start rounded-t-none rounded-r-none '
            onClick={() => dataDispatch({ type: 'add_row' })}
          >
            {t('New Row')}
          </Button>
        </div>
        <Button
          variant='outlined'
          intent='default'
          className='rounded-l-none'
          onClick={() => dataDispatch({ type: 'add_year' })}
        >
          <Icon icon='ic:round-add' />
        </Button>
      </div>
    </>
  )
}
