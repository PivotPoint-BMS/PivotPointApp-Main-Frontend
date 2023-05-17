/* eslint-disable no-nested-ternary */
import React, { useState } from 'react'
import clsx from 'clsx'
// radix
import * as TabsPrimitive from '@radix-ui/react-tabs'
// framer motion
import { motion } from 'framer-motion'
// hooks
import useResponsive from 'hooks/useResponsive'
import useTranslate from 'hooks/useTranslate'
// components
import { Icon } from '@iconify/react'

const Tabs = [
  { name: 'Step 1', value: '1' },
  { name: 'Step 2', value: '2' },
  { name: 'Step 3', value: '3' },
  { name: 'Step 4', value: '4' },
]

export default function QuickSetup({ open }: { open: boolean }) {
  const isDesktop = useResponsive('md', 'up')
  const { t, locale } = useTranslate()
  const [step] = useState('1')

  return (
    <motion.div
      initial='close'
      animate={open ? 'open' : 'close'}
      variants={{
        close: {
          y: '100%',
        },
        open: { y: 0 },
      }}
      transition={{ type: 'keyframes', duration: 0.4 }}
      className='fixed top-0 right-0 z-[999] flex h-screen w-screen flex-col items-center'
    >
      <TabsPrimitive.Root
        defaultValue='tab1'
        className='h-full w-full'
        value={step}
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
      >
        <TabsPrimitive.List
          className={clsx(
            'fixed top-0 right-0 z-20 flex w-full items-center justify-between overflow-y-hidden bg-white  sm:overflow-hidden',
            'dark:bg-dark'
          )}
        >
          {Tabs.map((item, i) => (
            <TabsPrimitive.Trigger
              key={i}
              value={item.value}
              className={clsx(
                'flex h-16 min-w-fit flex-1 items-center justify-start gap-3 border-b-2 border-r p-3 dark:border-gray-300',
                step === item.value
                  ? 'border-b-primary-500 dark:border-b-primary-300'
                  : 'opacity-50'
              )}
            >
              <div className='flex h-12 w-full items-center justify-center rounded-full bg-gray-100 p-4 dark:bg-secondary-800 md:w-12'>
                <span className='text-xl font-medium'>
                  {Number(step) > Number(item.value) ? (
                    <Icon
                      className='text-green-600'
                      icon='material-symbols:check-small-rounded'
                      height={32}
                      width={32}
                    />
                  ) : (
                    i + 1
                  )}
                </span>
              </div>
              {isDesktop && (
                <div className=' flex flex-col items-start'>
                  <p
                    className={clsx(
                      'text-xs font-medium',
                      step === item.value && 'text-secondary-600 dark:text-secondary-300'
                    )}
                  >
                    {step === item.value ? (
                      <span className='text-secondary-600 dark:text-secondary-300'>
                        {t('Current')}
                      </span>
                    ) : Number(step) > Number(item.value) ? (
                      <span className='text-green-600'>{t('Completed')}</span>
                    ) : (
                      t('Pending')
                    )}
                  </p>
                  <h6 className='font-medium'>{t(item.name)}</h6>
                </div>
              )}
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>

        <TabsPrimitive.Content
          value='1'
          className={clsx('mt-12 h-full bg-white py-6 dark:bg-dark')}
        ></TabsPrimitive.Content>
        <TabsPrimitive.Content
          value='2'
          className={clsx('mt-12 h-full bg-white py-6 dark:bg-dark')}
        ></TabsPrimitive.Content>
        <TabsPrimitive.Content
          value='3'
          className={clsx('mt-12 h-full bg-white py-6 dark:bg-dark')}
        ></TabsPrimitive.Content>
      </TabsPrimitive.Root>
    </motion.div>
  )
}
