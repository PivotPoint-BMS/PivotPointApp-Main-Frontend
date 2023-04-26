import React, { useEffect } from 'react'
// next
import { useRouter } from 'next/router'
import Link from 'next/link'
// hooks
import useTranslate from 'hooks/useTranslate'
import { useAppSelector } from 'store/hooks'
// api
import { useCheckPaymentQuery } from 'store/api/paymentApi'
import { useGetUserMutation } from 'store/api/authApi'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// components
import { Icon as Iconify } from '@iconify/react'
import { Button } from 'components'
import MotionContainer from 'components/animate/MotionContainer'

export default function CompletePayment() {
  const { t } = useTranslate()
  const { reload } = useRouter()
  const { isSuccess } = useCheckPaymentQuery(undefined, { pollingInterval: 2000 })
  const { user, refreshToken } = useAppSelector((state) => state.session)
  const [getUser] = useGetUserMutation()

  useEffect(() => {
    if (!user && refreshToken) getUser(refreshToken)
    if (user?.tier === 0) reload()
    if (isSuccess) reload()
  }, [])

  return (
    <>
      <MotionContainer>
        <div className='container relative mx-auto flex h-full flex-col items-center justify-center gap-5 rounded-xl bg-white px-5 py-10 shadow-md dark:bg-secondary-900 dark:text-white sm:px-16 md:px-20 lg:w-1/2'>
          <div className='flex h-full w-full flex-col items-center gap-6'>
            {!isSuccess ? (
              <>
                {' '}
                <h1 className='text-3xl font-semibold text-secondary-900 dark:text-white'>
                  {t('Complete your payment')}
                </h1>
                <p className='text-center text-gray-600 dark:text-gray-300'>
                  {t('Click the button below to complete the payments')}
                </p>
                {user?.tier === 1 && (
                  <Button data-sellix-product='63e407b2bb477' type='submit'>
                    {t('Proceed to payment')}
                  </Button>
                )}
                {user?.tier === 2 && (
                  <Button data-sellix-product='63e515a654cb4' type='submit'>
                    {t('Proceed to payment')}
                  </Button>
                )}
              </>
            ) : (
              <div className='flex flex-col items-center justify-center gap-5'>
                <div className='flex h-28 w-28 items-center justify-center rounded-full bg-gray-100 p-4 dark:bg-secondary-700'>
                  <Iconify
                    className='text-green-600'
                    icon='material-symbols:check-small-rounded'
                    height={48}
                    width={48}
                  />{' '}
                </div>
                <h1 className='text-center text-xl font-semibold'>
                  {t('Your subscription payment has been successfully processed')}
                </h1>
                <p className='text-center text-sm leading-7'>{t('PAYMENT_MESSAGE')}</p>
                <Link href={PATH_DASHBOARD.root}>
                  <Button>{t('Go to Dashboard')}</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </MotionContainer>
    </>
  )
}
