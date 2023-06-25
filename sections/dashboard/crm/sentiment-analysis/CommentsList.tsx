/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react'
import clsx from 'clsx'
// next
// hooks
import useTranslate from 'hooks/useTranslate'
//
// components
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  RowSelectionState,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table'
import { LoadingIndicator, Badge } from 'components'
import { Icon } from '@iconify/react'
import { useGetReviewsQuery } from 'store/api/external-api/reviewsAPIs'

export default function CommentsList() {
  const { t } = useTranslate()
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [sorting, setSorting] = React.useState<SortingState>([])

  // Queries
  const { data, isLoading, isSuccess, isFetching } = useGetReviewsQuery()

  const columnHelper = createColumnHelper<{ review: string; sentiment: string }>()

  const columns = [
    columnHelper.accessor('review', {
      id: 'review',
      header: () => t('Review'),
      cell: (info) => <p className='truncate'>{info.getValue()}</p>,
    }),

    columnHelper.accessor('sentiment', {
      id: 'sentiment ',
      header: () => t('Sentiment'),
      cell: (sentiment) => {
        if (sentiment.getValue() === 'positive')
          return <Badge variant='ghost' intent='success' size='small' label={t('Positive')} />
        if (sentiment.getValue() === 'negative')
          return <Badge variant='ghost' intent='error' size='small' label={t('Negative')} />

        return <Badge variant='ghost' intent='success' size='small' label={t('Positive')} />
      },
    }),
  ]

  const table = useReactTable({
    defaultColumn: {
      minSize: 0,
      size: 0,
    },
    data: [...(data?.positive || []), ...(data?.negative || [])] || [],
    columns,
    state: {
      rowSelection,
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <>
      {isLoading || isFetching ? (
        <div className='flex h-56 w-full items-center justify-center'>
          <LoadingIndicator />
        </div>
      ) : (
        <>
          {isSuccess && [...data.positive, ...data.negative].length > 0 ? (
            <>
              <div className='w-full overflow-x-scroll'>
                <div className='w-max min-w-full'>
                  <table className='w-full'>
                    <thead className='bg-gray-100 ltr:text-left rtl:text-right dark:!bg-paper-dark-contrast dark:text-white'>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className='border-none text-sm'>
                          {headerGroup.headers.map((header) => (
                            <th
                              key={header.id}
                              className='whitespace-nowrap p-4 text-sm font-semibold'
                              style={{
                                width: header.getSize() !== 0 ? header.getSize() : undefined,
                              }}
                            >
                              {header.isPlaceholder ? null : (
                                <div
                                  {...{
                                    className: header.column.getCanSort()
                                      ? 'cursor-pointer select-none flex items-center gap-2'
                                      : '',
                                    onClick: header.column.getToggleSortingHandler(),
                                  }}
                                >
                                  {flexRender(header.column.columnDef.header, header.getContext())}
                                  {{
                                    asc: (
                                      <Icon
                                        icon='material-symbols:arrow-drop-up-rounded'
                                        fontSize={24}
                                      />
                                    ),
                                    desc: (
                                      <Icon
                                        icon='material-symbols:arrow-drop-down-rounded'
                                        fontSize={24}
                                      />
                                    ),
                                  }[header.column.getIsSorted() as string] ?? null}
                                </div>
                              )}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody>
                      {table.getRowModel().rows.map((row) => (
                        <tr
                          key={row.id}
                          className={clsx(
                            'cursor-pointer border-b last-of-type:border-b-0 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-paper-hover-dark',
                            row.getIsSelected() && 'bg-gray-50 dark:bg-paper-hover-dark/80'
                          )}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <td
                              key={cell.id}
                              className='px-4 py-2'
                              style={{
                                width:
                                  cell.column.getSize() !== 0 ? cell.column.getSize() : undefined,
                              }}
                            >
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className='flex h-56 flex-col items-center justify-center gap-2 px-4 py-2'>
              <h1 className='text-xl font-semibold'>{t('No Comment Found')}</h1>
            </div>
          )}
        </>
      )}
    </>
  )
}
