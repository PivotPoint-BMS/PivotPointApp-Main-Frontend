import React, { useMemo } from 'react'
// react table
import { useTable, useFlexLayout, useResizeColumns, useSortBy } from 'react-table'
// utils
import { fCurrency } from 'utils/formatNumber'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
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

export default function Table({ columns, data, isFinancement }) {
  const { t } = useTranslate()

  const total = useMemo(
    () => data.reduce((partialSum, a) => partialSum + (parseInt(a.amount, 10) || 0), 0),
    [data, columns]
  )
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetSortBy: true,
      autoResetFilters: true,
      autoResetRowState: true,
    },
    useFlexLayout,
    useResizeColumns,
    useSortBy
  )

  return (
    <>
      <div className='flex w-full justify-center'>
        <div className='container w-full border  dark:border-gray-600'>
          <table {...getTableProps()} className='w-full'>
            <thead>
              {headerGroups.map((headerGroup, i) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className='divide-x rtl:divide-x-reverse dark:divide-gray-600'
                  key={`table-head-row-${i}`}
                >
                  {headerGroup.headers.map((column, index) => (
                    <th
                      {...column.getHeaderProps()}
                      className='border-b bg-gray-100 dark:border-gray-600 dark:bg-paper-dark'
                      key={`table-header-cell-${index}`}
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, index) => {
                prepareRow(row)
                return (
                  <tr
                    {...row.getRowProps()}
                    key={`table-body-row-${index}`}
                    className='divide-x border-b last-of-type:border-b-0 rtl:divide-x-reverse dark:divide-gray-600 dark:border-gray-600'
                  >
                    {row.cells.map((cell, i) => (
                      <td {...cell.getCellProps()} key={`table-cell-${i}`}>
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                )
              })}
              <tr className='flex divide-x border-b bg-primary-100/40  last-of-type:border-b-0 rtl:divide-x-reverse dark:divide-gray-600 dark:bg-primary-900 '>
                <td className='flex-1 p-2 px-5 font-medium ltr:text-left rtl:text-right'>
                  {isFinancement ? t('Total Passive') : t('Total Active')}
                </td>
                {
                  <td className='flex-1 p-2 px-5 font-medium ltr:text-right rtl:text-left'>
                    {fCurrency(total)} {t('Da')}
                  </td>
                }
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
