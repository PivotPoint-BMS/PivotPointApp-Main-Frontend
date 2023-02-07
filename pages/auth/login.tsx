import React from 'react'
// next
import Image from 'next/image'
import Link from 'next/link'
// routes
import { PATH_AUTH } from 'routes/paths'
// assets
import loginIllustration from 'public/Fingerprint-bro.svg'
// hooks
import useResponsive from 'hooks/useResponsive'
// components
import Logo from '@/components/Logo'
import LoginForm from '../../sections/auth/login/LoginForm'

export default function Login() {
  const isDesktop = useResponsive('lg', 'up')
  return (
    <main className='flex h-screen'>
      {isDesktop && (
        <div className='flex flex-1 items-center justify-center bg-primary-100 dark:bg-primary-800'>
          <Image src={loginIllustration} alt='login' className='h-full' />
        </div>
      )}
      <div className='flex w-full flex-col items-center justify-center px-10 sm:px-24  md:px-52 lg:w-1/2 lg:px-28 xl:px-36'>
        <Logo height={100} width={100} className='mb-5' />
        <h1 className='mb-5 text-4xl font-semibold'>Login</h1>
        <p className='mb-5'>
          Don't have an account?{' '}
          <span>
            <Link
              className='font-medium text-primary-600 dark:text-primary-200'
              href={PATH_AUTH.register}
            >
              Get started
            </Link>
          </span>
        </p>
        <LoginForm />
      </div>
    </main>
  )
}
