import React, { useEffect, useState } from 'react'
import moment from 'moment'
// next
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
// apis
import { skipToken } from '@reduxjs/toolkit/dist/query'
import {
  useArrivedDeliveryMutation,
  useCompletedDeliveryMutation,
  useGetDeliveryQuery,
  useInTransmitDeliveryMutation,
} from 'store/api/scm/transportation/deliveriesApis'
// hooks
import useTranslate from 'hooks/useTranslate'
import { useAppSelector } from 'store/hooks'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// config
import { DELIVERY_STATUS, PIVOTPOINT_API } from 'config'
// layout
import Layout from 'layout/Index'
// components
import { PDFViewer } from '@react-pdf/renderer'
import { Icon } from '@iconify/react'
import {
  Backdrop,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  IconButton,
  LoadingIndicator,
  Select,
  Tooltip,
} from 'components'
// sections
import DelivetyToPrint from 'sections/dashboard/scm/transportation/deliveries/print/DelivetyToPrint'
import { useGetCompanyDetailsQuery } from 'store/api/settings/settingsAPIs'

function index() {
  const { t } = useTranslate()
  const {
    query: { id },
  } = useRouter()
  const [status, setStatus] = useState(0)
  // Pogination
  const { PageSize, PageNumber } = useAppSelector((state) => state.paggination)
  // Query
  const { data, isLoading, isSuccess } = useGetDeliveryQuery(
    id?.toString() ? id?.toString() : skipToken
  )
  const {
    data: company,
    isLoading: isCompanyLoading,
    isSuccess: isCompanySuccess,
  } = useGetCompanyDetailsQuery()
  // Mutation
  const [inTransmitDelivery, { isLoading: isInTransmitDeliveryLoading }] =
    useInTransmitDeliveryMutation()
  const [arrivedDelivery, { isLoading: isArrivedDeliveryLoading }] = useArrivedDeliveryMutation()
  const [completedDelivery, { isLoading: isCompletedDeliveryLoading }] =
    useCompletedDeliveryMutation()

  useEffect(() => {
    if (isSuccess) setStatus(data.data.currentStatus || 0)
  }, [data])

  if (isLoading || isCompanyLoading)
    return (
      <>
        <Head>
          <title>{t('Delivery Details')} | Pivot Point BMS</title>
        </Head>
        <div className='flex h-full w-full items-center justify-center'>
          <LoadingIndicator />
        </div>
      </>
    )
  if (isSuccess && isCompanySuccess)
    return (
      <>
        <Head>
          <title>{t('Delivery Details')} | Pivot Point BMS</title>
        </Head>
        <div className='px-5'>
          <div className='mb-10 grid grid-cols-1 items-start justify-start gap-2 md:grid-cols-2'>
            <div className='flex items-center gap-2'>
              <Tooltip title={t('Back to deliveries')}>
                <Link href={PATH_DASHBOARD.scm.transportation.root}>
                  <IconButton>
                    <Icon icon='ion:chevron-back' height={22} />
                  </IconButton>
                </Link>
              </Tooltip>
              <div>
                <div className='flex items-center gap-2'>
                  <h1 className='text-3xl font-bold'>{data.data.transportationTitle}</h1>
                  {status === 0 && (
                    <Badge variant='contained' intent='info' label={t('Initiated')} />
                  )}
                  {status === 1 && (
                    <Badge variant='contained' intent='warning' label={t('In Transmit')} />
                  )}
                  {status === 2 && (
                    <Badge
                      variant='contained'
                      intent='secondary'
                      label={t('Arrived to Destination')}
                    />
                  )}
                  {status === 3 && (
                    <Badge variant='contained' intent='success' label={t('Completed')} />
                  )}
                </div>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  {moment(data.data.checkingDate).format('LLLL')}
                </p>
              </div>
            </div>
            <div className='flex w-full items-center justify-end gap-2'>
              <Select
                items={DELIVERY_STATUS.map((item) => ({
                  label: t(item.label),
                  value: item.value.toString(),
                }))}
                value={status.toString()}
                onValueChange={(value) => {
                  if (value === '1') {
                    setStatus(1)
                    inTransmitDelivery({ id: data.data.id, PageNumber, PageSize })
                  } else if (value === '2') {
                    setStatus(2)
                    arrivedDelivery({ id: data.data.id, PageNumber, PageSize })
                  } else if (value === '3') {
                    setStatus(3)
                    completedDelivery({ id: data.data.id, PageNumber, PageSize })
                  }
                }}
              />
              <Button
                variant='outlined'
                intent='default'
                startIcon={<Icon icon='ic:print' height={18} />}
              >
                {t('Print Invoice')}
              </Button>
            </div>
          </div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
            <div className='order-2 space-y-4 md:order-1 md:col-span-2'>
              <Card fullWidth>
                <CardHeader title={<h6 className='text-xl font-bold'>{t('Details')}</h6>} />
                <CardContent>
                  <div className='space-y-2 divide-y divide-dashed overflow-auto dark:divide-gray-600'>
                    {data.data.deliveryItems.map((item) => (
                      <div className='grid min-w-[600px] grid-cols-6 items-center gap-2 py-2'>
                        <div className='col-span-4 flex items-center gap-2'>
                          {item.picture ? (
                            <Image
                              alt={item.name}
                              width={48}
                              height={48}
                              src={`${PIVOTPOINT_API.scmPicUrl}/${item.picture}`}
                              className='aspect-square h-12 w-12 rounded-full object-cover'
                            />
                          ) : (
                            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 dark:bg-paper-dark-contrast'>
                              <Icon icon='ic:round-no-photography' height={20} />
                            </div>
                          )}
                          <p className='flex-1 font-semibold'>{item.name}</p>
                        </div>
                        <p>x{item.quantity}</p>
                        <p className='text-right'>
                          {item.value} {t('Da')}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className='flex w-full flex-col items-end gap-4 border-t border-dashed pt-2 dark:border-gray-600'>
                    <div className='flex max-w-full items-center justify-between '>
                      <p className='text-sm font-medium  text-gray-600 dark:text-gray-400'>
                        {t('Shipping')}:
                      </p>{' '}
                      <p className='w-40 ltr:text-right rtl:text-left'>
                        {data.data.deliveryCost} {t('Da')}
                      </p>
                    </div>
                    <div className='flex max-w-full items-center justify-between '>
                      <p className='text-sm font-medium  text-gray-600 dark:text-gray-400'>
                        {t('Subtotal')}:
                      </p>{' '}
                      <p className='w-40 ltr:text-right rtl:text-left'>
                        {data.data.deliveryItems.reduce(
                          (acc, cur) => acc + cur.value * cur.quantity,
                          0
                        ) || 0}{' '}
                        {t('Da')}
                      </p>
                    </div>
                    <div className='flex max-w-full items-center justify-between '>
                      <p className='font-bold'>{t('Total')}:</p>{' '}
                      <p className='w-40 font-bold ltr:text-right rtl:text-left'>
                        {(data.data.deliveryItems.reduce(
                          (acc, cur) => acc + cur.value * cur.quantity,
                          0
                        ) || 0) + data.data.deliveryCost}{' '}
                        {t('Da')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card fullWidth>
                <CardHeader title={<h6 className='text-xl font-bold'>{t('History')}</h6>} />
                <CardContent>
                  <ol className='relative border-l border-gray-200 dark:border-gray-700 '>
                    <li className='mb-10 ml-4'>
                      <div className='absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-paper-dark-contrast dark:bg-gray-600'></div>
                      <h3 className='text-lg font-semibold dark:text-white'>
                        {t('Order has been created')}
                      </h3>
                      <time className='darktext-white mb-1 text-sm font-medium leading-none text-gray-400'>
                        {moment(data.data.checkingDate).format('LLLL')}
                      </time>
                    </li>
                    {data.data.inTransit && (
                      <li className='mb-10 ml-4'>
                        <div className='absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-orange-200 dark:border-paper-dark-contrast dark:bg-orange-600'></div>
                        <h3 className='text-lg font-semibold dark:text-white'>
                          {t('In Transmit')}
                        </h3>
                        <time className='darktext-white mb-1 text-sm font-medium leading-none text-gray-400'>
                          {moment(data.data.inTransit).format('LLLL')}
                        </time>
                      </li>
                    )}
                    {data.data.arrivedAtDest && (
                      <li className='mb-10 ml-4'>
                        <div className='absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-blue-200 dark:border-paper-dark-contrast dark:bg-blue-600'></div>
                        <h3 className='text-lg font-semibold dark:text-white'>
                          {t('Arrived At Destination')}
                        </h3>
                        <time className='darktext-white mb-1 text-sm font-medium leading-none text-gray-400'>
                          {moment(data.data.arrivedAtDest).format('LLLL')}
                        </time>
                      </li>
                    )}
                    {data.data.deliveryComplete && (
                      <li className='mb-10 ml-4'>
                        <div className='absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border-white bg-green-200 dark:border-paper-dark-contrast dark:bg-green-600'></div>
                        <h3 className='text-lg font-semibold dark:text-white'>
                          {t('Delivery successful')}
                        </h3>
                        <time className='darktext-white mb-1 text-sm font-medium leading-none text-gray-400'>
                          {moment(data.data.deliveryComplete).format('LLLL')}
                        </time>
                      </li>
                    )}
                    {data.data.expectedArrival && !data.data.arrivedAtDest && (
                      <li className='mb-10 ml-4'>
                        <div className='absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-primary-200 dark:border-paper-dark-contrast dark:bg-primary-600'></div>
                        <h3 className='text-lg font-semibold dark:text-white'>
                          {t('Expected Arrival')}
                        </h3>
                        <time className='darktext-white mb-1 text-sm font-medium leading-none text-gray-400'>
                          {moment(data.data.expectedArrival).format('LLLL')}
                        </time>
                      </li>
                    )}
                  </ol>{' '}
                </CardContent>
              </Card>
            </div>
            <Card fullWidth className='order-1 h-fit md:order-2'>
              <CardHeader title={<h6 className='text-xl font-bold'>{t('From')}</h6>} />
              <CardContent className='space-y-2'>
                {(data.data.type === 1 || data.data.type === 2) && (
                  <div className='flex items-center justify-start gap-2'>
                    <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                      {t('Warehouse')}:
                    </p>
                    <p>{data.data.warehouseStart}</p>
                  </div>
                )}
                <div className='flex items-center justify-start gap-2'>
                  <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                    {t('Address')}:
                  </p>
                  <p>{data.data.startingAddress}</p>
                </div>
              </CardContent>
              <CardHeader title={<h6 className='text-xl font-bold'>{t('To')}</h6>} />
              <CardContent className='space-y-2'>
                {data.data.type === 1 && (
                  <div className='flex items-center justify-start gap-2'>
                    <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                      {t('Client')}:
                    </p>
                    <p>{data.data.clientName}</p>
                  </div>
                )}
                {data.data.type === 2 && (
                  <div className='flex items-center justify-start gap-2'>
                    <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                      {t('Warehouse')}:
                    </p>
                    <p>{data.data.warehouseEnd}</p>
                  </div>
                )}
                {data.data.type === 3 && data.data.supplier && (
                  <div className='flex items-center justify-start gap-2'>
                    <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                      {t('Supplier')}:
                    </p>
                    <p>{data.data.supplier?.name}</p>
                  </div>
                )}
                <div className='flex items-center justify-start gap-2'>
                  <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                    {t('Address')}:
                  </p>
                  <p>{data.data.stoppingAddress}</p>
                </div>
              </CardContent>
              <CardHeader title={<h6 className='text-xl font-bold'>{t('Driver Info')}</h6>} />
              <CardContent className='space-y-2'>
                <div className='flex items-center justify-start gap-2'>
                  <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                    {t('Driver Name')}:
                  </p>
                  <p>{data.data.driverName}</p>
                </div>
                <div className='flex items-center justify-start gap-2'>
                  <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                    {t('Driver Contact')}:
                  </p>
                  <p>{data.data.driverContact}</p>
                </div>
                <div className='flex items-center justify-start gap-2'>
                  <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                    {t('Vehicle')}:
                  </p>
                  <p>
                    {data.data.vehicule.model} | {data.data.vehicule.code}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Backdrop
          open={
            isInTransmitDeliveryLoading || isArrivedDeliveryLoading || isCompletedDeliveryLoading
          }
          loading={
            isInTransmitDeliveryLoading || isArrivedDeliveryLoading || isCompletedDeliveryLoading
          }
        />
        <Dialog open={false}>
          <div className='h-full overflow-hidden '>
            <PDFViewer width='100%' height='100%' style={{ border: 'none' }}>
              <DelivetyToPrint delivery={data.data} company={company.data} />
            </PDFViewer>
          </div>
        </Dialog>
      </>
    )
  return (
    <>
      <Head>
        <title>{t('Delivery Details')} | Pivot Point BMS</title>
      </Head>
      <div className='flex h-full w-full items-center justify-center'>
        <div>{t('Delivery Not Found')}</div>
      </div>
    </>
  )
}

index.getLayout = function getLayout(page: JSX.Element) {
  return <Layout variant='dashboard'>{page}</Layout>
}

export default index
