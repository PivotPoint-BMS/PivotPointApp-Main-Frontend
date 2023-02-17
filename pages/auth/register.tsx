/* eslint-disable quotes */
import React from 'react'
// next
import Link from 'next/link'
// routes
import { PATH_AUTH, PATH_PAGE } from 'routes/paths'
// hooks
import useResponsive from 'hooks/useResponsive'
import useTranslate from 'hooks/useTranslate'
// sections
import RegisterForm from 'sections/auth/register/RegisterForm'
// components
import Logo from '@/components/Logo'

export default function Register() {
  const isDesktop = useResponsive('lg', 'up')
  const { t } = useTranslate()

  return (
    <main className='flex h-screen flex-col items-center justify-center'>
      {isDesktop && <Logo height={100} width={100} className='mb-5' />}
      <div className='container mx-auto flex flex-col items-center justify-center gap-5 px-10 sm:px-16 md:px-32 lg:w-1/2'>
        <h1 className='text-5xl font-semibold'>{t('Register')}</h1>
        <p className='text-center'>
          {t('Already have an account?')}{' '}
          <span>
            <Link
              className='font-medium text-primary-600 hover:underline focus:underline focus:outline-none dark:text-primary-200'
              href={PATH_AUTH.login}
            >
              {t('Sign in')}
            </Link>
          </span>
        </p>
        <RegisterForm />
        <p className='text-center text-xs text-gray-600 dark:text-gray-400'>
          {t("By registering, I agree to PivotPoint BMS's")}{' '}
          <Link
            href={PATH_PAGE.termOfService}
            className='font-medium text-primary-600 hover:underline focus:underline focus:outline-none dark:text-primary-200'
          >
            {t('Terms of Service')}
          </Link>{' '}
          {t('and')}{' '}
          <Link
            href={PATH_PAGE.termOfService}
            className='font-medium text-primary-600 hover:underline focus:underline focus:outline-none dark:text-primary-200'
          >
            {t('Privacy Policy')}
          </Link>
          .
        </p>
      </div>
    </main>
  )
}
