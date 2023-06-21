import React from 'react'
// react table
import { useTable, useFlexLayout, useResizeColumns, useSortBy } from 'react-table'
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

export default function Table({ columns, data }) {
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
      <div className='flex w-full justify-center overflow-x-auto'>
        <div className='w-fit min-w-full'>
          <table {...getTableProps()} className='w-full border dark:border-gray-600'>
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
              {rows.slice(0, -2).map((row, index) => {
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
              {rows.slice(-2, -1).map((row, index) => {
                prepareRow(row)
                return (
                  <tr
                    {...row.getRowProps()}
                    key={`table-body-row-${index}`}
                    className='mt-4 divide-x border-b border-t bg-gray-100 last-of-type:border-b-0 rtl:divide-x-reverse dark:divide-gray-600 dark:border-gray-600 dark:bg-paper-dark-contrast'
                  >
                    {row.cells.map((cell, i) => (
                      <td {...cell.getCellProps()} key={`table-cell-${i}`}>
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                )
              })}
              {rows.slice(-1).map((row, index) => {
                prepareRow(row)
                return (
                  <tr
                    {...row.getRowProps()}
                    key={`table-body-row-${index}`}
                    className='mt-4 divide-x border-b border-t bg-gray-100 last-of-type:border-b-0 rtl:divide-x-reverse dark:divide-gray-600 dark:border-gray-600 dark:bg-paper-dark-contrast'
                  >
                    {row.cells.map((cell, i) => (
                      <td {...cell.getCellProps()} key={`table-cell-${i}`}>
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
