/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
// react table
import { useTable, useFlexLayout, useResizeColumns, useSortBy } from "react-table"
// components
import Cell from "./Cell"
import Header from "./Header"

const defaultColumn = {
  minWidth: 50,
  width: 150,
  maxWidth: 400,
  Cell,
  Header,
  sortType: "alphanumericFalsyLast",
}

export default function Table({ columns, data, dispatch: dataDispatch }) {
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

  return (
    <div className='w-full flex-1 overflow-visible'>
      <div className='flex w-full justify-center overflow-x-scroll'>
        <div className='container min-w-fit max-w-full rounded border'>
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
                      {column.render("Header")}
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
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
