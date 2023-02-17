import React, { useState } from 'react'
import * as Yup from 'yup'
// next
import Link from 'next/link'
// form
import { useForm, FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// hooks
import useTranslate from 'hooks/useTranslate'
import useIsMountedRef from 'hooks/useIsMountedRef'
// routes
import { PATH_AUTH } from 'routes/paths'
// components
import { Icon as Iconify } from '@iconify/react'
import Button from '@/components/Button'
import { Checkbox, FormProvider, TextField } from '@/components/hook-form'
import Alert from '@/components/Alert'
import IconButton from '@/components/IconButton'

export default function LoginForm() {
  const { t } = useTranslate()
  const isMountedRef = useIsMountedRef()
  const [showPassword, setShowPassword] = useState(false)

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('Email must be a valid email address'))
      .required(t('Email is required')),
    password: Yup.string().required(t('Password is required')),
  })

  const defaultValues = {
    email: '',
    password: '',
    remember: true,
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
          <TextField
            name='password'
            label={t('Password')}
            placeholder={t('Enter your password')}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <IconButton onClick={() => setShowPassword((prevState) => !prevState)}>
                <Iconify icon={showPassword ? 'ion:eye' : 'ion:eye-off'} height={20} width={20} />
              </IconButton>
            }
          />
          <div className='flex w-full items-center justify-between'>
            <Checkbox name='remember' label={t('Remember me')} />
            <Link
              href={PATH_AUTH.resetPassword}
              className='text-sm font-medium text-primary-600 hover:underline focus:underline focus:outline-none dark:text-primary-200'
            >
              {t('Forgot password?')}
            </Link>
          </div>
          <Button className='w-full font-medium'>{t('Login')}</Button>
        </div>
      </FormProvider>
    </div>
  )
}
