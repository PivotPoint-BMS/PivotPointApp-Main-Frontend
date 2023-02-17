/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react'
import clsx from 'clsx'
// radix
import * as TabsPrimitive from '@radix-ui/react-tabs'
// next
import { useRouter } from 'next/router'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// hooks
import useTranslate from 'hooks/useTranslate'
import useResponsive from 'hooks/useResponsive'
import { useAppSelector } from 'store/hooks'
import { useCheckPaymentQuery } from 'store/api/paymentApi'
// sections
import CompletePayment from 'sections/auth/company-setup/CompletePayment'
// components
import { Icon as Iconify } from '@iconify/react'

const Tabs = [
  { name: 'Setup Company', value: '1' },
  { name: 'Setup Workers', value: '2' },
  { name: 'Choose Subscription', value: '3' },
  { name: 'Complete Payment', value: '4' },
]

export default function Payment() {
  const { push } = useRouter()
  const isDesktop = useResponsive('md', 'up')
  const { isLoading, isSuccess, isError } = useCheckPaymentQuery()
  const user = useAppSelector((state) => state.session.user)
  const { t, locale } = useTranslate()

  useEffect(() => {
    if (user && user.hasPaidSubscription) {
      push(PATH_DASHBOARD.root)
    }
  }, [user])

  useEffect(() => {
    if (!isLoading && isSuccess) push(PATH_DASHBOARD.root)
  }, [isLoading, isSuccess])

  return (
    <main className='flex h-screen flex-col items-center'>
      <TabsPrimitive.Root
        defaultValue='4'
        className='h-full w-full'
        value='4'
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
      >
        <TabsPrimitive.List
          className={clsx(
            'fixed top-0 right-0 z-20 flex w-full items-center justify-between overflow-y-hidden bg-white sm:overflow-hidden'
          )}
        >
          {Tabs.map((item, i) => (
            <TabsPrimitive.Trigger
              key={i}
              value={item.value}
              className={clsx(
                'flex h-16 min-w-fit flex-1 items-center justify-start gap-3 border-b-2 border-r p-3',
                item.value !== '4' ? 'opacity-50' : 'border-b-primary-500'
              )}
            >
              <div className='flex h-12 w-full items-center justify-center rounded-full bg-gray-100 p-4 md:w-12'>
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
                  <p
                    className={clsx(
                      'text-xs font-medium',
                      item.value !== '4' && 'text-secondary-600'
                    )}
                  >
                    {item.value === '4' ? (
                      <span className='text-secondary-600'>{t('Current')}</span>
                    ) : (
                      <span className='text-green-600'>{t('Completed')}</span>
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
          className={clsx('mt-12 h-full bg-gray-100/50 py-6 dark:bg-secondary-900')}
        >
          <CompletePayment />
        </TabsPrimitive.Content>
      </TabsPrimitive.Root>
    </main>
  )
}
