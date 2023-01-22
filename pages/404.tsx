import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import Button from '../components/Button'
import error from '../public/404.svg'

export default function Custom404Page() {
  const router = useRouter()

  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center'>
      <Image src={error} alt='404 Error' loading='lazy' />
      <h1 className='mb-10 text-5xl font-semibold text-primary-600'>Page Not Found</h1>
      <Button onClick={() => router.push('/')}>Back Home</Button>
    </div>
  )
}
