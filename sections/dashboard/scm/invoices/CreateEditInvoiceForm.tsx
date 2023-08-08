/* eslint-disable no-nested-ternary */
import React, { useEffect, useMemo, useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import moment from 'moment'
import { parseInt } from 'lodash'
// next
import Image from 'next/image'
import { useRouter } from 'next/router'
// form
import { FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// apis
import { useGetAllQuery } from 'store/api/crm/contact-leads/leadApis'
import { useGetProductsQuery } from 'store/api/scm/products-service/productsApi'
import { useCreateInvoiceMutation } from 'store/api/scm/invoices/invoicesApis'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// hooks
import { useAppSelector } from 'store/hooks'
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// config
import { PIVOTPOINT_API } from 'config'
// types
import Invoice, { InvoiceItem } from 'types/Invoice'
import { Value } from 'react-date-picker/dist/cjs/shared/types'
// components
import { Icon } from '@iconify/react'
import { Badge, Card, Dialog, IconButton, LoadingIndicator, TextField, Button } from 'components'
import { FormProvider, RHFTextField, RHFFieldContainer } from 'components/hook-form'
import { DatePicker } from 'components/date-pickers'
// asset
import avatarPlaceholder from 'public/avatar_placeholder.png'
import { useGetCompanyDetailsQuery } from 'store/api/settings/settingsAPIs'

function CreateEditInvoiceForm({
  isEdit,
  currentInvoice,
}: {
  isEdit?: boolean
  currentInvoice?: Invoice
}) {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const { push } = useRouter()
  const [to, setTo] = useState({ clientName: '', contactId: '' })
  const [created, onCreatedDateChange] = useState<Date | Value>(new Date())
  const [due, onDueDateChange] = useState<Date | Value>(new Date())
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([])
  const [openCustomerDialog, setOpenCustomerDialog] = useState(false)
  const [openProductDialog, setOpenProductDialog] = useState(false)

  // Filters
  const { PageNumber, PageSize } = useAppSelector((state) => state.pagination)
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)
  const [searchValue, setSearchValue] = useState('')
  // Queries
  const { data: companyDetails } = useGetCompanyDetailsQuery()
  const {
    data: customers,
    isSuccess: isCustomersSuccess,
    isLoading: isCustomersLoading,
  } = useGetAllQuery({ searchTerm })
  const {
    data: products,
    isSuccess: isProductsSuccess,
    isLoading: isProductsLoading,
  } = useGetProductsQuery({ SearchTerm: searchTerm, PageNumber, PageSize })

  const [createInvoice, { isLoading: isCreateLoading }] = useCreateInvoiceMutation()

  const InvoiceSchema = Yup.object().shape({
    invoiceTitle: Yup.string().required(t('This field is required')),
    contactId: Yup.string().required(t('Please choose a customer')),
    clientName: Yup.string().required(t('This field is required')),
    paymentMethod: Yup.string().required(t('This field is required')),
    clientAddress: Yup.string().required(t('This field is required')),
    due: Yup.string().required(t('This field is required')),
    invoiceItems: Yup.array()
      .test({
        message: t('Please add items'),
        test: (arr) => arr?.length === 0,
      })
      .required(t('Please add items')),
  })

  const defaultValues = useMemo(
    () => ({
      invoiceTitle: currentInvoice?.invoiceTitle || '',
      contactId: currentInvoice?.contactId || '',
      clientName: currentInvoice?.clientName || '',
      paymentMethod: currentInvoice?.paymentMethod || '',
      due: currentInvoice?.due || new Date(),
      invoiceItems: currentInvoice?.invoiceItems || [],
    }),
    [currentInvoice]
  )

  const methods = useForm<FieldValues>({
    resolver: yupResolver(InvoiceSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = methods

  const onSubmit = async (data: FieldValues) => {
    const invoice: Partial<Invoice> = {
      invoiceTitle: data.invoiceTitle,
      contactId: data.contactId,
      clientName: data.clientName,
      paymentMethod: data.paymentMethod,
      created: moment(created?.toString()).toJSON(),
      due: moment(due?.toString()).toJSON(),
      total: data.total,
      invoiceItems,
      status: 0,
    }
    createInvoice({ PageNumber, PageSize, ...invoice })
      .then(() => {
        open({
          message: t('Invoice Created Successfully.'),
          type: 'success',
          variant: 'contained',
        })
        push(PATH_DASHBOARD.scm.invoices.root)
      })
      .catch(() => {
        open({
          message: t('A problem has occurred.'),
          type: 'error',
          variant: 'contained',
        })
      })
  }

  useEffect(() => {
    if (isEdit && currentInvoice) {
      setInvoiceItems(currentInvoice.invoiceItems)
      // setShipping(currentInvoice.shipping)
      reset(defaultValues)
      onCreatedDateChange(moment(currentInvoice.created).toDate())
      onDueDateChange(moment(currentInvoice.due).toDate())
      setTo({ clientName: currentInvoice.clientName, contactId: currentInvoice.contactId })
    }
    if (!isEdit) {
      reset(defaultValues)
    }
  }, [isEdit, currentInvoice])

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-10 flex flex-col items-end gap-4'>
          <Card fullWidth className=' divide-y dark:divide-gray-600'>
            <div className='grid w-full grid-cols-1 space-y-1 divide-x-0 divide-y p-4 rtl:divide-x-reverse dark:divide-gray-600 sm:grid-cols-2 sm:space-y-0 sm:divide-y-0 sm:divide-x'>
              <div className='ltr:sm:pr-4 rtl:sm:pl-4'>
                <div className='mb-2 flex items-center justify-between'>
                  <h6 className='text-lg font-bold'>{t('From')}:</h6>
                </div>
                <div className='space-y-2'>
                  <p className='font-medium capitalize'>{companyDetails?.data.name}</p>
                  <p className='text-sm capitalize'>
                    {/* {companyDetails?.data.address} */}
                    {companyDetails?.data.website}
                  </p>
                  <p className='text-sm capitalize'>{/* {companyDetails?.data.phoneNumber} */}</p>
                </div>
              </div>
              <div className='ltr:sm:pl-4 rtl:sm:pr-4'>
                <div className='flex items-center justify-between'>
                  <h6 className='text-lg font-bold'>{t('To')}:</h6>
                  <IconButton onClick={() => setOpenCustomerDialog(true)}>
                    <Icon
                      icon={to.contactId === '' ? 'ic:round-add' : 'ic:round-edit'}
                      height={22}
                    />
                  </IconButton>
                </div>
                <div className='space-y-2'>
                  <p className='text-sm capitalize'>{to.clientName}</p>
                </div>
                {errors.contactId && (
                  <span className='text-xs text-red-500'>
                    {errors.contactId.message?.toString()}
                  </span>
                )}
              </div>
            </div>
            <div className='w-full space-y-2 p-4'>
              <h6 className='text-lg font-bold'>{t('Invoice Details')}:</h6>
              <div className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>
                <RHFTextField name='invoiceTitle' label={t('Title')} />
                <RHFTextField name='clientAddress' label={t('Customer Address')} />
                <RHFFieldContainer name='created' label={t('Created date')}>
                  <DatePicker
                    value={created}
                    onChange={(value) => {
                      onCreatedDateChange(value)
                      setValue('created', value?.toString())
                    }}
                  />
                </RHFFieldContainer>
                <RHFFieldContainer name='due' label={t('Due date')}>
                  <DatePicker
                    value={due}
                    onChange={(value) => {
                      onDueDateChange(value)
                      setValue('due', value?.toString())
                    }}
                  />
                </RHFFieldContainer>
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
                {invoiceItems.length === 0 && (
                  <div className='flex w-full items-center justify-center '>
                    <h6 className='text-lg font-semibold'>{t('No Item Added')}</h6>
                  </div>
                )}
                {invoiceItems.map((product) => (
                  <div key={product.id} className='flex flex-col items-end pb-2'>
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
                            <TextField className='!p-1' label={t('Name')} value={product.name} />
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
                              setInvoiceItems((prev) => {
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
                              setInvoiceItems((prev) => {
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
                            label={t('Total')}
                            value={product.quantity * product.value}
                            endAdornment={t('Da')}
                          />
                        </div>
                      </div>
                    </div>
                    <Button
                      intent={
                        !invoiceItems.every((item) => item.id !== product.id) ? 'error' : 'primary'
                      }
                      startIcon={
                        <Icon
                          icon={
                            !invoiceItems.every((item) => item.id !== product.id)
                              ? 'ic:round-delete'
                              : 'ic:round-add'
                          }
                          height={22}
                        />
                      }
                      variant='text'
                      size='small'
                      onClick={
                        invoiceItems.every((item) => item.id !== product.id)
                          ? () =>
                              setInvoiceItems((prev) => [
                                ...prev,
                                {
                                  cost: product.value,
                                  id: product.id,
                                  name: product.name,
                                  picture: product.picture,
                                  value: product.value,
                                  type: product.type,
                                  quantity: 1,
                                },
                              ])
                          : () =>
                              setInvoiceItems((prev) =>
                                prev.filter((item) => item.id !== product.id)
                              )
                      }
                    >
                      {!invoiceItems.every((item) => item.id !== product.id)
                        ? t('Remove')
                        : t('Add')}
                    </Button>
                  </div>
                ))}
                {errors.invoiceItems && (
                  <span className='!border-0 text-xs text-red-500'>
                    {errors.invoiceItems.message?.toString()}
                  </span>
                )}
              </div>
            </div>
            <div className='flex w-full flex-col items-end gap-4 p-4'>
              <div>
                <RHFTextField name='paymentMethod' label={t('Payment Method')} />
              </div>
              <div className='flex max-w-full items-center justify-between '>
                <p className='text-sm font-medium  text-gray-600 dark:text-gray-400'>
                  {t('Subtotal')}:
                </p>{' '}
                <p className='w-48 font-bold ltr:text-right rtl:text-left'>
                  {invoiceItems.reduce((acc, cur) => acc + cur.value * cur.quantity, 0) || 0}{' '}
                  {t('Da')}
                </p>
              </div>
              <div className='flex max-w-full items-center justify-between '>
                <p className='font-bold'>{t('Total')}:</p>{' '}
                <p className='w-48 font-bold ltr:text-right rtl:text-left'>
                  {invoiceItems.reduce((acc, cur) => acc + cur.value * cur.quantity, 0) || 0}{' '}
                  {t('Da')}
                </p>
              </div>
            </div>
          </Card>
          <Button size='large' className='text-xl' type='submit' loading={isCreateLoading}>
            {isEdit ? t('Edit Invoice') : t('Create Invoice')}
          </Button>
        </div>
      </FormProvider>
      <Dialog
        open={openCustomerDialog}
        title={t('Customer')}
        handleClose={() => {
          setOpenCustomerDialog(false)
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
          {isCustomersLoading ? (
            <LoadingIndicator />
          ) : isCustomersSuccess && customers.data.length > 0 ? (
            customers.data.map((customer) => (
              <button
                key={customer.id}
                className={clsx(
                  'flex w-full flex-col items-start space-y-1 rounded-lg border p-4 dark:border-gray-600',
                  'hover:bg-gray-100 active:bg-gray-200',
                  'dark:hover:bg-paper-hover-dark dark:active:bg-paper-dark-contrast',
                  to.contactId === customer.id &&
                    ' bg-gray-200 hover:bg-gray-100 dark:bg-paper-dark-contrast dark:hover:bg-paper-dark-contrast'
                )}
                onClick={() => {
                  setTo((prev) => ({
                    ...prev,
                    clientName: customer.fullName,
                    contactId: customer.id,
                  }))
                  setValue('clientName', customer.fullName)
                  setValue('contactId', customer.id)
                  setOpenCustomerDialog(false)
                }}
              >
                <div>
                  <div className='flex items-center gap-2'>
                    <div className='h-9 w-9'>
                      <Image
                        alt='avatar'
                        width={200}
                        height={200}
                        src={
                          customer.imageFile
                            ? `${PIVOTPOINT_API.crmPicUrl}/${customer.imageFile}`
                            : avatarPlaceholder.src
                        }
                        className='aspect-square h-9 w-9 rounded-full object-cover'
                      />
                    </div>
                    <div className='flex items-center gap-2'>
                      <p className='font-semibold'>{customer.fullName}</p>
                      {customer.isContact ? (
                        <Badge
                          label={t('Contact')}
                          intent='success'
                          size='small'
                          className='!text-xs'
                        />
                      ) : (
                        <Badge label={t('Lead')} intent='info' size='small' className='!text-xs' />
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className='flex h-48  w-full items-center justify-center'>
              <h1 className='text-xl font-semibold'>{t('No Customer Found')}</h1>
            </div>
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
          ) : isProductsSuccess &&
            products.data.filter((product) => product.type !== 2).length > 0 ? (
            products.data
              .filter((product) => product.type !== 2)
              .map((product) => (
                <div
                  key={product.id}
                  className='flex w-full items-center justify-between rounded-lg border p-4'
                >
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
                      !invoiceItems.every((item) => item.id !== product.id) ? 'error' : 'primary'
                    }
                    startIcon={
                      <Icon
                        icon={
                          !invoiceItems.every((item) => item.id !== product.id)
                            ? 'ic:round-delete'
                            : 'ic:round-add'
                        }
                        height={22}
                      />
                    }
                    variant='text'
                    size='small'
                    onClick={
                      invoiceItems.every((item) => item.id !== product.id)
                        ? () =>
                            setInvoiceItems((prev) => [
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
                            setInvoiceItems((prev) => prev.filter((item) => item.id !== product.id))
                    }
                  >
                    {!invoiceItems.every((item) => item.id !== product.id) ? t('Remove') : t('Add')}
                  </Button>
                </div>
              ))
          ) : (
            <div className='flex h-48  w-full items-center justify-center'>
              <h1 className='text-xl font-semibold'>{t('No Product Found')}</h1>
            </div>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default CreateEditInvoiceForm
