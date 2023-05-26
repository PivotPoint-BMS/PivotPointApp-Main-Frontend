/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react'
// react table
import { useTable, useFlexLayout, useResizeColumns, useSortBy } from 'react-table'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import { Icon } from '@iconify/react'
import Button from 'components/Button'
import Tooltip from 'components/Tooltip'
import IconButton from 'components/IconButton'
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
    <>
      <div className='flex w-full flex-1 justify-center overflow-x-scroll'>
        <div className='container h-fit min-w-fit max-w-full rounded-lg border border-b-0'>
          <table {...getTableProps()} className='w-full'>
            <thead className='overflow-x-scroll'>
              {headerGroups.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className='divide-x rtl:divide-x-reverse'
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className='border-b bg-gray-100 dark:bg-paper-dark'
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                  <th className='h-[43px] w-[51px] border-b bg-gray-100 dark:bg-paper-dark'></th>
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
                    className='divide-x border-b last-of-type:border-b-0 rtl:divide-x-reverse'
                  >
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                    <td>
                      <div className='box-border h-full w-full resize-none truncate whitespace-nowrap border-0 bg-transparent p-2 text-right'>
                        <Tooltip title={t('Delete')} align='center' side='bottom'>
                          <IconButton
                            onClick={() => {
                              dataDispatch({ type: 'delete_row', rowIndex: i })
                            }}
                          >
                            <Icon icon='ic:delete' className='text-red-600 dark:text-red-400' />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <Button
            variant='outlined'
            startIcon={<Icon icon='ic:round-add' />}
            intent='default'
            className='w-full !justify-start rounded-t-none '
            onClick={() => dataDispatch({ type: 'add_row' })}
          >
            {t('New Subsription')}
          </Button>
        </div>
      </div>
    </>
  )
}
