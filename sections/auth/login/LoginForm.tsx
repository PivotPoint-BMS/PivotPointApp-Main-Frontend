import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
// next
import { useRouter } from 'next/router'
import Link from 'next/link'
// form
import { useForm, FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// hooks
import useTranslate from 'hooks/useTranslate'
import { useAppSelector } from 'store/hooks'
// api
import { useLoginMutation } from 'store/api/authApi'
// types
import { LoginInput } from 'types'
// routes
import { PATH_AUTH, PATH_DASHBOARD } from 'routes/paths'
// components
import { Icon as Iconify } from '@iconify/react'
import Button from '@/components/Button'
import { Checkbox, FormProvider, RHFTextField } from '@/components/hook-form'
import Alert from '@/components/Alert'
import IconButton from '@/components/IconButton'

export default function LoginForm() {
  const { push } = useRouter()
  const { t } = useTranslate()
  const [showPassword, setShowPassword] = useState(false)
  const [login, { isLoading, isError, isSuccess, error, data: user }] = useLoginMutation()
  const sessionError = useAppSelector((state) => state.session.error)

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('Email must be a valid email address'))
      .required(t('Email is required')),
    password: Yup.string().required(t('Password is required')),
    rememberMe: Yup.boolean(),
  })

  const defaultValues = {
    email: '',
    password: '',
    rememberMe: true,
  }

  const methods = useForm<FieldValues>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    formState: { errors },
    setError,
  } = methods

  const onSubmit = async (data: FieldValues) => {
    const loginData: LoginInput = {
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
    }
    login(loginData)
  }

  useEffect(() => {
    if (isError && 'data' in error! && error.data !== '') {
      setError('afterSubmit', { ...error, message: error.data as string })
    }
    if (isSuccess) {
      if (user?.hasSetupCompany) push(PATH_DASHBOARD.root)
      else push(PATH_DASHBOARD.root)
    }
  }, [isLoading])

  return (
    <div className='w-full'>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className='flex w-full flex-col items-center gap-5'>
          {errors.afterSubmit && (
            <Alert intent='error'>{t(errors.afterSubmit.message as string)}</Alert>
          )}
          {!errors.afterSubmit && sessionError && <Alert intent='error'>{t(sessionError)}</Alert>}
          <RHFTextField
            name='email'
            type='email'
            label={t('Email')}
            placeholder={t('Enter your email')}
          />
          <RHFTextField
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
            <Checkbox name='rememberMe' label={t('Remember me')} />
            <Link
              href={PATH_AUTH.resetPassword}
              className='text-sm font-medium text-primary-600 hover:underline focus:underline focus:outline-none dark:text-primary-200'
            >
              {t('Forgot password?')}
            </Link>
          </div>
          <Button type='submit' className='w-full' loading={isLoading}>
            {t('Login')}
          </Button>
        </div>
      </FormProvider>
    </div>
  )
}
