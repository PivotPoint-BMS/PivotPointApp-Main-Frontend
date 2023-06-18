import React, { useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import moment from 'moment'
// next
import Image from 'next/image'
import { useRouter } from 'next/router'
// form
import { FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// apis
import { useGetVehiculesQuery } from 'store/api/scm/transportation/vehiculesApis'
import { useGetProductsQuery } from 'store/api/scm/products-service/productsApi'
import { useGetWarehousesQuery } from 'store/api/scm/warehousing/warehousingApis'
import { useCreateDeliveryMutation } from 'store/api/scm/transportation/deliveriesApis'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// hooks
import { useAppSelector } from 'store/hooks'
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// config
import { PIVOTPOINT_API } from 'config'
// types
import Delivery, { DeliveryItem } from 'types/Delivery'
import { Value } from 'react-date-picker/dist/cjs/shared/types'
// components
import Select from 'react-select'
import { Icon } from '@iconify/react'
import { Card, Dialog, IconButton, LoadingIndicator, TextField, Button } from 'components'
import { FormProvider, RHFTextField, RHFFieldContainer } from 'components/hook-form'
import { DatePicker } from 'components/date-pickers'

function CreateEditW2WDeliveryForm() {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const { push } = useRouter()
  const [from, setFrom] = useState({
    startWarehouseId: '',
    startingAddress: '',
    startWarehouseName: '',
  })
  const [to, setTo] = useState({
    arrivalWarehouseId: '',
    stoppingAddress: '',
    arrivalWarehouseName: '',
  })
  const [expectedArrival, onArrivalDateChange] = useState<Date | Value>(new Date())
  const [deliveryItems, setDeliveryItems] = useState<DeliveryItem[]>([])
  const [openToWarehouseDialog, setOpenToWarehouseDialog] = useState(false)
  const [openFromWarehouseDialog, setFromOpenWarehouseDialog] = useState(false)
  const [openProductDialog, setOpenProductDialog] = useState(false)

  // Filters
  const { PageNumber, PageSize } = useAppSelector((state) => state.paggination)
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)
  const [searchValue, setSearchValue] = useState('')
  // Queries
  const {
    data: warehouses,
    isSuccess: isWarehousesSuccess,
    isLoading: isWarehousesLoading,
  } = useGetWarehousesQuery({ SearchTerm: searchTerm, PageNumber, PageSize })
  const { data: vehicules, isLoading: isVehiculesLoading } = useGetVehiculesQuery({
    SearchTerm: searchTerm,
    PageNumber,
    PageSize,
  })
  const {
    data: products,
    isSuccess: isProductsSuccess,
    isLoading: isProductsLoading,
  } = useGetProductsQuery({ SearchTerm: searchTerm, PageNumber, PageSize })

  const [createDelivery, { isLoading: isCreateLoading }] = useCreateDeliveryMutation()
  //   const [
  //     editDelivery,
  //     { isLoading: isEditLoading, isError: isEditError, isSuccess: isEditSuccess },
  //   ] = useEditDeliveryMutation()

  const DeliverySchema = Yup.object().shape({
    transportationTitle: Yup.string().required(t('This field is required')),
    startWarehouseId: Yup.string().required(t('Please choose a warehouse')),
    startingAddress: Yup.string().required(t('This field is required')),
    stoppingAddress: Yup.string().required(t('This field is required')),
    expectedArrival: Yup.string().required(t('This field is required')),
    driverName: Yup.string().required(t('This field is required')),
    driverContact: Yup.string().required(t('This field is required')),
    vehiculeID: Yup.string().required(t('This field is required')),
    arrivalWarehouseId: Yup.string().required(t('This field is required')),
    deliveryCost: Yup.number().nullable().required(t('This field is required')),
    deliveryItems: Yup.array()
      .test({
        message: t('Please add items'),
        test: (arr) => arr?.length === 0,
      })
      .required(t('Please add items')),
  })

  const defaultValues = {
    transportationTitle: '',
    startWarehouseId: '',
    startingAddress: '',
    clientName: '',
    stoppingAddress: '',
    expectedArrival: '',
    driverName: '',
    driverContact: '',
    vehiculeID: '',
    arrivalWarehouseId: '',
    deliveryCost: null,
    deliveryItems: [],
  }

  const methods = useForm<FieldValues>({
    resolver: yupResolver(DeliverySchema),
    defaultValues,
  })

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods

  const onSubmit = async (data: FieldValues) => {
    const delivery: Partial<Delivery> = {
      transportationTitle: data.transportationTitle,
      startWarehouseId: data.startWarehouseId,
      startingAddress: data.startingAddress,
      expectedArrival: moment(expectedArrival?.toString()).toJSON(),
      driverName: data.driverName,
      driverContact: data.driverContact,
      arrivalWarehouseId: data.arrivalWarehouseId,
      stoppingAddress: data.stoppingAddress,
      vehiculeID: data.vehiculeID,
      deliveryCost: data.deliveryCost,
      deliveryItems,
      type: 2,
      currentStatus: 0,
    }
    createDelivery({ PageNumber, PageSize, ...delivery })
      .then(() => {
        open({
          message: t('Order Created Successfully.'),
          type: 'success',
          variant: 'contained',
        })
        push(PATH_DASHBOARD.scm.transportation.root)
      })
      .catch(() => {
        open({
          message: t('A problem has occured.'),
          type: 'error',
          variant: 'contained',
        })
      })
  }

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-10 flex flex-col items-end gap-4'>
          <Card fullWidth className=' divide-y dark:divide-gray-600'>
            <div className='grid w-full grid-cols-1 space-y-1 divide-x-0 divide-y p-4 rtl:divide-x-reverse sm:grid-cols-2 sm:space-y-0 sm:divide-y-0 sm:divide-x'>
              <div className='ltr:sm:pr-4 rtl:sm:pl-4'>
                <div className='mb-2 flex items-center justify-between gap-2'>
                  <h6 className='flex-1 text-lg font-bold'>{t('From')}:</h6>
                  {from.startWarehouseId !== '' && (
                    <IconButton
                      onClick={() =>
                        setFrom({
                          startWarehouseId: '',
                          startingAddress: '',
                          startWarehouseName: '',
                        })
                      }
                    >
                      <Icon
                        icon='ic:round-delete'
                        className='text-red-600 dark:text-red-600'
                        height={22}
                      />
                    </IconButton>
                  )}
                  <IconButton onClick={() => setFromOpenWarehouseDialog(true)}>
                    <Icon
                      icon={from.startWarehouseId === '' ? 'ic:round-add' : 'ic:round-edit'}
                      height={22}
                    />
                  </IconButton>
                </div>
                <div className='space-y-2'>
                  <p className='font-bold capitalize'>
                    <span className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                      {t('Warehouse')}:
                    </span>{' '}
                    {from.startWarehouseName}
                  </p>
                  <p className='font-bold capitalize'>
                    <span className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                      {t('Address')}:
                    </span>{' '}
                    {from.startingAddress}
                  </p>
                </div>
                {errors.startWarehouseId && (
                  <span className='text-xs text-red-500'>
                    {errors.startWarehouseId.message?.toString()}
                  </span>
                )}
              </div>
              <div className='ltr:sm:pl-4 rtl:sm:pr-4'>
                <div className='mb-2 flex items-center justify-between gap-2'>
                  <h6 className='flex-1 text-lg font-bold'>{t('To')}:</h6>
                  {to.arrivalWarehouseId !== '' && (
                    <IconButton
                      onClick={() =>
                        setTo({
                          arrivalWarehouseId: '',
                          stoppingAddress: '',
                          arrivalWarehouseName: '',
                        })
                      }
                    >
                      <Icon
                        icon='ic:round-delete'
                        className='text-red-600 dark:text-red-600'
                        height={22}
                      />
                    </IconButton>
                  )}
                  <IconButton onClick={() => setOpenToWarehouseDialog(true)}>
                    <Icon
                      icon={to.arrivalWarehouseId === '' ? 'ic:round-add' : 'ic:round-edit'}
                      height={22}
                    />
                  </IconButton>
                </div>
                <div className='space-y-2'>
                  <p className='font-bold capitalize'>
                    <span className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                      {t('Warehouse')}:
                    </span>{' '}
                    {to.arrivalWarehouseName}
                  </p>
                  <p className='font-bold capitalize'>
                    <span className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                      {t('Address')}:
                    </span>{' '}
                    {to.stoppingAddress}
                  </p>
                </div>
                {errors.arrivalWarehouseId && (
                  <span className='text-xs text-red-500'>
                    {errors.arrivalWarehouseId.message?.toString()}
                  </span>
                )}
              </div>
            </div>
            <div className='w-full space-y-2 p-4'>
              <h6 className='text-lg font-bold'>{t('Delivery Details')}:</h6>
              <div className='grid w-full grid-cols-1 gap-2 sm:grid-cols-2'>
                <RHFTextField name='transportationTitle' label={t('Title')} />
                <div>
                  <RHFFieldContainer name='expectedArrival' label={t('Expected Arrival Date')}>
                    <DatePicker
                      value={expectedArrival}
                      onChange={(value) => {
                        onArrivalDateChange(value)
                        setValue('expectedArrival', value?.toString())
                      }}
                    />
                  </RHFFieldContainer>
                </div>
              </div>
            </div>
            <div className='w-full space-y-2 p-4'>
              <h6 className='text-lg font-bold'>{t('Driver Details')}:</h6>
              <div className='grid w-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3'>
                <RHFTextField name='driverName' label={t('Driver Name')} />
                <RHFTextField name='driverContact' label={t('Driver Contact')} />
                <div className='sm:col-span-2 md:col-span-1'>
                  <RHFFieldContainer name='vehiculeID' label={t('Vehicule')}>
                    <Select
                      options={vehicules?.data || []}
                      isLoading={isVehiculesLoading}
                      getOptionLabel={(option) => `${option.model} | ${option.code}`}
                      onInputChange={(value) => setSearchValue(value)}
                      onBlur={() => setSearchValue('')}
                      onChange={(newValue) => {
                        setValue('vehiculeID', newValue?.id)
                      }}
                      placeholder=''
                      className='react-select-container'
                      classNamePrefix='react-select'
                    />
                  </RHFFieldContainer>
                </div>
              </div>
            </div>
            <div className='w-full space-y-2 p-4'>
              <div className='flex w-full items-center justify-between'>
                <h6 className='text-lg font-bold'>{t('Items Details')}:</h6>
                <Button
                  variant='text'
                  intent='default'
                  startIcon={<Icon icon='ic:round-add' height={20} />}
                  onClick={() => setOpenProductDialog(true)}
                >
                  {t('Add Item')}
                </Button>
              </div>

              <div className='divide-y dark:divide-gray-600'>
                {deliveryItems.length === 0 && (
                  <div className='flex w-full items-center justify-center '>
                    <h6 className='text-lg font-semibold'>{t('No Item Added')}</h6>
                  </div>
                )}
                {deliveryItems.map((product) => (
                  <div className='flex flex-col items-end pb-2'>
                    <div className='flex w-full items-center justify-between py-4'>
                      <div className='grid w-full grid-cols-1 items-center gap-2 sm:grid-cols-2 md:grid-cols-4'>
                        <div className='flex items-center gap-2 sm:col-span-2 md:col-span-1'>
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
                          <div className='flex-1'>
                            <TextField
                              className='!p-1'
                              label={t('Name')}
                              value={product.name}
                              disabled
                            />
                          </div>
                        </div>
                        <div>
                          <TextField
                            min={1}
                            type='number'
                            className='!p-1'
                            label={t('Price')}
                            value={product.value}
                            endAdornment={t('Da')}
                            disabled
                          />
                        </div>
                        <div>
                          <TextField
                            min={1}
                            type='number'
                            className='!p-1'
                            label={t('Quantity')}
                            value={product.quantity}
                            onChange={(e) => {
                              setDeliveryItems((prev) => {
                                const index = prev.findIndex((item) => item.id === product.id)
                                const newItem = prev.find((item) => item.id === product.id)
                                if (newItem && index !== -1) {
                                  newItem.quantity = parseInt(e.target.value, 10)

                                  const newItems = [
                                    ...prev.slice(0, index),
                                    newItem,
                                    ...prev.slice(index + 1),
                                  ]
                                  return newItems
                                }
                                return prev
                              })
                            }}
                            onBlur={(e) => {
                              setDeliveryItems((prev) => {
                                const index = prev.findIndex((item) => item.id === product.id)
                                const newItem = prev.find((item) => item.id === product.id)
                                if (newItem && index !== -1) {
                                  newItem.quantity =
                                    Number(e.target.value) === 0 ? 1 : parseInt(e.target.value, 10)

                                  const newItems = [
                                    ...prev.slice(0, index),
                                    newItem,
                                    ...prev.slice(index + 1),
                                  ]
                                  return newItems
                                }
                                return prev
                              })
                            }}
                          />
                        </div>
                        <div>
                          <TextField
                            min={1}
                            type='number'
                            className='!p-1'
                            label={t('Quantity')}
                            value={product.quantity * product.value}
                            endAdornment={t('Da')}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <Button
                      intent={
                        !deliveryItems.every((item) => item.id !== product.id) ? 'error' : 'primary'
                      }
                      startIcon={
                        <Icon
                          icon={
                            !deliveryItems.every((item) => item.id !== product.id)
                              ? 'ic:round-delete'
                              : 'ic:round-add'
                          }
                          height={22}
                        />
                      }
                      variant='text'
                      size='small'
                      onClick={
                        deliveryItems.every((item) => item.id !== product.id)
                          ? () =>
                              setDeliveryItems((prev) => [
                                ...prev,
                                {
                                  cost: product.cost,
                                  id: product.id,
                                  name: product.name,
                                  picture: product.picture,
                                  value: product.value,
                                  type: product.type,
                                  quantity: 1,
                                },
                              ])
                          : () =>
                              setDeliveryItems((prev) =>
                                prev.filter((item) => item.id !== product.id)
                              )
                      }
                    >
                      {!deliveryItems.every((item) => item.id !== product.id)
                        ? t('Remove')
                        : t('Add')}
                    </Button>
                  </div>
                ))}
                {errors.deliveryItems && (
                  <span className='!border-0 text-xs text-red-500'>
                    {errors.deliveryItems.message?.toString()}
                  </span>
                )}
              </div>
            </div>
            <div className='flex w-full flex-col items-end gap-4 p-4'>
              <div className='h-full'>
                <RHFTextField
                  type='number'
                  name='deliveryCost'
                  label={t('Shipping')}
                  endAdornment={t('Da')}
                />
              </div>
              <div className='flex max-w-full items-center justify-between '>
                <p className='text-sm font-medium  text-gray-600 dark:text-gray-400'>
                  {t('Subtotal')}:
                </p>{' '}
                <p className='w-48 font-bold ltr:text-right rtl:text-left'>
                  {deliveryItems.reduce((acc, cur) => acc + cur.value * cur.quantity, 0) || 0}{' '}
                  {t('Da')}
                </p>
              </div>
              <div className='flex max-w-full items-center justify-between '>
                <p className='font-bold'>{t('Total')}:</p>{' '}
                <p className='w-48 font-bold ltr:text-right rtl:text-left'>
                  {deliveryItems.reduce((acc, cur) => acc + cur.value * cur.quantity, 0) || 0}{' '}
                  {t('Da')}
                </p>
              </div>
            </div>
          </Card>
          <Button size='large' className='text-xl' type='submit' loading={isCreateLoading}>
            {t('Create Order')}
          </Button>
        </div>
      </FormProvider>
      <Dialog
        open={openFromWarehouseDialog}
        title={t('Starting Warehouse')}
        handleClose={() => {
          setFromOpenWarehouseDialog(false)
          setSearchValue('')
        }}
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
          {isWarehousesLoading ? (
            <LoadingIndicator />
          ) : (
            <>
              {isWarehousesSuccess && warehouses.data.length > 0 ? (
                warehouses.data
                  .filter((warehouse) => warehouse.id !== to.arrivalWarehouseId)
                  .map((warehouse) => (
                    <button
                      className={clsx(
                        'flex w-full flex-col items-start space-y-1 rounded-lg border p-4 dark:border-gray-600',
                        'hover:bg-gray-100 active:bg-gray-200',
                        'dark:hover:bg-paper-hover-dark dark:active:bg-paper-dark-contrast',
                        from.startWarehouseId === warehouse.id &&
                          ' bg-gray-200 hover:bg-gray-100 dark:bg-paper-dark-contrast dark:hover:bg-paper-dark-contrast'
                      )}
                      onClick={() => {
                        setFrom({
                          startWarehouseId: warehouse.id,
                          startWarehouseName: warehouse.name,
                          startingAddress: warehouse.location,
                        })
                        setValue('startWarehouseId', warehouse.id)
                        setValue('startingAddress', warehouse.location)
                        setFromOpenWarehouseDialog(false)
                      }}
                    >
                      <p className='font-bold'>{warehouse.name}</p>
                      <p className='text-sm text-gray-600 dark:text-gray-400'>
                        {warehouse.location}
                      </p>
                    </button>
                  ))
              ) : (
                <div className='flex h-48  w-full items-center justify-center'>
                  <h1 className='text-xl font-semibold'>{t('No Warehouse Found')}</h1>
                </div>
              )}
            </>
          )}
        </div>
      </Dialog>
      <Dialog
        open={openToWarehouseDialog}
        title={t('Destination Warehouse')}
        handleClose={() => {
          setOpenToWarehouseDialog(false)
          setSearchValue('')
        }}
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
          {isWarehousesLoading ? (
            <LoadingIndicator />
          ) : (
            <>
              {isWarehousesSuccess && warehouses.data.length > 0 ? (
                warehouses.data
                  .filter((warehouse) => warehouse.id !== from.startWarehouseId)
                  .map((warehouse) => (
                    <button
                      className={clsx(
                        'flex w-full flex-col items-start space-y-1 rounded-lg border p-4 dark:border-gray-600',
                        'hover:bg-gray-100 active:bg-gray-200',
                        'dark:hover:bg-paper-hover-dark dark:active:bg-paper-dark-contrast',
                        from.startWarehouseId === warehouse.id &&
                          ' bg-gray-200 hover:bg-gray-100 dark:bg-paper-dark-contrast dark:hover:bg-paper-dark-contrast'
                      )}
                      onClick={() => {
                        setTo({
                          arrivalWarehouseId: warehouse.id,
                          arrivalWarehouseName: warehouse.name,
                          stoppingAddress: warehouse.location,
                        })
                        setValue('arrivalWarehouseId', warehouse.id)
                        setValue('stoppingAddress', warehouse.location)
                        setOpenToWarehouseDialog(false)
                      }}
                    >
                      <p className='font-bold'>{warehouse.name}</p>
                      <p className='text-sm text-gray-600 dark:text-gray-400'>
                        {warehouse.location}
                      </p>
                    </button>
                  ))
              ) : (
                <div className='flex h-48  w-full items-center justify-center'>
                  <h1 className='text-xl font-semibold'>{t('No Warehouse Found')}</h1>
                </div>
              )}
            </>
          )}
        </div>
      </Dialog>
      <Dialog
        open={openProductDialog}
        title={t('Product')}
        handleClose={() => {
          setOpenProductDialog(false)
          setSearchValue('')
        }}
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
                      !deliveryItems.every((item) => item.id !== product.id) ? 'error' : 'primary'
                    }
                    startIcon={
                      <Icon
                        icon={
                          !deliveryItems.every((item) => item.id !== product.id)
                            ? 'ic:round-delete'
                            : 'ic:round-add'
                        }
                        height={22}
                      />
                    }
                    variant='text'
                    size='small'
                    onClick={
                      deliveryItems.every((item) => item.id !== product.id)
                        ? () =>
                            setDeliveryItems((prev) => [
                              ...prev,
                              {
                                cost: product.cost,
                                id: product.id,
                                name: product.name,
                                picture: product.picture,
                                value: product.price,
                                type: product.type,
                                quantity: 1,
                              },
                            ])
                        : () =>
                            setDeliveryItems((prev) =>
                              prev.filter((item) => item.id !== product.id)
                            )
                    }
                  >
                    {!deliveryItems.every((item) => item.id !== product.id)
                      ? t('Remove')
                      : t('Add')}
                  </Button>
                </div>
              ))
          )}
        </div>
      </Dialog>
    </>
  )
}

export default CreateEditW2WDeliveryForm
