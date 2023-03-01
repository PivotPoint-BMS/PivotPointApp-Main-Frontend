import React, { useCallback } from 'react'
import * as Yup from 'yup'
// redux
import { useAppSelector } from 'store/hooks'
// form
import { useForm, FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// hooks
import useTranslate from 'hooks/useTranslate'
// utils
import { fData } from 'utils/formatNumber'
// components
import { FormProvider, RHFTextField } from '@/components/hook-form'
import RHFUploadAvatar from '@/components/hook-form/RHFUpload'
import Card from '@/components/Card'
import CardContent from '@/components/CardContent'
import RHFTextArea from '@/components/hook-form/RHFTextArea'
import Button from '@/components/Button'

export default function ProfileGeneral() {
  const { t } = useTranslate()
  const { user } = useAppSelector((state) => state.session)

  const UpdateUserSchema = Yup.object().shape({
    firstName: Yup.string().required(t('Fistname is required')),
    lastName: Yup.string().required(t('Fistname is required')),
    logo: Yup.object(),
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

  const { setValue, handleSubmit } = methods

  const onSubmit = async () => {
    try {
      // enqueueSnackbar('Update success!')
    } catch (error) {
      console.error(error)
    }
  }

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]

      if (file) {
        setValue(
          'logo',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      }
    },
    [setValue]
  )
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
        <Card className='!w-full'>
          <CardContent className='p-10'>
            <RHFUploadAvatar
              name='logo'
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <p className='mx-auto mt-3 block text-center text-sm text-gray-600 dark:text-gray-400'>
                  {t('Allowed *.jpeg, *.jpg, *.png, *.gif')}
                  <br /> {t('max size of')} {fData(3145728)}
                </p>
              }
            />
          </CardContent>
        </Card>
        <Card className='col-span-2 !w-full'>
          <CardContent className='flex flex-col gap-5 p-10'>
            <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
              <RHFTextField name='firstName' label={t('First name')} />
              <RHFTextField name='lastName' label={t('Last name')} />
              <RHFTextField name='email' label={t('Email')} />
              <RHFTextField name='phoneNumber' label={t('Phone number')} />
              <RHFTextField name='email' label={t('Address')} />
              <RHFTextField name='email' label={t('Country')} />
              <RHFTextField name='email' label={t('State/Region')} />
              <RHFTextField name='email' label={t('City')} />
            </div>
            <RHFTextArea name='about' label={t('About')} />
            <Button className='w-full self-center md:w-1/3' type='submit'>
              {t('Save Changes')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </FormProvider>
  )
}
