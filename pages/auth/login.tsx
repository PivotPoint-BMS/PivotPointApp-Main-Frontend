/* eslint-disable quotes */
import React, { useEffect, useState } from 'react'
// next
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
// routes
import { PATH_AUTH } from 'routes/paths'
// hooks
import { useAppSelector } from 'store/hooks'
import useResponsive from 'hooks/useResponsive'
import useTranslate from 'hooks/useTranslate'
// sections
import LoginForm from 'sections/auth/login/LoginForm'
// components
import { Logo } from 'components'
import Layout from 'layout/Index'

function Login() {
  const isDesktop = useResponsive('lg', 'up')
  const { t } = useTranslate()
  const { push, pathname } = useRouter()
  const { refreshToken } = useAppSelector((state) => state.session)
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null)

  useEffect(() => {
    if (refreshToken)
      if (requestedLocation && pathname !== requestedLocation) {
        push(requestedLocation)
        setRequestedLocation(null)
      }
  }, [push, refreshToken])

  return (
    <>
      <Head>
        <title>Pivot Point BMS | {t('Login')}</title>
      </Head>
      <main className='flex h-screen flex-col items-center justify-center'>
        {isDesktop && <Logo height={100} width={100} className='mb-5' />}
        <div className='container mx-auto flex flex-col items-center justify-center gap-5 px-10 sm:px-16 md:px-32 lg:w-1/2'>
          <h1 className='text-5xl font-semibold'>{t('Login')}</h1>
          <p className='text-center text-gray-600 dark:text-gray-400'>
            {t("Don't have an account?")}{' '}
            <span>
              <Link
                className='font-medium text-primary-600 hover:underline focus:underline focus:outline-none dark:text-primary-200'
                href={PATH_AUTH.register}
              >
                {t('Sign up now')}
              </Link>
            </span>
          </p>
          <LoginForm />
        </div>
      </main>
    </>
  )
}

Login.getLayout = function getLayout(page: JSX.Element) {
  return <Layout variant='main'>{page}</Layout>
}

export default Login
