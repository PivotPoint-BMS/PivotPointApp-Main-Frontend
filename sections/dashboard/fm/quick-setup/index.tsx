/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react'
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
import Button from 'components/Button'
import IconButton from 'components/IconButton'
// sections
import StepOne from './step-one'
import StepTwo from './step-two'
import StepThree from './step-three'
import StepFour from './step-four'
import StepFive from './step-five'
import StepSix from './step-six'

const Tabs = [
  { name: 'Step 1', value: '1' },
  { name: 'Step 2', value: '2' },
  { name: 'Step 3', value: '3' },
  { name: 'Step 4', value: '4' },
  { name: 'Step 5', value: '5' },
  { name: 'Step 6', value: '6' },
  { name: 'Complete', value: '7' },
]

export default function QuickSetup({
  open,
  startStep,
  estimationRange,
  total,
  handleClose,
}: {
  open: boolean
  startStep: string
  estimationRange: number
  total: number
  handleClose: () => void
}) {
  const isDesktop = useResponsive('md', 'up')
  const { t, locale } = useTranslate()
  const [step, setStep] = useState(startStep)
  const [range, setRange] = useState(estimationRange)
  const [investementTotal, setInvestementTotal] = useState(total)

  useEffect(() => {
    setStep(startStep)
  }, [startStep])

  const handleStepOne = (_range: number) => {
    setStep('2')
    setRange(_range)
  }

  const handleStepTwo = () => {
    setStep('3')
  }
  const handleStepThree = () => {
    setStep('4')
  }
  const handleStepFour = () => {
    setStep('5')
  }
  const handleStepFive = () => {
    setStep('6')
  }
  const handleStepSix = () => {
    setStep('7')
  }
  const handleBack = () => {
    setStep((prevStep) => (parseInt(prevStep, 10) - 1).toString())
  }

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
        defaultValue={step}
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
          <div className='mx-2 flex h-16 items-center justify-center border-b'>
            <IconButton onClick={handleClose}>
              <Icon icon='ic:round-close' height={24} />
            </IconButton>
          </div>
        </TabsPrimitive.List>

        <TabsPrimitive.Content
          value='1'
          className={clsx('mt-12 h-full overflow-scroll bg-white py-6 dark:bg-dark')}
        >
          <StepOne handleNextStep={handleStepOne} setInvestementTotal={setInvestementTotal} />
        </TabsPrimitive.Content>
        <TabsPrimitive.Content
          value='2'
          className={clsx('mt-12 h-full overflow-scroll bg-white py-6 dark:bg-dark')}
        >
          <StepTwo handleNextStep={handleStepTwo} handleBack={handleBack} estimationRange={range} />
        </TabsPrimitive.Content>
        <TabsPrimitive.Content
          value='3'
          className={clsx('mt-12 h-full overflow-scroll bg-white py-6 dark:bg-dark')}
        >
          <StepThree
            handleBack={handleBack}
            handleNextStep={handleStepThree}
            estimationRange={range}
          />
        </TabsPrimitive.Content>
        <TabsPrimitive.Content
          value='4'
          className={clsx('mt-12 h-full overflow-scroll bg-white py-6 dark:bg-dark')}
        >
          <StepFour
            handleBack={handleBack}
            handleNextStep={handleStepFour}
            estimationRange={range}
          />
        </TabsPrimitive.Content>
        <TabsPrimitive.Content
          value='5'
          className={clsx('mt-12 h-full overflow-scroll bg-white py-6 dark:bg-dark')}
        >
          <StepFive
            handleBack={handleBack}
            handleNextStep={handleStepFive}
            investementTotal={investementTotal}
          />
        </TabsPrimitive.Content>
        <TabsPrimitive.Content
          value='6'
          className={clsx('mt-12 h-full overflow-scroll bg-white py-6 dark:bg-dark')}
        >
          <StepSix handleBack={handleBack} handleNextStep={handleStepSix} estimationRange={range} />
        </TabsPrimitive.Content>
        <TabsPrimitive.Content
          value='7'
          className={clsx('mt-12 h-full overflow-scroll bg-white py-6 dark:bg-dark')}
        >
          <div className='relative mx-auto flex h-full w-full min-w-fit flex-col items-center justify-center  gap-10 py-10 px-4'>
            <h1 className='text-3xl font-medium'>{t('Setup Complete')}</h1>
            <Button onClick={handleClose}>{t('Go To Dashboard')}</Button>
          </div>
        </TabsPrimitive.Content>
      </TabsPrimitive.Root>
    </motion.div>
  )
}
