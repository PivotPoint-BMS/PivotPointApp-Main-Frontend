import React from 'react'
import * as Yup from 'yup'
// next
import Link from 'next/link'
// form
import { useForm, FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// hooks
import useTranslate from 'hooks/useTranslate'
// routes
import { PATH_PAGE } from 'routes/paths'
// components
import { Icon as Iconify } from '@iconify/react'
import Card from 'components/Card'
import CardContent from 'components/CardContent'
import { FormProvider, RHFTextField } from 'components/hook-form'
import Progressbar from 'components/Progressbar'

export default function SettingsApi() {
  const { t } = useTranslate()
  const UpdateUserSchema = Yup.object().shape({
    API_KEY: Yup.string(),
  })

  const defaultValues = {
    API_KEY: '',
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
    <Card className='!w-full'>
      <CardContent>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-5'>
            <RHFTextField label={t('API KEY')} name='API_KEY' />
            <div className='flex flex-col gap-1'>
              <div className='flex items-center justify-between'>
                <label className='text-sm font-medium dark:text-white'>{t('API Usage')}</label>
                <p className='text-sm font-medium dark:text-white'>(80%)</p>
              </div>
              <Progressbar progress={80} />
            </div>
            <Link
              href={PATH_PAGE.apiDocs}
              className='flex items-center gap-1 font-medium text-primary-600 hover:underline dark:text-primary-400'
            >
              <span>{t('API Docs')}</span>
              <Iconify icon='tabler:external-link' height={16} />
            </Link>
          </div>
        </FormProvider>
      </CardContent>
    </Card>
  )
}
