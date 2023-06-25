/* eslint-disable quotes */
import React from 'react'
import * as Yup from 'yup'
// next
import Head from 'next/head'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import Layout from 'layout/Index'
import { useRouter } from 'next/router'
import { useGetCompanyDetailsQuery } from 'store/api/settings/settingsAPIs'
import { FormProvider } from 'components/hook-form'
import RHFTextArea from 'components/hook-form/RHFTextArea'
import { FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from 'components/Button'

function index() {
  const { t } = useTranslate()
  const { query } = useRouter()
  const { data } = useGetCompanyDetailsQuery()

  const FeedbackSchema = Yup.object().shape({
    message: Yup.string().required(t('Feedback is required')),
  })

  const defaultValues = {
    message: '',
  }

  const methods = useForm<FieldValues>({
    resolver: yupResolver(FeedbackSchema),
    defaultValues,
  })

  const { handleSubmit } = methods

  const onSubmit = async (data: FieldValues) => {
    const feedbackData = data.message

    // feedback(feedbackData)
  }

  return (
    <>
      <Head>
        <title>Pivot Point BMS | {t('Feedback')}</title>
      </Head>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <main className='flex h-screen flex-col items-center justify-center'>
          <div className='container mx-auto flex flex-col items-center justify-center gap-5 px-10 sm:px-16 md:px-32 lg:w-1/2'>
            <h1 className='text-5xl font-semibold'>{t('Customer Feedback')}</h1>
            <p className='text-center text-gray-600 dark:text-gray-400'>
              {t(
                'We highly value your opinion and would greatly appreciate your feedback on your recent experience with our enterprise.'
              )}{' '}
            </p>
            <RHFTextArea name='message' label={t('Message')} placeholder={t('Your feedback')} />
            <Button type='submit'>{t('Send')}</Button>
          </div>
        </main>
      </FormProvider>
      s
    </>
  )
}

index.getLayout = function getLayout(page: JSX.Element) {
  return <Layout variant='main'>{page}</Layout>
}

export default index
