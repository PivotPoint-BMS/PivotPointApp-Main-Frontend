import React from 'react'
import * as Yup from 'yup'
// next
import Link from 'next/link'
// form
import { useForm, FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// hooks
import useIsMountedRef from 'hooks/useIsMountedRef'
// routes
import { PATH_AUTH } from 'routes/paths'

import Button from '@/components/Button'
import { Checkbox, FormProvider, TextField } from '@/components/hook-form'
import Alert from '@/components/Alert'

export default function LoginForm() {
  const isMountedRef = useIsMountedRef()

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  })

  const defaultValues = {
    email: 'demo@minimals.cc',
    password: 'demo1234',
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
        {errors.afterSubmit && (
          <Alert intent='error' className='mb-5'>
            {errors.afterSubmit.message as string}
          </Alert>
        )}
        <TextField name='email' label='Email' placeholder='Enter your email' />
        <TextField
          name='password'
          label='Password'
          placeholder='Enter your password'
          type='password'
        />

        <div className='mb-10 flex w-full items-center justify-between'>
          <Checkbox name='remember' />
          <Link
            href={PATH_AUTH.resetPassword}
            className='font-medium text-primary-600 underline decoration-1 dark:text-primary-200'
          >
            Forgot password?
          </Link>
        </div>
        <Button className='mb-5 w-full font-medium' size='large'>
          Login
        </Button>
      </FormProvider>
    </div>
  )
}
