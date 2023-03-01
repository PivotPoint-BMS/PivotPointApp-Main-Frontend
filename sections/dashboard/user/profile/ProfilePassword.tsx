import React from 'react'
import * as Yup from 'yup'
// redux
import { useAppSelector } from 'store/hooks'
// form
import { useForm, FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import { FormProvider, RHFTextField } from '@/components/hook-form'
import Card from '@/components/Card'
import CardContent from '@/components/CardContent'
import Button from '@/components/Button'

export default function ProfilePassword() {
  const { t } = useTranslate()
  const { user } = useAppSelector((state) => state.session)

  const UpdateUserSchema = Yup.object().shape({
    oldPassword: Yup.string().required(t('Password is required')),
    newPassord: Yup.string()
      .required(t('Password is required'))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.-_])[A-Za-z\d@$!%*?&.-_]{8,}$/,
        t(
          'Password must be at least 8 characters and include at least 1 upper, 1 lower, 1 digit, and 1 special character'
        )
      ),
    confirmPassword: Yup.string()
      .required(t('Confirm your password'))
      .oneOf([Yup.ref('newPassord'), null], t('Passwords does not match')),
  })

  const defaultValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    logo: {},
  }

  const methods = useForm<FieldValues>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  })

  const { handleSubmit } = methods

  const onSubmit = async () => {
    try {
      // enqueueSnackbar('Update success!')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card className='col-span-2 !w-full'>
        <CardContent className='flex flex-col gap-5 p-10'>
          <RHFTextField name='oldPassword' type='password' label={t('Old Password')} />
          <RHFTextField name='newPassord' type='password' label={t('New Password')} />
          <RHFTextField name='confirmPassword' type='password' label={t('Confirm password')} />
          <Button className='w-full self-center md:w-1/3' type='submit'>
            {t('Save Changes')}
          </Button>
        </CardContent>
      </Card>
    </FormProvider>
  )
}
