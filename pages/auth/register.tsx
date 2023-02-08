import React from 'react'
// next
import Link from 'next/link'
// routes
import { PATH_AUTH } from 'routes/paths'
// hooks
import useResponsive from 'hooks/useResponsive'
import useTranslate from 'hooks/useTranslate'
// sections
import RegisterForm from 'sections/auth/Register/RegisterForm'
// components
import Logo from '@/components/Logo'
import Card from '@/components/Card'
import CardContent from '@/components/CardContent'

export default function Register() {
  const isDesktop = useResponsive('lg', 'up')
  const { t } = useTranslate()

  return (
    <main className='flex h-screen flex-col items-center justify-center bg-gradient-to-r from-primary-500/50 to-secondary-500/50'>
      {isDesktop && <Logo height={80} width={80} className='mb-5' />}
      <Card className='h-full !w-full overflow-hidden rounded-none md:h-4/6 md:!w-3/4 lg:!w-3/5 lg:!rounded-xl'>
        <div className='flex h-full items-center'>
          <CardContent className='flex h-full flex-grow flex-col items-center justify-center gap-5 !p-10 sm:!p-28 md:w-1/2 md:!p-28 lg:!p-10 xl:!p-14'>
            <h1 className='text-3xl font-semibold'>{t('Register')}</h1>
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
          </CardContent>
          {isDesktop && (
            <div className='flex h-full w-1/2 items-center justify-center bg-gradient-to-b from-primary-100 to-secondary-100'>
              Something
            </div>
          )}
        </div>
      </Card>
    </main>
  )
}
