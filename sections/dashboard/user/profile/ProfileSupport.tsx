import React, { useEffect, useMemo } from 'react'
import * as Yup from 'yup'
// next
import Link from 'next/link'
// apis
import { useGetUserDetailsQuery } from 'store/api/settings/settingsAPIs'
// redux
import { useAppSelector } from 'store/hooks'
// form
import { useForm, FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// hooks
import useTranslate from 'hooks/useTranslate'
// config
import { PIVOTPOINT_SOCIALS } from 'config'
// components
import { Icon as Iconify } from '@iconify/react'
import { FormProvider, RHFTextField } from 'components/hook-form'
import Card from 'components/Card'
import CardContent from 'components/CardContent'
import Button from 'components/Button'
import RHFTextArea from 'components/hook-form/RHFTextArea'

export default function ProfileSupport() {
  const { t } = useTranslate()
  const { user } = useAppSelector((state) => state.session)
  const { data: userDetails, isLoading: isLoadingUserDetails } = useGetUserDetailsQuery()

  const UpdateUserSchema = Yup.object().shape({
    sender: Yup.string().required(t('This field is required')),
    title: Yup.string().required(t('This field is required')),
    email: Yup.string().email('Invalid email').required(t('This field is required')),
    message: Yup.string().min(2, 'Too short!').required(t('This field is required')),
  })

  const defaultValues = useMemo(
    () => ({
      sender: `${user?.firstName} ${user?.lastName} - Support` || '',
      email: userDetails?.data.email || '',
      title: '',
      message: '',
    }),
    [isLoadingUserDetails]
  )

  const methods = useForm<FieldValues>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  })

  const { handleSubmit, reset } = methods

  const onSubmit = async () => {
    try {
      // enqueueSnackbar('Update success!')
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (userDetails) {
      reset(defaultValues)
    }
  }, [userDetails, isLoadingUserDetails])

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card className='col-span-2 !w-full'>
        <CardContent className='flex flex-col gap-5 p-5'>
          <RHFTextField name='title' label={t('Title')} />
          <RHFTextArea name='title' label={t('Message')} />
          <Button className='w-full self-center md:w-1/3' type='submit'>
            {t('Send')}
          </Button>
          <Link
            href={`mailto:${PIVOTPOINT_SOCIALS.supportEmail}`}
            className='flex items-center gap-1 self-center font-medium text-primary-600 hover:underline dark:text-primary-400'
          >
            <span>{t('Support mail')}</span>
            <Iconify icon='tabler:external-link' height={16} />
          </Link>
        </CardContent>
      </Card>
    </FormProvider>
  )
}
