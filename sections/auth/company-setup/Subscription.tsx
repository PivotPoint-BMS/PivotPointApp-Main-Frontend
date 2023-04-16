import React from 'react'
import clsx from 'clsx'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import { Icon as Iconify } from '@iconify/react'
import MotionContainer from '@/components/animate/MotionContainer'
import IconButton from '@/components/IconButton'
import Button from '@/components/Button'

interface SubscriptionProps {
  handleBack: () => void
  handleNext: (plan: number) => void
  isLoading: boolean
}

export default function Subscription({ handleBack, handleNext, isLoading }: SubscriptionProps) {
  const { t, locale } = useTranslate()

  return (
    <>
      <MotionContainer>
        <div className='container relative mx-auto flex h-full flex-col items-center justify-center gap-5 rounded-xl bg-white px-5 py-10 shadow-md dark:bg-secondary-900 sm:px-16 md:px-20'>
          <IconButton
            onClick={handleBack}
            className={clsx('absolute top-5', locale === 'ar' ? 'right-5' : 'left-5')}
          >
            <Iconify
              icon={
                locale === 'ar'
                  ? 'material-symbols:arrow-forward-rounded'
                  : 'material-symbols:arrow-back-rounded'
              }
              height={20}
              width={20}
            />
          </IconButton>
          <div className='flex h-full w-full flex-col items-center gap-6'>
            <h1 className='text-3xl font-semibold'>{t('Select Subscription')}</h1>
            <p className='text-center text-gray-600 dark:text-gray-300'>
              {t('Choose the perfect plan for your needs')}
            </p>
            <div className='flex items-center justify-between'>
              <MotionContainer>
                <div className='divide- grid grid-cols-1 items-center justify-around divide-x divide-y divide-dashed divide-gray-400 overflow-hidden rounded-lg border border-dashed border-gray-400 rtl:divide-x-reverse lg:grid-cols-3 lg:divide-y-0'>
                  <div className='duration- flex h-full flex-col p-10 transition-all'>
                    <div className='mb-3 flex items-center gap-2'>
                      <Iconify
                        className='text-primary-600 dark:text-primary-400'
                        icon='bi:lightning-charge-fill'
                        height={20}
                      />
                      <h3 className='text-3xl font-semibold'>{t('Free')}</h3>
                    </div>
                    <p className='mb-10 flex-1 leading-loose text-gray-600 dark:text-gray-300'>
                      {t(
                        'Perfect for freelancers, Businessmen who want to take their work to the next level'
                      )}
                    </p>
                    <h3 className='mb-10 text-5xl'>
                      <span className='text-gray-400'>$</span>0.00
                      <span className='text-sm text-gray-600 dark:text-gray-300'>
                        {' '}
                        {t('per month')}
                      </span>
                    </h3>
                    <h6 className='mb-2 font-semibold'>{t('Free includes')}: </h6>
                    <ul className='mb-10 flex flex-col justify-center gap-3'>
                      <li className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
                        <Iconify
                          icon='ph:check-circle-fill'
                          height={20}
                          className='text-primary-900 dark:text-primary-400'
                        />{' '}
                        {t('Up to')} 2 {t('Users')}
                      </li>
                      <li className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
                        <Iconify
                          icon='ph:check-circle-fill'
                          height={20}
                          className='text-primary-900 dark:text-primary-400'
                        />{' '}
                        {t('Up to')} 100 {t('Contacts/Leads')}
                      </li>
                      <li className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
                        <Iconify
                          icon='ph:check-circle-fill'
                          height={20}
                          className='text-primary-900 dark:text-primary-400'
                        />{' '}
                        {t('Up to')} 4 {t('Users Segments')}
                      </li>
                    </ul>
                    <Button loading={isLoading} onClick={() => handleNext(0)}>
                      {t('Get Started with Free')}
                    </Button>
                  </div>
                  <div className='flex flex-col  p-10 transition-all duration-500'>
                    <div className='mb-3 flex items-center gap-2'>
                      <Iconify
                        className='text-secondary-600 dark:text-secondary-400'
                        icon='material-symbols:star-rounded'
                        height={24}
                      />
                      <h3 className='text-3xl font-semibold'>{t('Professional')}</h3>
                    </div>
                    <p className='mb-10 flex-1 leading-loose text-gray-600 dark:text-gray-300'>
                      {t(
                        'Perfect for startups, Helps them get started, Manage their investment funds and get more leads'
                      )}
                    </p>
                    <h3 className='mb-10 text-5xl'>
                      <span className='text-gray-400'>$</span>25.00
                      <span className='text-sm text-gray-600 dark:text-gray-300'>
                        {' '}
                        {t('per month')}
                      </span>
                    </h3>
                    <h6 className='mb-2 font-semibold'>{t('Professional includes')}: </h6>
                    <ul className='mb-10 flex flex-col justify-center gap-3'>
                      <li className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
                        <Iconify
                          icon='ph:check-circle-fill'
                          height={20}
                          className='text-secondary-900 dark:text-secondary-400'
                        />{' '}
                        {t('Up to')} 5 {t('Users')}
                      </li>
                      <li className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
                        <Iconify
                          icon='ph:check-circle-fill'
                          height={20}
                          className='text-secondary-900 dark:text-secondary-400'
                        />{' '}
                        {t('Up to')} 300 {t('Contacts/Leads')}
                      </li>
                      <li className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
                        <Iconify
                          icon='ph:check-circle-fill'
                          height={20}
                          className='text-secondary-900 dark:text-secondary-400'
                        />{' '}
                        {t('Up to')} 20 {t('Users Segments')}
                      </li>
                    </ul>
                    <Button disabled loading={isLoading} onClick={() => handleNext(1)}>
                      {t('Purchase')}
                    </Button>
                  </div>
                  <div className='flex h-full flex-col  p-10 transition-all duration-500'>
                    <div className='flex items-center gap-2'>
                      <Iconify
                        className='text-primary-600 dark:text-primary-400'
                        icon='ri:vip-diamond-fill'
                        height={20}
                      />
                      <h3 className='text-3xl font-semibold'>{t('Enterprise')}</h3>
                    </div>{' '}
                    <p className='mb-10 flex-1 leading-loose text-gray-600 dark:text-gray-300'>
                      {t(
                        'Perfect for established companies who are using paper and want to digitize their workflow'
                      )}
                    </p>
                    <h3 className='mb-10 text-5xl'>
                      <span className='text-gray-400'>$</span>70.00
                      <span className='text-sm text-gray-600 dark:text-gray-300'>
                        {' '}
                        {t('per month')}
                      </span>
                    </h3>
                    <h6 className='mb-2 font-semibold'>{t('Enterprise includes')}: </h6>
                    <ul className='mb-10 flex flex-col justify-center gap-3'>
                      <li className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
                        <Iconify
                          icon='ph:check-circle-fill'
                          height={20}
                          className='text-primary-900 dark:text-primary-400'
                        />{' '}
                        {t('Up to')} 12 {t('Users')}
                      </li>
                      <li className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
                        <Iconify
                          icon='ph:check-circle-fill'
                          height={20}
                          className='text-primary-900 dark:text-primary-400'
                        />{' '}
                        {t('Up to')} 1000 {t('Contacts/Leads')}
                      </li>
                      <li className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
                        <Iconify
                          icon='ph:check-circle-fill'
                          height={20}
                          className='text-primary-900 dark:text-primary-400'
                        />{' '}
                        {t('Up to')} 100 {t('Users Segments')}
                      </li>
                    </ul>
                    <Button disabled loading={isLoading} onClick={() => handleNext(2)}>
                      {t('Purchase')}
                    </Button>
                  </div>
                </div>
              </MotionContainer>
            </div>
          </div>
        </div>
      </MotionContainer>
    </>
  )
}
