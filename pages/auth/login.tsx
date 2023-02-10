import React from 'react'
// next
import Link from 'next/link'
// routes
import { PATH_AUTH } from 'routes/paths'
// assets
// hooks
import useResponsive from 'hooks/useResponsive'
import useTranslate from 'hooks/useTranslate'
// sections
import LoginForm from 'sections/auth/login/LoginForm'
// components
import Logo from '@/components/Logo'

export default function Login() {
  const isDesktop = useResponsive('lg', 'up')
  const { t } = useTranslate()

  return (
    <main className='flex h-screen flex-col items-center justify-center'>
      {isDesktop && <Logo height={100} width={100} className='mb-5' />}
      <div className='container mx-auto flex flex-col items-center justify-center gap-5 px-10 sm:px-16 md:px-32 lg:w-1/2'>
        <h1 className='text-5xl font-semibold'>{t('Login')}</h1>
        <p className='text-center'>
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
  )
}
