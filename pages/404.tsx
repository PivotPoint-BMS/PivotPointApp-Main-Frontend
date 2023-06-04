import React from 'react'
// hooks
import useTranslate from 'hooks/useTranslate'
import Image from 'components/Image'
// assets
import notFound from 'public/404.png'
import Button from 'components/Button'
import Link from 'next/link'

export default function Custom404() {
  const { t } = useTranslate()
  return (
    <div className='flex h-screen w-screen items-center justify-center bg-gray-50 text-rich-black dark:bg-dark dark:text-white'>
      <div className='flex max-w-md flex-col items-center justify-center gap-5 text-center'>
        <h1 className='text-4xl font-semibold'>{t('Sorry, page not found!')}</h1>
        <p className='text-gray-600'>
          {t(
            'Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your spelling.'
          )}
        </p>
        <Image src={notFound.src} height='100%' width='95%' />
        <Link href='/'>
          <Button size='large'>{t('Go To Home')}</Button>
        </Link>
      </div>
    </div>
  )
}
