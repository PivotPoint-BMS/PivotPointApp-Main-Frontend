import React, { useState } from 'react'
import * as Yup from 'yup'
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
import RHFCheckbox from '@/components/hook-form/RHFCheckbox'
import Checkbox from '@/components/Switch'

export default function SettingsEmail() {
  const { t } = useTranslate()
  const [active, setActive] = useState(false)

  const UpdateUserSchema = Yup.object().shape({
    server: Yup.string().required(t('This field is required')),
    username: Yup.string().required(t('This field is required')),
    password: Yup.string().required(t('Password is required')),
    ssl: Yup.boolean(),
  })

  const defaultValues = {
    server: '',
    username: '',
    password: '',
    ssl: false,
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
        <CardContent className='flex flex-col gap-5'>
          <div className='inline-flex items-center gap-5'>
            <Checkbox checked={active} onCheckedChange={(checked) => setActive(checked)} />
            <label className='text-sm font-medium dark:text-white'>{t('Activate')}</label>
          </div>
          <p className='font-medium text-gray-600 dark:text-gray-400'>{t('SMTP Configuration')}</p>
          <RHFTextField disabled={!active} name='server' label={t('Mail Server')} />
          <RHFTextField disabled={!active} name='username' label={t('Username')} />
          <RHFTextField disabled={!active} name='password' type='password' label={t('Password')} />
          <RHFCheckbox name='ssl' label={t('Secure Sockets Layer (SSL)')} disabled={!active} />{' '}
          <Button className='w-full self-center md:w-1/3' disabled={!active} type='submit'>
            {t('Save Changes')}
          </Button>
        </CardContent>
      </Card>
    </FormProvider>
  )
}
