import React from 'react'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import { TextField } from '@/components/hook-form'
import Button from '@/components/Button'

export default function UserData({ setStep }: { setStep: (step: number) => void }) {
  const { t } = useTranslate()
  return (
    <div className='flex flex-1 flex-col items-center gap-3'>
      <TextField
        name='firstName'
        label={t('First name')}
        placeholder={t('Enter your first name')}
      />
      <TextField name='lastName' label={t('Last name')} placeholder={t('Enter your last name')} />
      <TextField
        name='phoneNumber'
        label={t('Phone number')}
        placeholder={t('Enter your phone number')}
      />
      <div className='flex w-full items-center justify-between'>
        <Button className='w-1/3 font-medium' onClick={() => setStep(0)}>
          {t('Back')}
        </Button>
        <Button className='w-1/3 min-w-fit font-medium' onClick={() => setStep(1)} type='submit'>
          {t('Sign up')}
        </Button>
      </div>
    </div>
  )
}
