import React, { useEffect, useMemo } from 'react'
import { useTable, useFlexLayout, useResizeColumns, useSortBy } from 'react-table'
import Button from 'components/Button'
import useTranslate from 'hooks/useTranslate'
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
  const sortTypes = useMemo(
    () => ({
      alphanumericFalsyLast(rowA, rowB, columnId, desc) {
        if (!rowA.values[columnId] && !rowB.values[columnId]) {
          return 0
        }

        if (!rowA.values[columnId]) {
          return desc ? -1 : 1
        }

        if (!rowB.values[columnId]) {
          return desc ? 1 : -1
        }

        return Number.isNaN(rowA.values[columnId])
          ? rowA.values[columnId].localeCompare(rowB.values[columnId])
          : rowA.values[columnId] - rowB.values[columnId]
      },
    }),
    []
  )

  useEffect(() => {
    console.log(data.slice(data.length - 2, data.length))
    if (
      data.length >= 2 &&
      data
        .slice(data.length - 2, data.length)
        .every((cell) => cell.Am === '' && cell.NOFC === '' && cell.Prc === '')
    )
      dataDispatch({ type: 'delete_last_cell' })
  }, [data])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn,
      dataDispatch,
      autoResetSortBy: true,
      autoResetFilters: true,
      autoResetRowState: true,
      sortTypes,
    },
    useFlexLayout,
    useResizeColumns,
    useSortBy
  )

  return (
    <>
      <div className='flex w-full justify-center overflow-x-scroll'>
        <div className='container min-w-fit max-w-5xl rounded-lg border border-b-0'>
          <table {...getTableProps()} className='w-full'>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} className='divide-x'>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className='border-b bg-gray-100 dark:bg-paper-dark'
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
                    key={`table-row-${i}`}
                    className='divide-x border-b last-of-type:border-b-0'
                  >
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
          <Button
            variant='outlined'
            startIcon={<Icon icon='ic:round-add' />}
            intent='default'
            className='w-full !justify-start rounded-t-none'
            onClick={() => dataDispatch({ type: 'add_row' })}
          >
            {t('New Row')}
          </Button>
        </div>
      </div>
    </>
  )
}
