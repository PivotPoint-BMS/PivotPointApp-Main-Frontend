/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
// next
import Link from 'next/link'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// api
import { useGetAllProductsQuery } from 'store/api/scm/products-service/productsApi'
import {
  useAppSupplierProductMutation,
  useDeleteSupplierProductMutation,
} from 'store/api/scm/products-service/suppliersApis'
// types
import { Supplier } from 'types'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
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
import { Icon, Icon as Iconify } from '@iconify/react'
import {
  AlertDialog,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  LoadingIndicator,
  TextField,
  Backdrop,
} from 'components'

export default function SupplierProductsList({
  id,
  itemsList,
}: {
  id: string
  itemsList: Supplier['supplierItems']
}) {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [idToDelete, setIdToDelete] = useState<string | null>(null)
  const [openAddProductDialog, setOpenAddProductDialog] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<{
    id: string
    name: string
    type: number
  } | null>(null)

  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)
  const [searchValue, setSearchValue] = useState('')
  const [cost, setCost] = useState('')

  // Queries
  const {
    data,
    isLoading: isProductsLoading,
    isSuccess: isProductsSuccess,
  } = useGetAllProductsQuery({ searchTerm }, { refetchOnMountOrArgChange: true })

  // Mutation
  const [addSupplierProduct, { isError: isAddProductError, isLoading: isAddProductLoading }] =
    useAppSupplierProductMutation()
  const [
    deleteSupplierProduct,
    { isError: isDeleteProductError, isLoading: isDeleteProductLoading },
  ] = useDeleteSupplierProductMutation()

  const columnHelper = createColumnHelper<{
    cost: number
    id: string
    name: string
    type: number
  }>()

  const columns = [
    columnHelper.accessor('name', {
      id: 'name',
      header: () => t('Name'),
      cell: (info) => <p>{info.getValue()}</p>,
    }),
    columnHelper.accessor('cost', {
      id: 'cost',
      header: () => t('Cost'),
      cell: (info) => <p>{info.getValue()}</p>,
    }),

    columnHelper.accessor('id', {
      id: 'actions ',
      size: 1,
      enableSorting: false,
      header: () => <p className='w-full text-right'>{t('Actions')}</p>,
      cell: (info) => (
        <div className='flex items-center justify-end gap-2'>
          <Tooltip title={t('View Details')} side='bottom'>
            <Link href={PATH_DASHBOARD.scm['product-service'].product(info.getValue())}>
              <IconButton>
                <Iconify icon='mingcute:external-link-fill' height={18} />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title={t('Delete')} side='bottom'>
            <IconButton onClick={() => setIdToDelete(info.getValue())}>
              <Iconify
                icon='ic:round-delete'
                className='text-red-500 dark:text-red-400'
                height={18}
              />
            </IconButton>
          </Tooltip>
        </div>
      ),
    }),
  ]

  const table = useReactTable({
    defaultColumn: {
      minSize: 0,
      size: 0,
    },
    data: itemsList || [],
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
    if (isAddProductError || isDeleteProductError) {
      open({
        message: t('A problem has occured.'),
        autoHideDuration: 4000,
        type: 'error',
        variant: 'contained',
      })
    }
  }, [isAddProductError, isDeleteProductError])

  return (
    <>
      <div className='col-span-2'>
        {itemsList && itemsList.length > 0 ? (
          <>
            <div className='w-full overflow-x-scroll'>
              <div className='w-max min-w-full'>
                <div className='flex w-full gap-2 p-3'>
                  <div className='flex-1'>
                    <TextField placeholder={t('Search...')} />
                  </div>

                  <Button onClick={() => setOpenAddProductDialog(true)}>{t('Add Product')}</Button>
                </div>
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
            <h1 className='text-xl font-semibold'>{t('No Product Found')}</h1>
            <Button onClick={() => setOpenAddProductDialog(true)}>{t('Add Product')}</Button>
          </div>
        )}
      </div>
      <Dialog
        open={openAddProductDialog}
        title={t('Add Product')}
        handleClose={() => setOpenAddProductDialog(false)}
      >
        <div className='flex flex-col items-center  justify-center gap-2 py-2'>
          <TextField
            placeholder={t('Search...')}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter')
                setSearchTerm(e.currentTarget.value === '' ? undefined : e.currentTarget.value)
            }}
            endAdornment={
              <IconButton
                onClick={() => setSearchTerm(searchValue === '' ? undefined : searchValue)}
              >
                <Iconify icon='ion:search-outline' height={18} className='text-gray-500' />
              </IconButton>
            }
          />
          {isProductsLoading ? (
            <LoadingIndicator />
          ) : (
            isProductsSuccess &&
            data.data.map((product) => (
              <div className='flex w-full items-center justify-between rounded-lg border p-4'>
                <div>
                  <p>{product.name}</p>
                  <p className='text-sm text-gray-400 dark:text-gray-600'>
                    {product.type === 1 && t('Product')} {product.type === 2 && t('Service')}
                  </p>
                </div>
                <Button
                  intent={
                    !itemsList.every((item) => item.id !== product.id) ? 'secondary' : 'primary'
                  }
                  startIcon={
                    <Icon
                      icon={
                        !itemsList.every((item) => item.id !== product.id)
                          ? 'ic:round-check'
                          : 'ic:round-add'
                      }
                      height={24}
                    />
                  }
                  variant='text'
                  size='small'
                  onClick={
                    itemsList.every((item) => item.id !== product.id)
                      ? () => setSelectedProduct({ ...product })
                      : () => {}
                  }
                >
                  {!itemsList.every((item) => item.id !== product.id) ? t('Added') : t('Add')}
                </Button>
              </div>
            ))
          )}
        </div>
      </Dialog>
      <Dialog
        open={selectedProduct !== null}
        title={t('Enter Cost')}
        handleClose={() => setSelectedProduct(null)}
      >
        <div className='flex flex-col items-center justify-center gap-2'>
          <TextField
            type='number'
            onChange={(e) => setCost(e.target.value)}
            endAdornment={t('Da')}
          />
          <Button
            onClick={() => {
              if (cost !== '')
                addSupplierProduct({
                  supplierId: id,
                  cost: Number(cost),
                  name: selectedProduct?.name || '',
                  type: selectedProduct?.type || 1,
                  itemId: selectedProduct?.id || '',
                })
              setSelectedProduct(null)
            }}
          >
            {t('Add Product')}
          </Button>
        </div>
      </Dialog>
      <Backdrop
        open={isAddProductLoading || isDeleteProductLoading}
        loading={isAddProductLoading || isDeleteProductLoading}
      />
      <AlertDialog
        title={t('Confirm Delete')}
        description={t('This action cannot be undone. This will permanently delete this product.')}
        cancelText={t('Cancel')}
        confirmText={t('Yes, Delete')}
        onConfirm={() => {
          deleteSupplierProduct({ itemId: idToDelete || '', supplierId: id })
          setIdToDelete(null)
        }}
        open={idToDelete !== null}
        onClose={() => setIdToDelete(null)}
        buttonProps={{ intent: 'error' }}
      />
    </>
  )
}
