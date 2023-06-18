import React, { useEffect, useState } from 'react'
// next
import Image from 'next/image'
// apis
import {
  useAddWarehouseSectionItemMutation,
  useDeleteSectionItemMutation,
  useDeleteWarehouseSectionMutation,
  useEditWarehouseSectionMutation,
  useGetWarehouseSectionQuery,
} from 'store/api/scm/warehousing/warehouseSectionApis'
import { useGetProductsQuery } from 'store/api/scm/products-service/productsApi'
// redux
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { closePreviewSection } from 'store/slices/sectionPreviewSlice'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// config
import { PIVOTPOINT_API } from 'config'
// components
import { Icon } from '@iconify/react'
import {
  IconButton,
  LoadingIndicator,
  Tooltip,
  AlertDialog,
  TextField,
  Sheet,
  Button,
  Dialog,
  Backdrop,
} from 'components'

export default function SectionPreview({ warehouseId }: { warehouseId: string }) {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const dispatch = useAppDispatch()

  const [name, setName] = useState('')
  const [maxCapacity, setMaxCapacity] = useState(0)
  const { isOpen, sectionId } = useAppSelector((state) => state.sectionPreview)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openAddProductDialog, setOpenAddProductDialog] = useState(false)
  const [idToDelete, setIdToDelete] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)
  const [searchValue, setSearchValue] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<{
    id: string
    name: string
    type: number
  } | null>(null)
  const [cost, setCost] = useState('')
  const [quantity, setQuantity] = useState('')
  // Query
  const { data, isLoading, isSuccess } = useGetWarehouseSectionQuery(sectionId || skipToken)
  const {
    data: products,
    isSuccess: isProductsSuccess,
    isLoading: isProductsLoading,
  } = useGetProductsQuery({ SearchTerm: searchTerm, PageNumber: 1, PageSize: 50 })

  // Mutation
  const [editSection] = useEditWarehouseSectionMutation()
  const [addSectionItem, { isLoading: isAddItemLoading }] = useAddWarehouseSectionItemMutation()
  const [deleteSection, { isLoading: isDeleteLoading }] = useDeleteWarehouseSectionMutation()
  const [deleteItem, { isLoading: isDeleteItemLoading }] = useDeleteSectionItemMutation()

  const handleDelete = () => {
    deleteSection({ id: sectionId || '', warehouseId })
      .then(() => {
        open({
          message: t('Section Deleted Successfully.'),
          autoHideDuration: 4000,
          type: 'success',
          variant: 'contained',
        })
        dispatch(closePreviewSection())
        setOpenDeleteDialog(false)
      })
      .catch(() => {
        open({
          message: t('Sorry, Section not deleted, A problem has occured.'),
          autoHideDuration: 4000,
          type: 'error',
          variant: 'contained',
        })
      })
  }

  useEffect(() => {
    if (isSuccess) {
      setName(data.data.name)
      setMaxCapacity(data.data.maxCapacity)
    }
  }, [isLoading, data])

  return (
    <>
      <Sheet
        title={t('Section Preview')}
        isOpen={isOpen}
        handleClose={() => dispatch(closePreviewSection())}
        actions={
          <Tooltip title={t('Delete')}>
            <IconButton onClick={() => setOpenDeleteDialog(true)}>
              <Icon icon='ic:round-delete' height={20} className='text-red-600 dark:text-red-400' />
            </IconButton>
          </Tooltip>
        }
        className='sm:w-[500px]'
      >
        {isLoading ? (
          <div className='flex h-full w-full flex-1 items-center justify-center'>
            <LoadingIndicator />
          </div>
        ) : (
          <div className='flex flex-1 flex-col gap-5 overflow-auto overflow-y-scroll px-4 py-2'>
            {isSuccess && data.data ? (
              <>
                <div className='space-y-1 rounded-md bg-gray-100 p-2 dark:bg-paper-dark-contrast '>
                  <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                    {t('Name')}
                  </p>
                  <TextField
                    type='text'
                    defaultValue={data.data.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={(e) => {
                      if (e.target.value === '' || e.target.value === data.data.name) {
                        setName(data.data.name)
                        return
                      }
                      editSection({
                        data: { ...data.data, name: e.target.value },
                        id: sectionId || '',
                        warehouseId,
                      })
                        .then(() =>
                          open({
                            message: t('Section Updated Successfully.'),
                            autoHideDuration: 4000,
                            type: 'success',
                            variant: 'contained',
                          })
                        )
                        .catch(() =>
                          open({
                            message: t('Sorry, Section not updated, A problem has occured.'),
                            autoHideDuration: 4000,
                            type: 'error',
                            variant: 'contained',
                          })
                        )
                    }}
                  />
                </div>
                <div className='space-y-1 rounded-md bg-gray-100 p-2 dark:bg-paper-dark-contrast '>
                  <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                    {t('Max Capacity')}
                  </p>
                  <TextField
                    type='number'
                    defaultValue={data.data.maxCapacity}
                    value={maxCapacity}
                    onChange={(e) => setMaxCapacity(parseInt(e.target.value, 10))}
                    onBlur={(e) => {
                      if (
                        e.target.value === '' ||
                        data.data.maxCapacity === parseInt(e.target.value, 10)
                      ) {
                        setMaxCapacity(parseInt(e.target.value, 10))
                        return
                      }
                      editSection({
                        data: { ...data.data, maxCapacity: parseInt(e.target.value, 10) },
                        id: sectionId || '',
                        warehouseId,
                      })
                        .then(() =>
                          open({
                            message: t('Section Updated Successfully.'),
                            autoHideDuration: 4000,
                            type: 'success',
                            variant: 'contained',
                          })
                        )
                        .catch(() =>
                          open({
                            message: t('Sorry, Section not updated, A problem has occured.'),
                            autoHideDuration: 4000,
                            type: 'error',
                            variant: 'contained',
                          })
                        )
                    }}
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <h6 className=''>{t('Items List')}</h6>
                  <Button
                    intent='default'
                    variant='outlined'
                    startIcon={<Icon icon='ic:round-add' height={18} />}
                    onClick={() => setOpenAddProductDialog(true)}
                  >
                    {t('Add items')}
                  </Button>
                </div>
                <div>
                  <div className='mb-2 flex items-center gap-5 px-2'>
                    <p className='flex-[0.9] text-gray-600 dark:text-gray-400'>{t('Name')}</p>
                    <p className='w-16 flex-[0.1] text-right text-gray-600 dark:text-gray-400'>
                      {t('Stock')}
                    </p>
                    <p className='w-16 text-right text-gray-600 dark:text-gray-400'>{t('Cost')}</p>
                    <p className='w-24 text-right text-gray-600 dark:text-gray-400'>
                      {t('Actions')}
                    </p>
                  </div>
                  <div className='space-y-2'>
                    {data.data.sectionItems.map((item) => (
                      <div className='flex items-center gap-5 rounded-lg bg-gray-100 p-2 dark:bg-paper-dark-contrast'>
                        {item.picture ? (
                          <div className='h-12 w-12'>
                            <Image
                              alt={item.name}
                              width={48}
                              height={48}
                              src={`${PIVOTPOINT_API.scmPicUrl}/${item.picture}`}
                              className='aspect-square h-12 w-12 rounded-full object-cover'
                            />
                          </div>
                        ) : (
                          <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 dark:bg-paper-dark-contrast'>
                            <Icon icon='ic:round-no-photography' height={20} />
                          </div>
                        )}
                        <p className='flex-[0.9] font-semibold'>{item.name}</p>

                        <p className='min-w-[64px] flex-[0.1] text-right font-semibold'>
                          {item.quantity}
                        </p>

                        <p className='min-w-[64px] text-right font-semibold'>
                          {item.cost} {t('Da')}
                        </p>
                        <div className='flex min-w-[96px] justify-end'>
                          <Tooltip title={t('Delete')} side='bottom'>
                            <IconButton onClick={() => setIdToDelete(item.id)}>
                              <Icon
                                icon='ic:round-delete'
                                height={20}
                                className='text-red-600 dark:text-red-400'
                              />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div>Error</div>
            )}
          </div>
        )}
      </Sheet>
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
                <Icon icon='ion:search-outline' height={18} className='text-gray-500' />
              </IconButton>
            }
          />
          {isProductsLoading ? (
            <LoadingIndicator />
          ) : (
            isProductsSuccess &&
            products.data
              .filter((product) => product.type !== 2)
              .map((product) => (
                <div className='flex w-full items-center justify-between rounded-lg border p-4'>
                  <div className='flex items-center gap-2'>
                    {product.picture ? (
                      <div className='h-12 w-12'>
                        <Image
                          alt={product.name}
                          width={48}
                          height={48}
                          src={`${PIVOTPOINT_API.scmPicUrl}/${product.picture}`}
                          className='aspect-square h-12 w-12 rounded-full object-cover'
                        />
                      </div>
                    ) : (
                      <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 dark:bg-paper-dark-contrast'>
                        <Icon icon='ic:round-no-photography' height={20} />
                      </div>
                    )}
                    <div>
                      <p className='font-semibold'>
                        <span className='text-sm font-normal'>{t('Name')}:</span> {product.name}
                      </p>
                      <p className='font-semibold'>
                        <span className='text-sm font-normal'>{t('Price')}:</span> {product.price}{' '}
                        {t('Da')}
                      </p>
                    </div>
                  </div>
                  <Button
                    intent={
                      !data?.data.sectionItems.every((item) => item.id !== product.id)
                        ? 'secondary'
                        : 'primary'
                    }
                    startIcon={
                      <Icon
                        icon={
                          !data?.data.sectionItems.every((item) => item.id !== product.id)
                            ? 'ic:round-check'
                            : 'ic:round-add'
                        }
                        height={24}
                      />
                    }
                    variant='text'
                    size='small'
                    onClick={
                      data?.data.sectionItems.every((item) => item.id !== product.id)
                        ? () => setSelectedProduct({ ...product })
                        : () => {}
                    }
                  >
                    {!data?.data.sectionItems.every((item) => item.id !== product.id)
                      ? t('Added')
                      : t('Add')}
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
            label={t('Cost')}
            onChange={(e) => setCost(e.target.value)}
            endAdornment={t('Da')}
          />
          <TextField
            type='number'
            label={t('Quantity')}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Button
            onClick={() => {
              if (cost !== '')
                addSectionItem({
                  sectionId: sectionId || '',
                  warehouseId,
                  itemId: selectedProduct?.id || '',
                  quantity: Number(quantity),
                  cost: Number(cost),
                }).then(() => {
                  setSelectedProduct(null)
                })
            }}
            loading={isAddItemLoading}
          >
            {t('Add Product')}
          </Button>
        </div>
      </Dialog>
      <AlertDialog
        title={t('Confirm Delete')}
        description={
          <p className='py-1 text-sm text-red-500 dark:text-red-400'>
            {t('This action cannot be undone. This will permanently delete this deal.')}
          </p>
        }
        cancelText={t('Cancel')}
        confirmText={t('Yes, Delete')}
        onConfirm={handleDelete}
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        buttonProps={{ intent: 'error', loading: isDeleteLoading }}
      />
      <AlertDialog
        title={t('Confirm Delete')}
        description={t('This action cannot be undone. This will permanently delete this item.')}
        cancelText={t('Cancel')}
        confirmText={t('Yes, Delete')}
        onConfirm={() => {
          deleteItem({ itemId: idToDelete || '', sectionId: sectionId || '', warehouseId })
          setIdToDelete(null)
        }}
        open={idToDelete !== null}
        onClose={() => setIdToDelete(null)}
        buttonProps={{ intent: 'error' }}
      />
      <Backdrop open={isDeleteItemLoading} loading={isDeleteItemLoading} />
    </>
  )
}
