import React, { useEffect, useState } from 'react'
import { min } from 'lodash'
import clsx from 'clsx'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// redux
import { wrapper } from 'store'
import {
  getLeadSources,
  getRunningQueriesThunk,
  invalidateTags,
  useDeleteLeadSourceMutation,
  useGetLeadSourcesQuery,
} from 'store/api/crm/contact-leads/leadSourceApi'
// types
import { LeadSource } from 'types/Lead'
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
import { Icon } from '@iconify/react'
import {
  LoadingIndicator,
  TextField,
  IconButton,
  Tooltip,
  Backdrop,
  Dialog,
  AlertDialog,
  IndeterminateCheckbox,
  Select as MySelect,
} from 'components'
// sections
import LeadSourceTableToolbar from './LeadSourceTableToolbar'
import CreateEditLeadSourceForm from '../create/CreateEditLeadSourceForm'

export default function LeadSourcesList({
  openAddDialog,
  setOpenAddDialog,
}: {
  openAddDialog: boolean
  setOpenAddDialog: (value: boolean) => void
}) {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [sorting, setSorting] = React.useState<SortingState>([])

  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [leadSourceToEdit, setLeadSourceToEdit] = useState<LeadSource | null>(null)
  const [idToDelete, setIdToDelete] = useState<string | null>(null)
  // Pogination
  const [PageNumber, setPageNumber] = useState(1)
  const [PageSize, setPageSize] = useState(10)
  // Filters
  const [searchValue, setSearchValue] = useState('')
  // Query Params
  const [SearchTerm, setSearchTerm] = useState<string | undefined>(undefined)
  const { data, isLoading, isFetching } = useGetLeadSourcesQuery(
    { PageNumber, PageSize, SearchTerm },
    { refetchOnFocus: true, refetchOnMountOrArgChange: true }
  )

  const [deleteLeadSource, { isLoading: isDeleteLeading, isSuccess, isError }] =
    useDeleteLeadSourceMutation()

  const columnHelper = createColumnHelper<LeadSource>()
  const columns = [
    columnHelper.accessor('id', {
      id: 'select',
      enableSorting: false,
      size: 24,
      header: ({ table }) => (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      ),
    }),
    columnHelper.accessor('source', {
      id: 'source',
      header: () => t('Source'),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('sourceLink', {
      id: 'sourceLink',
      header: () => t('Source Link'),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row, {
      id: 'actions ',
      enableSorting: false,
      size: 50,
      header: () => <p className='w-full text-right'>{t('Actions')}</p>,
      cell: (leadSource) => (
        <div className='flex items-center justify-end gap-2'>
          <Tooltip title={t('Delete')} side='bottom'>
            <IconButton onClick={() => setIdToDelete(leadSource.getValue().id || '')}>
              <Icon
                className='text-red-600 dark:text-red-400'
                icon='material-symbols:delete-rounded'
                height={20}
              />
            </IconButton>
          </Tooltip>

          <Tooltip title={t('Edit')} side='bottom'>
            <IconButton
              onClick={() => {
                setLeadSourceToEdit(leadSource.row.original)
                setOpenEditDialog(true)
              }}
            >
              <Icon icon='material-symbols:edit' height={20} />
            </IconButton>
          </Tooltip>
        </div>
      ),
    }),
  ]

  useEffect(() => {
    if (isError) {
      open({
        message: t('A problem has occured.'),
        autoHideDuration: 4000,
        type: 'error',
        variant: 'contained',
      })
    }
    if (isSuccess) {
      open({
        message: t('Lead Source Deleted Successfully.'),
        autoHideDuration: 4000,
        type: 'success',
        variant: 'contained',
      })
    }
  }, [isError, isSuccess])

  const table = useReactTable({
    defaultColumn: {
      minSize: 0,
      size: 0,
    },
    data: data?.data || [],
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

  useEffect(() => {
    setSelectedIds(
      data?.data
        .filter((item) => item.id && Object.keys(rowSelection).includes(item.id))
        .map((item) => item.id || '') || []
    )
  }, [rowSelection])

  return (
    <>
      <div className='p-3 '>
        <TextField
          placeholder={t('Search...')}
          endAdornment={
            <IconButton onClick={() => setSearchTerm(searchValue)}>
              <Icon icon='ion:search-outline' height={18} className='text-gray-500' />
            </IconButton>
          }
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className='flex h-full'
          onKeyDown={(e) => {
            if (e.key === 'Enter') setSearchTerm(e.currentTarget.value)
          }}
        />
      </div>

      {isLoading || isFetching ? (
        <div className='flex h-56 w-full items-center justify-center'>
          <LoadingIndicator />
        </div>
      ) : (
        <>
          {data?.data && data?.data.length > 0 ? (
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
                  <div className='flex w-max min-w-full items-center justify-end divide-x border-t p-4 rtl:divide-x-reverse dark:divide-gray-600 dark:border-gray-600'>
                    <div className='flex items-center justify-center gap-2 px-2'>
                      <p className='text-sm'>{t('Row per page : ')}</p>
                      <MySelect
                        items={['10', '25', '50'].map((item) => ({ label: item, value: item }))}
                        onValueChange={(page) => setPageSize(Number(page))}
                        value={String(PageSize)}
                        buttonProps={{ intent: 'default' }}
                      />
                    </div>
                    <div className='flex h-full items-center justify-center gap-2 p-2 '>
                      <p className='text-sm'>
                        {(data.pageNumber - 1) * (data.pageSize + 1) === 0
                          ? 1
                          : (data.pageNumber - 1) * (data.pageSize + 1)}{' '}
                        - {min([data.pageNumber * data.pageSize, data.totalRecords])} {t('of')}{' '}
                        {data.totalRecords}
                      </p>
                    </div>
                    <div className='flex items-center justify-center gap-2 px-2'>
                      <Tooltip side='bottom' title={t('First page')}>
                        <IconButton
                          className='border dark:border-gray-600'
                          onClick={() => setPageNumber(1)}
                          disabled={PageNumber === 1}
                        >
                          <Icon
                            icon='fluent:chevron-double-left-20-filled'
                            className='rtl:rotate-180'
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip side='bottom' title={t('Previous page')}>
                        <IconButton
                          className='border dark:border-gray-600'
                          onClick={() => setPageNumber((prev) => (prev > 1 ? prev - 1 : 1))}
                          disabled={PageNumber === 1}
                        >
                          <Icon icon='fluent:chevron-left-20-filled' className='rtl:rotate-180' />
                        </IconButton>
                      </Tooltip>
                      <p className='text-sm'>
                        {t('Page')} {PageNumber} {t('of')} {data.totalPages}
                      </p>
                      <Tooltip side='bottom' title={t('Next page')}>
                        <IconButton
                          className='border dark:border-gray-600'
                          onClick={() =>
                            setPageNumber((prev) =>
                              prev < data.totalPages ? prev + 1 : data.totalPages
                            )
                          }
                          disabled={PageNumber === data.totalPages}
                        >
                          <Icon icon='fluent:chevron-right-20-filled' className='rtl:rotate-180' />
                        </IconButton>
                      </Tooltip>
                      <Tooltip side='bottom' title={t('Last page')}>
                        <IconButton
                          className='border dark:border-gray-600'
                          onClick={() => setPageNumber(data.totalPages)}
                          disabled={PageNumber === data.totalPages}
                        >
                          <Icon
                            icon='fluent:chevron-double-right-20-filled'
                            className='rtl:rotate-180'
                          />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className='flex h-56 flex-col items-center justify-center gap-2 px-4 py-2'>
              <h1 className='text-xl font-semibold'>{t('No Lead Found')}</h1>
            </div>
          )}
        </>
      )}
      <LeadSourceTableToolbar
        selectedCount={Object.keys(rowSelection).length}
        selectedIds={selectedIds}
        setRowSelection={setRowSelection}
      />
      <Backdrop loading={isDeleteLeading} />
      <Dialog
        open={openEditDialog || openAddDialog}
        title={openEditDialog ? t('Edit Lead Source') : t('Add Lead Source')}
      >
        <CreateEditLeadSourceForm
          isEdit={openEditDialog}
          currentLeadSource={leadSourceToEdit}
          onSuccess={() => {
            setOpenAddDialog(false)
            setOpenEditDialog(false)
          }}
          onFailure={() => {
            setOpenAddDialog(false)
            setOpenEditDialog(false)
          }}
        />
      </Dialog>
      <AlertDialog
        title={t('Confirm Delete')}
        description={t(
          'This action cannot be undone. This will permanently delete this lead source.'
        )}
        cancelText={t('Cancel')}
        confirmText={t('Yes, Delete')}
        onConfirm={() => {
          deleteLeadSource(idToDelete || '')
          invalidateTags(['LeadSources'])
          setIdToDelete(null)
        }}
        open={idToDelete !== null}
        onClose={() => setIdToDelete(null)}
        buttonProps={{ intent: 'error' }}
      />
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  store.dispatch(getLeadSources.initiate({ PageNumber: 0, PageSize: 10 }))

  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})
