/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo } from 'react'
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
  const { t } = useTranslate()
  const yearTotal = useMemo(
    () =>
      columns.slice(1, -1).map((column) => {
        if (column.id !== 'inventory')
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

  useEffect(() => {
    if (
      data.length >= 2 &&
      data
        .slice(data.length - 2, data.length)
        .every((cell) => Object.keys(cell).every((key) => cell[key] === ''))
    )
      dataDispatch({ type: 'delete_last_cell' })
  }, [data])

  return (
    <div className='w-full flex-1 overflow-visible'>
      <div className='flex w-full justify-center overflow-x-scroll'>
        <div className='container min-w-fit max-w-full rounded-lg border border-b-0'>
          <table {...getTableProps()} className='w-full'>
            <thead className='overflow-x-scroll'>
              {headerGroups.map((headerGroup, i) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className='divide-x rtl:divide-x-reverse'
                  key={`table-head-row-${i}`}
                >
                  {headerGroup.headers.map((column, index) => (
                    <th
                      {...column.getHeaderProps()}
                      className='border-b bg-gray-100 dark:bg-paper-dark'
                      key={`table-head-cell-${index}`}
                    >
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
                    key={`table-body-row-${i}`}
                    className='divide-x border-b last-of-type:border-b-0 rtl:divide-x-reverse'
                  >
                    {row.cells.map((cell, index) => (
                      <td {...cell.getCellProps()} key={`table-row-cell-${index}`}>
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                )
              })}
              <tr className='flex divide-x border-b bg-primary-100/40 last-of-type:border-b-0 rtl:divide-x-reverse dark:bg-primary-900'>
                <td className='text flex-1 p-2 px-5 text-center font-medium ltr:text-left rtl:text-right'>
                  {t('Total')}
                </td>
                {yearTotal.map((total) => (
                  <td className='flex-1 p-2 px-5 font-medium ltr:text-right rtl:text-left'>
                    {fCurrency(total)}
                  </td>
                ))}
                <td className='text flex-1 p-2 px-5 text-center font-medium ltr:text-left rtl:text-right'>
                  -
                </td>
              </tr>
            </tbody>
          </table>
          <Button
            variant='outlined'
            startIcon={<Icon icon='ic:round-add' />}
            intent='default'
            className='w-full !justify-start rounded-t-none '
            onClick={() => dataDispatch({ type: 'add_row' })}
          >
            {t('New Row')}
          </Button>
        </div>
      </div>
    </div>
  )
}
