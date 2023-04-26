import React from 'react'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import { RHFTextField } from 'components/hook-form'
import Button from 'components/Button'

export default function PersonalData({ nextStep }: { nextStep: () => void }) {
  const { t } = useTranslate()
  return (
    <div className='flex flex-1 flex-col items-center gap-3'>
      <RHFTextField name='email' label={t('Email')} placeholder={t('Enter your email')} />
      <RHFTextField
        type='password'
        name='password'
        label={t('Password')}
        placeholder={t('Enter your password')}
      />
      <RHFTextField
        type='password'
        name='confirmPassword'
        label={t('Confirm password')}
        placeholder={t('Confirm your password')}
      />
      <Button className='w-1/3 self-end' onClick={nextStep}>
        {t('Next')}
      </Button>
    </div>
  )
}
