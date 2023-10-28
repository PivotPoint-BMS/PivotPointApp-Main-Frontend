/* eslint-disable quotes */
import React from "react"
import * as Yup from "yup"
// next
import Head from "next/head"
// hooks
import useTranslate from "hooks/useTranslate"
// components
import Layout from "layout/Index"
import { useRouter } from "next/router"
import { FormProvider } from "components/hook-form"
import RHFTextArea from "components/hook-form/RHFTextArea"
import { FieldValues, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Button from "components/Button"
import { useGetCompanyDetailsQuery, useSendFeedbackMutation } from "store/api/feedback/feedbackAPIs"
import Link from "next/link"
import useSnackbar from "hooks/useSnackbar"

function index() {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const {
    query: { companyId },
    isFallback,
  } = useRouter()
  const { data, isSuccess } = useGetCompanyDetailsQuery(
    companyId?.toString() ? companyId?.toString() : "",
    {
      skip: isFallback,
      refetchOnFocus: true,
    }
  )

  const [sendFeedback, { isLoading }] = useSendFeedbackMutation()

  const FeedbackSchema = Yup.object().shape({
    review: Yup.string().required(t("Feedback is required")),
  })

  const defaultValues = {
    review: "",
  }

  const methods = useForm<FieldValues>({
    resolver: yupResolver(FeedbackSchema),
    defaultValues,
  })

  const { handleSubmit } = methods

  const onSubmit = async (formData: FieldValues) => {
    sendFeedback({
      id: companyId?.toString() ? companyId?.toString() : "",
      review: formData.review,
    }).then(() => open({ message: "Review Sent, Thank you for your feedback", type: "success" }))
  }

  return (
    <>
      <Head>
        <title>Pivot Point BMS | {t("Feedback")}</title>
      </Head>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <main className='flex h-screen flex-col items-center justify-center'>
          <div className='container mx-auto flex flex-col items-center justify-center gap-5 px-10 sm:px-16 md:px-32 lg:w-1/2'>
            <h1 className='text-5xl font-semibold'>{t("Customer Feedback")}</h1>
            {isSuccess && (
              <>
                <h6 className='text-lg'>{data?.data.name}</h6>
                <Link href={data?.data.website ?? ""} target='_blank'>
                  <h6 className='hover:underline'>{data?.data.website}</h6>
                </Link>
              </>
            )}
            <p className='text-center text-gray-600 dark:text-gray-400'>
              {t(
                "We highly value your opinion and would greatly appreciate your feedback on your recent experience with our enterprise."
              )}{" "}
            </p>
            <RHFTextArea name='review' label={t("Review")} placeholder={t("Your feedback")} />
            <Button type='submit' loading={isLoading}>
              {t("Send")}
            </Button>
          </div>
        </main>
      </FormProvider>
    </>
  )
}

index.getLayout = function getLayout(page: JSX.Element) {
  return <Layout variant='main'>{page}</Layout>
}

export default index
