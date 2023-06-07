import React from 'react'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
// next
import Head from 'next/head'
// hooks
import useTranslate from 'hooks/useTranslate'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// layout
import Layout from 'layout/Index'
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs'
import clsx from 'clsx'
import Button from 'components/Button'
import { Icon } from '@iconify/react'
import Progressbar from 'components/Progressbar'

function index() {
  const { t } = useTranslate()
  return (
    <>
      <Head>
        <title>{t('Warehousing')} | Pivot Point BMS</title>
      </Head>
      <div className='h-full w-full px-5'>
        <HeaderBreadcrumbs
          heading={t('Warehousing')}
          links={[
            { name: t('Dashboard'), href: PATH_DASHBOARD.root },
            { name: t('Supply Chain & Inventory'), href: PATH_DASHBOARD.scm.dashboard },
            { name: t('Warehousing') },
          ]}
        />
        <div className='grid w-full grid-cols-4 gap-5'>
          <div className='group relative h-48 w-full cursor-pointer rounded-lg bg-red-200/70 ring-secondary-400 transition-all hover:ring-4'>
            <HoverCardPrimitive.Root>
              <HoverCardPrimitive.Trigger asChild>
                <h1 className='absolute top-1/2 -left-2 -translate-y-1/2 rounded-lg bg-white p-4 text-xl font-semibold text-red-600 shadow-xl group-hover:bg-secondary-400 group-hover:text-white'>
                  A1
                </h1>
              </HoverCardPrimitive.Trigger>
              <HoverCardPrimitive.Content
                align='start'
                side='right'
                className={clsx(
                  ' data[side=top]:animate-slide-up data[side:bo=tom]:animate-slide-down',
                  'max-w-sm rounded-lg p-4 md:w-full',
                  'bg-white dark:bg-gray-800',
                  'focus-visible:ring-secondary-500-500 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75',
                  'shadow-xl'
                )}
              >
                <HoverCardPrimitive.Arrow className='fill-current text-white dark:text-gray-800' />

                <div className='flex h-full w-full flex-col space-y-4'>
                  <p className='text-lg font-semibold'>Section A1</p>
                  <p>
                    <span className='text-sm text-gray-600'>Capacity :</span> 400
                  </p>
                  <Progressbar progress={16} intent='secondary' />
                  <Button startIcon={<Icon icon='mdi:eye' />} variant='outlined' intent='secondary'>
                    {t('View Details')}
                  </Button>
                </div>
              </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Root>
            <div className='h-full w-1/6 rounded-lg bg-red-600'></div>
          </div>
          <div className='group relative h-48 w-full cursor-pointer rounded-lg bg-orange-200/70 ring-secondary-400 transition-all hover:ring-4'>
            <h1 className='absolute top-1/2 -left-2 -translate-y-1/2 rounded-lg bg-white p-4 text-xl font-semibold text-orange-600 shadow-xl group-hover:bg-secondary-400 group-hover:text-white'>
              A1
            </h1>
            <div className='h-full w-1/3 rounded-lg bg-orange-600'></div>
          </div>

          <div className='group relative h-48 w-full cursor-pointer rounded-lg bg-blue-200/70 ring-secondary-400 transition-all hover:ring-4'>
            <h1 className='absolute top-1/2 -left-2 -translate-y-1/2 rounded-lg bg-white p-4 text-xl font-semibold text-blue-600 shadow-xl group-hover:bg-secondary-400 group-hover:text-white'>
              A1
            </h1>
            <div className='h-full w-3/5 rounded-lg bg-blue-600'></div>
          </div>
          <div className='group relative h-48 w-full cursor-pointer rounded-lg bg-green-200/70 ring-secondary-400 transition-all hover:ring-4'>
            <h1 className='absolute top-1/2 -left-2 -translate-y-1/2 rounded-lg bg-white p-4 text-xl font-semibold text-green-600 shadow-xl group-hover:bg-secondary-400 group-hover:text-white'>
              A1
            </h1>
            <div className='h-full w-4/5 rounded-lg bg-green-600'></div>
          </div>
        </div>
      </div>
    </>
  )
}

index.getLayout = function getLayout(page: JSX.Element) {
  return <Layout variant='dashboard'>{page}</Layout>
}

export default index
