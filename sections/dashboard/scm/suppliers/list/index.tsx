/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react'
import { min } from 'lodash'
import clsx from 'clsx'
// next
import { useRouter } from 'next/router'
import Link from 'next/link'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// config
import { PATH_DASHBOARD } from 'routes/paths'
// redux
import { wrapper } from 'store'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { previewSupplier } from 'store/slices/supplierPreviewSlice'
import {
  getRunningQueriesThunk,
  getSuppliers,
  useDeleteSupplierMutation,
  useGetSuppliersQuery,
} from 'store/api/scm/products-service/suppliersApis'
import { changePageNumber, changePageSize } from 'store/slices/pagginationSlice'
// types
import { Supplier } from 'types'
// components
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  RowSelectionState,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table'
import {
  AlertDialog,
  Backdrop,
  LoadingIndicator,
  IconButton,
  TextField,
  DropdownMenu,
  Tooltip,
  Select as MySelect,
  Dialog,
} from 'components'
import { Icon, Icon as Iconify } from '@iconify/react'
import SupplierTableToolbar from './SuppliersTableToolbar'
import SupplierPreview from './SupplierPreview'
import CreateSupplierForm from '../create/CreateSupplierForm'

export default function SuppliersList({
  openAddDialog,
  setOpenAddDialog,
}: {
  openAddDialog: boolean
  setOpenAddDialog: (value: boolean) => void
}) {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const dispatch = useAppDispatch()
  const { isFallback } = useRouter()
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [idToDelete, setIdToDelete] = useState<string | null>(null)
  // Pogination
  const { PageSize, PageNumber } = useAppSelector((state) => state.paggination)
  // Filters
  const [searchValue, setSearchValue] = useState('')
  // Query Params
  const [SearchTerm, setSearchTerm] = useState<string | undefined>(undefined)

  // Queries
  const { data, isLoading, isSuccess, isFetching } = useGetSuppliersQuery(
    { SearchTerm, PageNumber, PageSize },
    { skip: isFallback, refetchOnMountOrArgChange: true }
  )

  // Mutation
  const [
    deleteSupplier,
    { isLoading: isDeleteSupplier, isError: isDeleteError, isSuccess: isDeleteSuccess },
  ] = useDeleteSupplierMutation()

  const columnHelper = createColumnHelper<Supplier>()

  const columns = [
    columnHelper.accessor('name', {
      id: 'name',
      header: () => t('Full Name'),
      cell: (info) => <p>{info.getValue()}</p>,
    }),
    columnHelper.accessor((row) => ({ email: row.email, phoneNumber: row.phoneNumber }), {
      id: 'contact',
      header: () => t('Contact'),
      cell: (info) => (
        <div className='flex flex-col gap-2'>
          <p className='hyphens  flex items-center gap-1 truncate text-sm'>
            <Iconify icon='material-symbols:mail-rounded' height={18} className='text-gray-500' />{' '}
            {info.getValue().email}{' '}
          </p>
          <p className='flex items-center gap-1 truncate text-sm'>
            <Iconify icon='material-symbols:call' height={18} className='text-gray-500' />{' '}
            {info.getValue().phoneNumber}{' '}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor('address', {
      id: 'address',
      header: () => t('Address'),
      cell: (info) => (
        <p className='hyphens  flex items-center gap-1 truncate text-sm'>
          <Iconify icon='mdi:location' height={18} className='text-gray-500' /> {info.getValue()}{' '}
        </p>
      ),
    }),
    columnHelper.accessor((row) => row, {
      id: 'actions ',
      size: 50,
      enableSorting: false,
      header: () => <p className='w-full text-right'>{t('Actions')}</p>,
      cell: (supplier) => (
        <div className='flex items-center justify-end gap-2'>
          <Tooltip title={t('View Full Details')}>
            <Link href={PATH_DASHBOARD.scm.supplier(supplier.getValue().id || '')}>
              <IconButton>
                <Iconify icon='mingcute:external-link-fill' height={18} />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title={t('Preview')} side='bottom'>
            <IconButton onClick={() => dispatch(previewSupplier(supplier.getValue()))}>
              <Iconify icon='material-symbols:preview' height={18} />
            </IconButton>
          </Tooltip>
          <DropdownMenu
            trigger={
              <IconButton>
                <Tooltip title={t('More')} side='bottom' sideOffset={10}>
                  <Iconify icon='material-symbols:more-vert' height={20} />
                </Tooltip>
              </IconButton>
            }
            items={[
              {
                type: 'button',
                label: t('Edit'),
                icon: <Iconify icon='material-symbols:edit' height={18} />,
                // onClick: () => push(PATH_DASHBOARD.crm['suppliers-suppliers'].edit(supplier.getValue().id)),
              },
              {
                type: 'button',
                label: t('Delete'),
                icon: <Iconify icon='ic:round-delete' height={18} />,
                className: 'text-red-600 dark:text-red-400 rtl:flex-row-reverse',
                onClick: () => setIdToDelete(supplier.getValue().id),
              },
            ]}
          />
        </div>
      ),
    }),
  ]

  useEffect(() => {
    if (isDeleteError) {
      open({
        message: t('A problem has occured.'),
        autoHideDuration: 4000,
        type: 'error',
        variant: 'contained',
      })
    }
    if (isDeleteSuccess) {
      open({
        message: t('Supplier Deleted Successfully.'),
        autoHideDuration: 4000,
        type: 'success',
        variant: 'contained',
      })
    }
  }, [isDeleteError, isDeleteSuccess])

  useEffect(() => {
    if (isSuccess) dispatch(changePageSize(data.pageSize))
  }, [isLoading, isFetching])

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
        .map((supplier, i) => (Object.keys(rowSelection).includes(i.toString()) ? supplier.id : ''))
        .filter((item) => item !== '') || []
    )
  }, [rowSelection])

  return (
    <>
      {' '}
      <div className='p-3 '>
        <TextField
          placeholder={t('Search...')}
          endAdornment={
            <IconButton onClick={() => setSearchTerm(searchValue === '' ? undefined : searchValue)}>
              <Iconify icon='ion:search-outline' height={18} className='text-gray-500' />
            </IconButton>
          }
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className='flex h-full'
          onKeyDown={(e) => {
            if (e.key === 'Enter')
              setSearchTerm(e.currentTarget.value === '' ? undefined : e.currentTarget.value)
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
                          onDoubleClick={() => dispatch(previewSupplier(row.original))}
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
                  <div className='flex w-full items-center justify-end divide-x border-t p-4 rtl:divide-x-reverse dark:divide-gray-600 dark:border-gray-600'>
                    <div className='flex items-center justify-center gap-2 px-2'>
                      <p className='text-sm'>{t('Row per page : ')}</p>
                      <MySelect
                        items={['10', '25', '50'].map((item) => ({ label: item, value: item }))}
                        onValueChange={(page) => dispatch(changePageSize(Number(page)))}
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
                          onClick={() => dispatch(changePageNumber(1))}
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
                          onClick={() =>
                            dispatch(changePageNumber(PageNumber > 1 ? PageNumber - 1 : 1))
                          }
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
                            dispatch(
                              changePageNumber(
                                PageNumber < data.totalPages ? PageNumber + 1 : data.totalPages
                              )
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
                          onClick={() => dispatch(changePageNumber(data.totalPages))}
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
                  <SupplierTableToolbar
                    selectedCount={Object.keys(rowSelection).length}
                    selectedIds={selectedIds}
                    setRowSelection={setRowSelection}
                  />
                  <SupplierPreview />
                </div>
              </div>
            </>
          ) : (
            <div className='flex h-56 flex-col items-center justify-center gap-2 px-4 py-2'>
              <h1 className='text-xl font-semibold'>{t('No Supplier Found')}</h1>
            </div>
          )}
        </>
      )}
      <Backdrop loading={isDeleteSupplier} />
      <Dialog open={openAddDialog} title={t('Add Supplier')}>
        <CreateSupplierForm
          onSuccess={() => {
            setOpenAddDialog(false)
          }}
          onFailure={() => {
            setOpenAddDialog(false)
          }}
        />
      </Dialog>
      <AlertDialog
        title={t('Confirm Delete')}
        description={t('This action cannot be undone. This will permanently delete this supplier.')}
        cancelText={t('Cancel')}
        confirmText={t('Yes, Delete')}
        onConfirm={() => {
          deleteSupplier({ id: idToDelete || '', PageNumber, PageSize })
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
  if (store.getState().session.token)
    store.dispatch(getSuppliers.initiate({ PageSize: 10, PageNumber: 1 }))

  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})
