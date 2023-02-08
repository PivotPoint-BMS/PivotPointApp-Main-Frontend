import React, { useState } from 'react'
import * as Yup from 'yup'
import { motion } from 'framer-motion'
// form
import { useForm, FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// hooks
import useIsMountedRef from 'hooks/useIsMountedRef'
import useTranslate from 'hooks/useTranslate'
// components
import { FormProvider } from '@/components/hook-form'
import Alert from '@/components/Alert'
import PersonalData from './PersonalData'
import UserData from './UserData'

export default function RegisterForm() {
  const isMountedRef = useIsMountedRef()
  const { t, locale } = useTranslate()

  const [step, setStep] = useState(0)

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
    // TODO: Add Strong Password REGEX
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
    setError,
    trigger,
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

  const verifyEmailPassword = () => {
    trigger(['email', 'password', 'confirmPassword']).then(() => {
      if (isDirty && !errors.email && !errors.password && !errors.confirmPassword) {
        setStep(1)
      }
    })
  }

  return (
    <div className='w-full'>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {errors.afterSubmit && <Alert intent='error'>{errors.afterSubmit.message as string}</Alert>}
        <div className='w-full overflow-hidden px-1'>
          <motion.div
            className='flex w-[210%] items-center justify-center gap-10 overflow-hidden px-5'
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
