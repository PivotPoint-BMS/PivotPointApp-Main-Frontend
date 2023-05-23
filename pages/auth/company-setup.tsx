/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
// form
import { FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// radix
import * as TabsPrimitive from '@radix-ui/react-tabs'
// next
import Head from 'next/head'
import { useRouter } from 'next/router'
// routes
import {  PATH_DASHBOARD } from 'routes/paths'
// types
import { CompanySetupInput } from 'types'
// hooks
import useTranslate from 'hooks/useTranslate'
import useResponsive from 'hooks/useResponsive'
import { useAppSelector } from 'store/hooks'
import { useCreateRequestMutation } from 'store/api/auth/companyApi'
// sections
import Company from 'sections/auth/company-setup/Company'
import Workers from 'sections/auth/company-setup/workers'
import Subscription from 'sections/auth/company-setup/Subscription'
// layout
import Layout from 'layout/Index'
// components
import { Icon as Iconify } from '@iconify/react'
import { FormProvider } from 'components/hook-form'
// pages
import Login from './login'

const Tabs = [
  { name: 'Setup Company', value: '1' },
  { name: 'Setup Personnels', value: '2' },
  { name: 'Choose Subscription', value: '3' },
  { name: 'Complete Payment', value: '4' },
]

function index() {
  const { push } = useRouter()
  const isDesktop = useResponsive('md', 'up')
  const [createRequest, { isLoading, isSuccess }] = useCreateRequestMutation()
  const { user, refreshToken } = useAppSelector((state) => state.session)
  const [step, setStep] = useState('1')
  const { t, locale } = useTranslate()

  const CompanySetupSchema = Yup.object().shape({
    companyName: Yup.string().min(3, t('Too short')).required(t('This field is required')),
    companySlogan: Yup.string().min(3, t('Too short')).required(t('This field is required')),
    companyWebsite: Yup.string()
      .min(3, t('Too short'))
      .matches(
        /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/,
        t('Please enter a valid website')
      )
      .required(t('This field is required')),
    yourPosition: Yup.string().min(3, t('Too short')).required(t('This field is required')),
    companyWorkers: Yup.array().of(
      Yup.object({
        firstName: Yup.string().required(t('This field is required')),
        lastName: Yup.string().required(t('This field is required')),
        email: Yup.string().email().required(t('This field is required')),
        position: Yup.string().required(t('This field is required')),
      })
    ),
  })

  const defaultValues = {
    yourPosition: '',
    companyName: '',
    companySlogan: '',
    companyWebsite: '',
    companyWorkers: [],
    subscription: 0,
  }

  const methods = useForm<FieldValues>({
    resolver: yupResolver(CompanySetupSchema),
    defaultValues,
  })

  const {
    trigger,
    formState: { isDirty, errors },
    setValue: setFormValue,
    getValues,
  } = methods

  useEffect(() => {
    if (user && user.hasSetupCompany) {
      push(PATH_DASHBOARD.root)
    }
  }, [user])

  const ToSecondStep = () => {
    trigger(['companyName', 'companySlogan', 'companyWebsite', 'yourPosition']).then(() => {
      if (
        isDirty &&
        !errors.companyName &&
        !errors.companySlogan &&
        !errors.companyWebsite &&
        !errors.yourPosition
      ) {
        setStep('2')
      }
    })
  }

  const ToThirdStep = () => {
    trigger(['companyWorkers']).then(() => {
      if (isDirty && !errors.companyWorkers) {
        setStep('3')
      }
    })
  }

  const ToFourthStep = (plan: number) => {
    setFormValue('subscription', plan)
    const companySetupData: CompanySetupInput = {
      companyName: getValues('companyName'),
      companySlogan: getValues('companySlogan'),
      companyWebsite: getValues('companyWebsite'),
      companyWorkers: getValues('companyWorkers'),
      subscription: getValues('subscription'),
      yourPosition: getValues('yourPosition'),
    }
    createRequest(companySetupData)
  }

  useEffect(() => {
    if (!isLoading && isSuccess) push(PATH_DASHBOARD.crm.dashboard)
  }, [isLoading, isSuccess])

  useEffect(() => {
    if (!user && refreshToken) push(PATH_DASHBOARD.root)
  }, [push, refreshToken])

  if (!user) return <Login />

  return (
    <>
      <Head>
        <title>Pivot Point BMS | {t('Company Setup')}</title>
      </Head>
      <main className='flex h-screen flex-col items-center'>
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
                      <Iconify
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
          <FormProvider methods={methods}>
            <TabsPrimitive.Content
              value='1'
              className={clsx('mt-12 h-full bg-gray-100/50 py-6 dark:bg-dark')}
            >
              <Company handleNext={ToSecondStep} />
            </TabsPrimitive.Content>
            <TabsPrimitive.Content
              value='2'
              className={clsx('mt-12 h-full bg-gray-100/50 py-6 dark:bg-dark')}
            >
              <Workers
                handleBack={() => setStep('1')}
                handleNext={ToThirdStep}
                formWorkers={getValues('companyWorkers')}
                setFormWorkers={(workers) => {
                  setFormValue('companyWorkers', workers)
                }}
              />
            </TabsPrimitive.Content>
            <TabsPrimitive.Content
              value='3'
              className={clsx('mt-12 h-full bg-gray-100/50 py-6 dark:bg-dark')}
            >
              <Subscription
                handleBack={() => setStep('2')}
                handleNext={(plan) => ToFourthStep(plan)}
                isLoading={isLoading}
              />
            </TabsPrimitive.Content>
          </FormProvider>
        </TabsPrimitive.Root>
      </main>
    </>
  )
}
index.getLayout = function getLayout(page: JSX.Element) {
  return <Layout variant='main'>{page}</Layout>
}

export default index
