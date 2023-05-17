import React from 'react'
// next
import Head from 'next/head'
// hooks
import useResponsive from 'hooks/useResponsive'
import useTranslate from 'hooks/useTranslate'
// sections
import ResetPasswordForm from 'sections/auth/reset-password/ResetPasswordForm'
// layout
import Layout from 'layout'
// components
import { Logo } from 'components'

function index() {
  const isDesktop = useResponsive('lg', 'up')
  const { t } = useTranslate()

  return (
    <>
      <Head>
        <title>Pivot Point BMS | {t('Reset Password')}</title>
      </Head>
      <main className='flex h-screen flex-col items-center justify-center'>
        {isDesktop && <Logo height={100} width={100} className='mb-5' />}
        <div className='container mx-auto flex flex-col items-center justify-center gap-5 px-10 sm:px-16 md:px-32 lg:w-1/2'>
          <h1 className='text-4xl font-semibold'>{t('Reset Password')}</h1>
          <p className='text-center text-gray-600 dark:text-gray-400'>
            {t(
              'Please enter the email address associated with your account and We will email you a link to reset your password'
            )}
          </p>
          <ResetPasswordForm />
        </div>
      </main>
    </>
  )
}
index.getLayout = function getLayout(page: JSX.Element) {
  return <Layout variant='dashboard'>{page}</Layout>
}

export default index
