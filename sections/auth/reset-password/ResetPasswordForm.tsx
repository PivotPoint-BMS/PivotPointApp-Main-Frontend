import React from 'react'
import * as Yup from 'yup'
// form
import { useForm, FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// hooks
import useTranslate from 'hooks/useTranslate'
import useIsMountedRef from 'hooks/useIsMountedRef'
// components
import Button from '@/components/Button'
import { FormProvider, TextField } from '@/components/hook-form'
import Alert from '@/components/Alert'

export default function ResetPasswordForm() {
  const { t } = useTranslate()
  const isMountedRef = useIsMountedRef()

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('Email must be a valid email address'))
      .required(t('Email is required')),
  })

  const defaultValues = {
    email: '',
  }

  const methods = useForm<FieldValues>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  })

  const {
    reset,
    handleSubmit,
    formState: { errors },
    setError,
  } = methods

  const onSubmit = async (data: FieldValues) => {
    try {
      console.log(data)
      // await login(data.email, data.password);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error)
      reset()
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message })
      }
    }
  }

  return (
    <div className='w-full'>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className='flex w-full flex-col items-center gap-5'>
          {errors.afterSubmit && (
            <Alert intent='error'>{errors.afterSubmit.message as string}</Alert>
          )}
          <TextField name='email' label={t('Email')} placeholder={t('Enter your email')} />
          <Button className='w-full font-medium'>{t('Send Request')}</Button>
        </div>
      </FormProvider>
    </div>
  )
}
