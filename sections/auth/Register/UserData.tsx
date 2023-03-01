import React from 'react'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import { RHFTextField } from '@/components/hook-form'
import Button from '@/components/Button'

export default function UserData({
  setStep,
  isLoading,
}: {
  setStep: (step: number) => void
  isLoading: boolean
}) {
  const { t } = useTranslate()
  return (
    <div className='flex flex-1 flex-col items-center gap-3'>
      <RHFTextField
        name='firstName'
        label={t('First name')}
        placeholder={t('Enter your first name')}
      />
      <RHFTextField
        name='lastName'
        label={t('Last name')}
        placeholder={t('Enter your last name')}
      />
      <RHFTextField
        name='phoneNumber'
        label={t('Phone number')}
        placeholder={t('Enter your phone number')}
      />
      <div className='flex w-full items-center justify-between'>
        <Button className='w-1/3' onClick={() => setStep(0)}>
          {t('Back')}
        </Button>
        <Button
          className='w-1/3 min-w-fit'
          onClick={() => setStep(1)}
          type='submit'
          loading={isLoading}
        >
          {t('Sign up')}
        </Button>
      </div>
    </div>
  )
}
