/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react'
import clsx from 'clsx'
// radix
import * as TabsPrimitive from '@radix-ui/react-tabs'
// next
import Head from 'next/head'
import { useRouter } from 'next/router'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// hooks
import useTranslate from 'hooks/useTranslate'
import useResponsive from 'hooks/useResponsive'
import { useAppSelector } from 'store/hooks'
import { useCheckPaymentQuery } from 'store/api/auth/paymentApi'
// sections
import CompletePayment from 'sections/auth/company-setup/CompletePayment'
// layout
import Layout from 'layout'
// components
import { Icon as Iconify } from '@iconify/react'
// pages
import Login from './login'

const Tabs = [
  { name: 'Setup Company', value: '1' },
  { name: 'Setup Workers', value: '2' },
  { name: 'Choose Subscription', value: '3' },
  { name: 'Complete Payment', value: '4' },
]

function index() {
  const { push, reload } = useRouter()
  const isDesktop = useResponsive('md', 'up')
  const { isLoading, isSuccess } = useCheckPaymentQuery()
  const { refreshToken, user } = useAppSelector((state) => state.session)
  const { t, locale } = useTranslate()

  useEffect(() => {
    if (!user && refreshToken) push(PATH_DASHBOARD.root)
  }, [push, refreshToken])

  useEffect(() => {
    if (!isLoading && isSuccess) reload()
  }, [isLoading, isSuccess])

  if (!user) return <Login />

  return (
    <>
      <Head>
        <title>Pivot Point BMS | {t('Payment')}</title>
      </Head>
      <main className='flex h-screen flex-col items-center'>
        <TabsPrimitive.Root
          defaultValue='4'
          className='h-full w-full'
          value='4'
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
        >
          <TabsPrimitive.List
            className={clsx(
              'fixed top-0 right-0 z-20 flex w-full items-center justify-between overflow-y-hidden bg-white sm:overflow-hidden',
              'dark:bg-dark'
            )}
          >
            {Tabs.map((item, i) => (
              <TabsPrimitive.Trigger
                key={i}
                value={item.value}
                className={clsx(
                  'dark: flex h-16 min-w-fit flex-1 items-center justify-start gap-3 border-b-2 border-r p-3',
                  item.value !== '4'
                    ? 'opacity-50'
                    : 'border-b-primary-500 dark:border-b-primary-300'
                )}
              >
                <div className='flex h-12 w-full items-center justify-center rounded-full bg-gray-100 p-4 dark:bg-secondary-800 md:w-12'>
                  <span className='text-xl font-medium'>
                    {item.value !== '4' ? (
                      <Iconify
                        className='text-green-600'
                        icon='material-symbols:check-small-rounded'
                        height={32}
                        width={32}
                      />
                    ) : (
                      i + 1
                    )}
                  </span>
                </div>
                {isDesktop && (
                  <div className=' flex flex-col items-start'>
                    <p className={clsx('text-xs font-medium')}>
                      {item.value === '4' ? (
                        <span className='text-secondary-600 dark:text-secondary-300'>
                          {t('Current')}
                        </span>
                      ) : (
                        <span className='text-green-600 dark:text-green-300'>{t('Completed')}</span>
                      )}
                    </p>
                    <h6 className='font-medium'>{t(item.name)}</h6>
                  </div>
                )}
              </TabsPrimitive.Trigger>
            ))}
          </TabsPrimitive.List>
          <TabsPrimitive.Content
            value='4'
            className={clsx('mt-12 h-full bg-gray-100/50 py-6 dark:bg-dark')}
          >
            <CompletePayment />
          </TabsPrimitive.Content>
        </TabsPrimitive.Root>
      </main>
    </>
  )
}
index.getLayout = function getLayout(page: JSX.Element) {
  return <Layout variant='dashboard'>{page}</Layout>
}

export default index
