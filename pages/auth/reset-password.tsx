import React from 'react'
// assets
// hooks
import useResponsive from 'hooks/useResponsive'
import useTranslate from 'hooks/useTranslate'
// sections
import ResetPasswordForm from 'sections/auth/ResetPassword/ResetPasswordForm'
// components
import Logo from '@/components/Logo'

export default function ResetPassword() {
  const isDesktop = useResponsive('lg', 'up')
  const { t } = useTranslate()

  return (
    <main className='flex h-screen flex-col items-center justify-center'>
      {isDesktop && <Logo height={100} width={100} className='mb-5' />}
      <div className='container mx-auto flex flex-col items-center justify-center gap-10 px-10 sm:px-16 md:px-32 lg:w-1/2'>
        <h1 className='text-4xl font-semibold'>{t('Reset Password')}</h1>
        <ResetPasswordForm />
      </div>
    </main>
  )
}
