import React, { useEffect, useMemo } from 'react'
import * as Yup from 'yup'
// form
import { useForm, FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// apis
import {
  useGetSMTPSettingsQuery,
  useUpdateSMTPSettingsMutation,
} from 'store/api/settings/settingsAPIs'
// types
import { SMTPSettings } from 'types'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// components
import { FormProvider, RHFTextField, RHFCheckbox } from 'components/hook-form'
import { Card, CardContent, Button, LoadingIndicator } from 'components'

export default function SettingsEmail() {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  // Queries
  const { data: smtpData, isLoading, isSuccess } = useGetSMTPSettingsQuery()

  // Mutation
  const [updateSettings, { isLoading: isUpdateLoading }] = useUpdateSMTPSettingsMutation()

  const SMTPSchema = Yup.object().shape({
    mailServer: Yup.string().required(t('This field is required')),
    userName: Yup.string().required(t('This field is required')),
    password: Yup.string().required(t('Password is required')),
    secureSSLSocket: Yup.boolean(),
  })

  const defaultValues = useMemo(
    () => ({
      mailServer: smtpData?.data.mailServer || '',
      userName: smtpData?.data.userName || '',
      password: smtpData?.data.password || '',
      secureSSLSocket: smtpData?.data.secureSSLSocket || false,
    }),
    [isLoading]
  )

  const methods = useForm<FieldValues>({
    resolver: yupResolver(SMTPSchema),
    defaultValues,
  })

  const { handleSubmit, reset } = methods

  const onSubmit = async (data: FieldValues) => {
    const smtpSettings: SMTPSettings = {
      mailServer: data.mailServer,
      password: data.password,
      secureSSLSocket: data.secureSSLSocket,
      userName: data.userName,
    }
    updateSettings(smtpSettings)
      .then(() =>
        open({
          message: t('SMTP Settings Updated Successfully.'),
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
              <p className='font-medium text-gray-600 dark:text-gray-400'>
                {t('SMTP Configuration')}
              </p>
              <RHFTextField name='mailServer' label={t('Mail Server')} />
              <RHFTextField name='userName' label={t('Username')} />
              <RHFTextField name='password' type='password' label={t('Password')} />
              <RHFCheckbox name='secureSSLSocket' label={t('Secure Sockets Layer (SSL)')} />{' '}
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
