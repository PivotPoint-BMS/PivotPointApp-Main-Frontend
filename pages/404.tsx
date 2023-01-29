import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

// assets
import error from 'public/404.svg'
import errorDark from 'public/404-dark.svg'

// hooks
import useTranslate from 'hooks/useTranslate'

// components
import Button from '@/components/Button'

export default function Custom404Page() {
  const router = useRouter()
  const { t } = useTranslate()
  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center dark:bg-primary-900'>
      <Image
        src={error}
        alt='404 Error'
        className='dark:hidden'
        priority
        height={400}
        width={400}
      />
      <Image
        src={errorDark}
        alt='404 Error'
        className='hidden dark:block'
        priority
        height={400}
        width={400}
      />
      <h1 className='mb-10 text-6xl font-semibold text-primary-600 dark:text-white'>
        {t('Page Not Found')}
      </h1>
      <Button onClick={() => router.push('/')}>{t('Back Home')}</Button>
    </div>
  )
}
