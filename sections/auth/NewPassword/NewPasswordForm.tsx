import React, { useEffect } from 'react'
import * as Yup from 'yup'
// form
import { useForm, FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// api
import { useResetPasswordMutation } from 'store/api/authApi'
// types
import { ResetPasswordInput } from 'types'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import Button from '@/components/Button'
import { FormProvider, TextField } from '@/components/hook-form'
import Alert from '@/components/Alert'

export default function NewPasswordForm() {
  const { t } = useTranslate()
  const [resetPassword, { isLoading, isError, isSuccess, error, data: response }] =
    useResetPasswordMutation()

  const RecoverPasswordSchema = Yup.object().shape({
    code: Yup.string()
      .min(6, t('Code Invalid'))
      .max(6, t('Code Invalid'))
      .required(t('Code is required')),
    password: Yup.string()
      .required(t('Password is required'))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.-_])[A-Za-z\d@$!%*?&.-_]{8,}$/,
        t(
          'Password must be at least 8 characters and include at least 1 upper, 1 lower, 1 digit, and 1 special character'
        )
      ),
    confirmPassword: Yup.string()
      .required(t('Confirm your password'))
      .oneOf([Yup.ref('password'), null], t('Passwords does not match')),
  })

  const defaultValues = {
    email: '',
  }

  const methods = useForm<FieldValues>({
    resolver: yupResolver(RecoverPasswordSchema),
    defaultValues,
  })

  const {
    reset,
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
    if (isSuccess) reset()
  }, [isLoading])

  return (
    <div className='w-full'>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className='flex w-full flex-col items-center gap-5'>
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
          <TextField name='code' label={t('Code')} placeholder={t('Enter your new password')} />
          <TextField
            name='newPassword'
            label={t('New Password')}
            placeholder={t('Enter your code')}
          />
          <TextField
            name='confirmPassword'
            label={t('Confirm password')}
            placeholder={t('Confirm your password')}
          />
          <Button type='submit' className='w-full font-medium' loading={isLoading}>
            {t('Reset Password')}
          </Button>
        </div>
      </FormProvider>
    </div>
  )
}
