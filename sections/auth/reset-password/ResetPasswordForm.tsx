import React, { useEffect } from 'react'
import * as Yup from 'yup'
// next
import { useRouter } from 'next/router'
// form
import { useForm, FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// api
import { useResetPasswordMutation } from 'store/api/auth/authApi'
// types
import { ResetPasswordInput } from 'types'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import Button from 'components/Button'
import { FormProvider, RHFTextField } from 'components/hook-form'
import Alert from 'components/Alert'

export default function ResetPasswordForm() {
  const { push } = useRouter()
  const { t } = useTranslate()
  const [resetPassword, { isLoading, isError, isSuccess, error, data: response }] =
    useResetPasswordMutation()

  const RecoverPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('Email must be a valid email address'))
      .required(t('Email is required')),
  })

  const defaultValues = {
    email: '',
  }

  const methods = useForm<FieldValues>({
    resolver: yupResolver(RecoverPasswordSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    formState: { errors },
    setError,
  } = methods

  const onSubmit = async (data: FieldValues) => {
    const resetPasswordData: ResetPasswordInput = {
      email: data.email,
    }
    await resetPassword(resetPasswordData)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }

  useEffect(() => {
    if (isError && 'data' in error!) {
      setError('afterSubmit', { ...error, message: error.data as string })
    }
    if (isSuccess) push('/auth/new-password')
  }, [isLoading])

  return (
    <div className='w-full'>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className='flex w-full flex-col items-center gap-10'>
          {errors.afterSubmit && (
            <Alert intent='error'>
              <strong className='text-sm font-medium'>
                {errors.afterSubmit.message as string}
              </strong>
            </Alert>
          )}
          {isSuccess && (
            <Alert intent='success'>
              <strong className='text-sm font-medium'>{response?.message}</strong>
            </Alert>
          )}
          <RHFTextField name='email' label={t('Email')} placeholder={t('Enter your email')} />
          <Button type='submit' className='w-full font-medium' loading={isLoading}>
            {t('Send Request')}
          </Button>
        </div>
      </FormProvider>
    </div>
  )
}
