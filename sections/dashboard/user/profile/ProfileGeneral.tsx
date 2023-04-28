import React, { useCallback, useEffect, useState } from 'react'
import * as Yup from 'yup'
// form
import { useForm, FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// apis
import {
  useGetUserDetailsQuery,
  useUpdateImageMutation,
  useUpdateUserDetailsMutation,
} from 'store/api/settings/settingsAPIs'
// redux
import { useAppSelector } from 'store/hooks'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// utils
import { fData } from 'utils/formatNumber'
// components
import { FormProvider, RHFTextField } from 'components/hook-form'
import { Card, CardContent, Button, Backdrop } from 'components'
import { UploadAvatar } from 'components/upload'
import { UserDetails } from 'types'
import { PIVOTPOINT_API } from 'config'

export default function ProfileGeneral() {
  const { t } = useTranslate()
  const { open: openSnackbar } = useSnackbar()
  const { user } = useAppSelector((state) => state.session)
  const {
    data: userDetails,
    isLoading: loadingUserDetails,
    isSuccess: successUserDetails,
  } = useGetUserDetailsQuery()

  const [updateImage, { isLoading, isError, isSuccess }] = useUpdateImageMutation()
  const [
    updateUserDetails,
    {
      isLoading: isLoadingUserDetails,
      isError: isErrorUserDetails,
      isSuccess: isSuccessUserDetails,
    },
  ] = useUpdateUserDetailsMutation()
  const [profilePic, setProfilePic] = useState<(File & { preview: string }) | string | null>(
    user ? `${PIVOTPOINT_API.profilePicUrl}/${user.profilePicture}` : null
  )

  const UpdateUserSchema = Yup.object().shape({
    firstName: Yup.string().required(t('This field is required')),
    lastName: Yup.string().required(t('This field is required')),
    phoneNumber: Yup.string().required(t('This field is required')),
    country: Yup.string().required(t('This field is required')),
    city: Yup.string().required(t('This field is required')),
  })

  const defaultValues = {
    firstName: userDetails?.data.firstName || '',
    lastName: userDetails?.data.lastName || '',
    phoneNumber: userDetails?.data.phoneNumber || '',
    country: userDetails?.data.country || '',
    city: userDetails?.data.city || '',
    email: userDetails?.data.email || '',
  }

  const methods = useForm<FieldValues>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  })

  const { setValue, handleSubmit } = methods

  const onSubmit = async (data: FieldValues) => {
    const newUserDetails: Omit<UserDetails, 'email'> = {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      country: data.country,
      city: data.city,
    }

    updateUserDetails(newUserDetails)
  }

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]

      if (file) {
        setProfilePic(
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      }
    },
    [setValue]
  )

  useEffect(() => {
    if (successUserDetails) {
      setValue('firstName', userDetails?.data.firstName)
      setValue('lastName', userDetails?.data.lastName)
      setValue('email', userDetails?.data.email)
      setValue('phoneNumber', userDetails?.data.phoneNumber)
      setValue('country', userDetails?.data.country)
      setValue('city', userDetails?.data.city)
    }
  }, [loadingUserDetails])

  const handleUpdateImage = () => {
    if (profilePic !== null) {
      const data = new FormData()
      data.append('ProfilePicture', profilePic)
      updateImage(data)
    }
  }

  useEffect(() => {
    if (isError) {
      openSnackbar({
        message: t('A problem has occured.'),
        autoHideDuration: 4000,
        type: 'error',
        variant: 'contained',
      })
    }
    if (isSuccess) {
      openSnackbar({
        message: t('Profile Picture Updated Successfully.'),
        autoHideDuration: 4000,
        type: 'success',
        variant: 'contained',
      })
    }
  }, [isError, isSuccess])

  useEffect(() => {
    if (isErrorUserDetails) {
      openSnackbar({
        message: t('A problem has occured.'),
        autoHideDuration: 4000,
        type: 'error',
        variant: 'contained',
      })
    }
    if (isSuccessUserDetails) {
      openSnackbar({
        message: t('Details Updated Successfully.'),
        autoHideDuration: 4000,
        type: 'success',
        variant: 'contained',
      })
    }
  }, [isErrorUserDetails, isSuccessUserDetails])

  return (
    <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
      <Card fullWidth className='h-full'>
        <CardContent className='flex h-full flex-col items-center justify-center'>
          <UploadAvatar
            file={profilePic!}
            maxSize={3145728}
            onDrop={handleDrop}
            helperText={
              <p className='mx-auto mt-3 mb-6 block flex-1 text-center text-sm text-gray-600 dark:text-gray-400'>
                {t('Allowed *.jpeg, *.jpg, *.png, *.gif')}
                <br /> {t('max size of')} {fData(3145728)}
              </p>
            }
          />
          <Button onClick={handleUpdateImage}>{t('Update Profile Picture')}</Button>
        </CardContent>
      </Card>
      <Card fullWidth className='col-span-2'>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <CardContent className='flex flex-col gap-5'>
            <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
              <RHFTextField name='firstName' label={t('First name')} />
              <RHFTextField name='lastName' label={t('Last name')} />
              <RHFTextField name='email' label={t('Email')} disabled />
              <RHFTextField name='phoneNumber' label={t('Phone number')} />
              <RHFTextField name='country' label={t('Country')} />
              <RHFTextField name='city' label={t('City')} />
            </div>
            <Button className='w-full self-center md:w-1/3' type='submit'>
              {t('Save Changes')}
            </Button>
          </CardContent>
        </FormProvider>
      </Card>

      <Backdrop
        open={isLoading || isLoadingUserDetails}
        loading={isLoading || isLoadingUserDetails}
      />
    </div>
  )
}
