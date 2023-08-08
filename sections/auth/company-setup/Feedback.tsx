import React, { useState } from "react"
import * as Yup from "yup"
// next
import { useRouter } from "next/router"
// framer motion
import { motion } from "framer-motion"
// api
import { useCreationStepSixMutation } from "store/api/auth/companyApi"
// hooks
import useTranslate from "hooks/useTranslate"
import useSnackbar from "hooks/useSnackbar"
// routes
import { PATH_DASHBOARD } from "routes/paths"
// components
import StarRatingComponent from "react-star-rating-component"
import { FormProvider } from "components/hook-form"
import { MotionContainer } from "components/animate"
import { varFade } from "components/animate/variants"
import RHFTextArea from "components/hook-form/RHFTextArea"
import Button from "components/Button"
import { FieldValues, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Icon } from "@iconify/react"

export default function Feedback() {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const { push, pathname, reload } = useRouter()

  const [stars, setStars] = useState(0)

  const [creationStepSix, { isLoading }] = useCreationStepSixMutation()

  const FeedbackSchema = Yup.object().shape({
    feedback: Yup.string().required(t("Please give us your feedback")),
    stars: Yup.number().required(t("Please give us a rating")),
  })

  const defaultValues = {
    feedback: "",
    stars: 0,
  }

  const methods = useForm<FieldValues>({
    resolver: yupResolver(FeedbackSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods

  const onSubmit = async (data: FieldValues) => {
    creationStepSix({
      feedback: data.feedback,
      stars: data.stars,
    })
      .then(() => {
        if (pathname === PATH_DASHBOARD.crm.dashboard) reload()
        else push(PATH_DASHBOARD.crm.dashboard)
      })
      .catch(() =>
        open({
          message: t("A problem has occurred."),
          type: "error",
          variant: "contained",
        })
      )
  }

  return (
    <MotionContainer>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className='mx-auto flex h-full min-w-[600px] flex-col items-center justify-center gap-5 rounded-xl px-10 py-10 lg:w-3/5'>
          <motion.div
            variants={varFade().in}
            className='flex h-full w-full flex-col items-center gap-6'
          >
            <h1 className='text-3xl font-semibold'>{t("Feedback")}</h1>
            <p className='text-center text-gray-600 dark:text-gray-300'>
              {t(
                "Please give us your feedback about the onboarding process. We will use this feedback to improve it."
              )}
            </p>
            <StarRatingComponent
              name='stars'
              starCount={5}
              value={stars}
              onStarClick={(value) => {
                setStars(value)
                setValue("stars", value)
              }}
              renderStarIcon={() => <Icon icon='solar:star-bold' height={24} />}
              emptyStarColor='#D1D5DB'
            />
            {errors.stars && (
              <span className='text-xs text-red-500'>{errors.stars.message?.toString()}</span>
            )}
            <RHFTextArea name='feedback' label={t("Feedback")} placeholder={t("Your feedback")} />
            <div className='flex w-full items-center justify-end gap-4'>
              <Button
                variant='outlined'
                onClick={() => {
                  if (pathname === PATH_DASHBOARD.crm.dashboard) reload()
                  else push(PATH_DASHBOARD.crm.dashboard)
                }}
              >
                {t("Skip to dashboard")}
              </Button>
              <Button type='submit' loading={isLoading}>
                {t("Send feedback")}
              </Button>
            </div>
          </motion.div>
        </div>
      </FormProvider>
    </MotionContainer>
  )
}
