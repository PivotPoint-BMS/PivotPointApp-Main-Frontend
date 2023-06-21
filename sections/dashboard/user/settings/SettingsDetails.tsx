import React, { useCallback, useEffect, useMemo } from 'react'
import * as Yup from 'yup'
// form
import { useForm, FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// api
import {
  useGetCompanyDetailsQuery,
  useUpdateCompanyDetailsMutation,
} from 'store/api/settings/settingsAPIs'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// utils
import { fData } from 'utils/formatNumber'
// components
import { FormProvider, RHFTextField } from 'components/hook-form'
import RHFUploadAvatar from 'components/hook-form/RHFUpload'
import { Card, CardContent, Button, LoadingIndicator } from 'components'
import { PIVOTPOINT_API } from 'config'

export default function SettingsDetails() {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  // Queries
  const { data: companyDetails, isLoading, isSuccess } = useGetCompanyDetailsQuery()

  // Mutation
  const [updateDetails, { isLoading: isUpdateLoading }] = useUpdateCompanyDetailsMutation()
  const CompanyDetailsSchema = Yup.object().shape({
    logo: Yup.mixed(),
    name: Yup.string().required(t('This field is required')),
    slogan: Yup.string(),
    website: Yup.string()
      .min(3, t('Too short'))
      .matches(
        /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/,
        t('Please enter a valid website')
      ),
  })

  const defaultValues = useMemo(
    () => ({
      logo: companyDetails?.data.logo
        ? `${PIVOTPOINT_API.profilePicUrl}/${companyDetails?.data.logo}`
        : null,
      name: companyDetails?.data.name || '',
      slogan: companyDetails?.data.slogan || '',
      website: companyDetails?.data.website || '',
    }),
    [isLoading]
  )

  const methods = useForm<FieldValues>({
    resolver: yupResolver(CompanyDetailsSchema),
    defaultValues,
  })

  const { handleSubmit, setValue, reset } = methods

  const onSubmit = async (data: FieldValues) => {
    const formData = new FormData()
    formData.append('logo', data.logo)
    formData.append('name', data.name)
    formData.append('slogan', data.slogan)
    formData.append('website', data.website)
    updateDetails(formData)
      .then(() =>
        open({
          message: t('Company Details Updated Successfully.'),
          autoHideDuration: 6000,
          type: 'success',
          variant: 'contained',
        })
      )
      .catch(() =>
        open({
          message: t('A problem has occured.'),
          autoHideDuration: 6000,
          type: 'error',
          variant: 'contained',
        })
      )
  }

  useEffect(() => {
    if (isSuccess) {
      reset(defaultValues)
    }
  }, [isLoading])

  // ImageUpload
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
      <Card className='col-span-2 !w-full'>
        <CardContent className='flex flex-col gap-5'>
          {isLoading ? (
            <div className='flex h-full w-full items-center justify-center'>
              <LoadingIndicator />
            </div>
          ) : (
            <>
              <RHFUploadAvatar
                name='logo'
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <p className='mx-auto block text-center text-xs text-gray-600 dark:text-gray-400'>
                    {t('Allowed *.jpeg, *.jpg, *.png, *.gif')}
                    <br /> {t('max size of')} {fData(3145728)}
                  </p>
                }
              />
              <RHFTextField name='name' label={t('Company Name')} />
              <RHFTextField name='slogan' label={t('Company Slogan')} />
              <RHFTextField name='website' label={t('Company Website')} />
              <Button
                className='w-full self-center md:w-1/3'
                type='submit'
                loading={isUpdateLoading}
              >
                {t('Save Changes')}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </FormProvider>
  )
}
