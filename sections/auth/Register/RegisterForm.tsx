import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { motion } from 'framer-motion'
// form
import { useForm, FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// types
import RegisterInput from 'types/RegisterInput'
// hooks
import useTranslate from 'hooks/useTranslate'
// api
import { useRegisterMutation } from 'store/api/authApi'
// components
import { FormProvider } from '@/components/hook-form'
import Alert from '@/components/Alert'
// forms
import PersonalData from './PersonalData'
import UserData from './UserData'

export default function RegisterForm() {
  const { t, locale } = useTranslate()
  const [step, setStep] = useState(0)
  const [register, { isLoading, isError, isSuccess, error, data: response }] = useRegisterMutation()

  const steps = {
    0: {
      x: 0,
    },
    1: {
      x: locale === 'ar' ? '50%' : '-50%',
    },
  }

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().min(3, t('Too short')).required(t('First name is required')),
    lastName: Yup.string().min(3, t('Too short')).required(t('Last name is required')),
    email: Yup.string()
      .required(t('Email is required'))
      .email(t('Email must be a valid email address')),
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
    phoneNumber: Yup.string()
      .matches(/^(\+\d{1,3} \d{9}|0\d{9})$/, t('Phone number must be valid'))
      .required(t('Phone number is required')),
  })

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  }

  const methods = useForm<FieldValues>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  })

  const {
    reset,
    handleSubmit,
    formState: { errors, isDirty },
    trigger,
    setError,
  } = methods

  const verifyEmailPassword = () => {
    trigger(['email', 'password', 'confirmPassword']).then(() => {
      if (isDirty && !errors.email && !errors.password && !errors.confirmPassword) {
        setStep(1)
      }
    })
  }

  const onSubmit = async (data: FieldValues) => {
    const registerData: RegisterInput = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      phoneNumber: data.phoneNumber,
    }
    register(registerData)
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
        <div className='w-full overflow-hidden'>
          {errors.afterSubmit && (
            <Alert intent='error' className='mb-5'>
              <strong className='text-sm font-medium'>
                {' '}
                {errors.afterSubmit.message as string}
              </strong>
            </Alert>
          )}
          {isSuccess && (
            <Alert intent='success' className='mb-5'>
              <strong className='text-sm font-medium'>{response?.message}</strong>
            </Alert>
          )}
          <motion.div
            className='flex w-[200%] items-center justify-center gap-2 px-2'
            variants={steps}
            animate={step.toString()}
            transition={{ type: 'keyframes', duration: 1 }}
          >
            <PersonalData nextStep={verifyEmailPassword} />
            <UserData setStep={setStep} />
          </motion.div>
        </div>
      </FormProvider>
    </div>
  )
}
