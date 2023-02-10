import React from 'react'
// assets
// hooks
import useResponsive from 'hooks/useResponsive'
import useTranslate from 'hooks/useTranslate'
// sections
import NewPasswordForm from 'sections/auth/NewPassword/NewPasswordForm'
// components
import Logo from '@/components/Logo'

export default function NewPassword() {
  const isDesktop = useResponsive('lg', 'up')
  const { t } = useTranslate()

  return (
    <main className='flex h-screen flex-col items-center justify-center'>
      {isDesktop && <Logo height={100} width={100} className='mb-5' />}
      <div className='container mx-auto flex flex-col items-center justify-center gap-5 px-10 sm:px-16 md:px-32 lg:w-1/2'>
        <h1 className='text-center text-5xl font-semibold'>{t('New Password')}</h1>
        <p className='text-center text-gray-600'>
          {t(
            "We've sent a 6-digit code to your email. Please enter the code in below box to verify your email"
          )}
        </p>
        <NewPasswordForm />
      </div>
    </main>
  )
}