import React, { useCallback, useState } from "react"
import * as Yup from "yup"
import clsx from "clsx"
// frame motion
import { motion } from "framer-motion"
// hooks
import useTranslate from "hooks/useTranslate"
import useSnackbar from "hooks/useSnackbar"
// utils
import { fData } from "utils/formatNumber"
// apis
import { useCreationStepOneMutation } from "store/api/auth/companyApi"
// config
import { BUSINESS_TYPES } from "config"
// form
import { FieldValues, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
// components
import Select from "react-select"
import { Button, RHFField } from "components"
import { FormProvider, RHFTextField } from "components/hook-form"
import MotionContainer from "components/animate/MotionContainer"
import { varFade } from "components/animate/variants"
import RHFUploadAvatar from "components/hook-form/RHFUpload"

export default function Company({ handleNext }: { handleNext: () => void }) {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const [type, setBusinessType] = useState<number | null>(null)

  // Mutations
  const [creationStepOne, { isLoading }] = useCreationStepOneMutation()

  const CompanySetupSchema = Yup.object().shape({
    logo: Yup.mixed(),
    name: Yup.string().min(3, t("Too short")).required(t("This field is required")),
    slogan: Yup.string(),
    currency: Yup.string().required(t("This field is required")),
    website: Yup.string(),
    type: Yup.number(),
  })

  const defaultValues = {
    logo: null,
    name: "",
    slogan: "",
    currency: "",
    website: "",
    type: 100,
  }

  const methods = useForm<FieldValues>({
    resolver: yupResolver(CompanySetupSchema),
    defaultValues,
  })

  const { setValue, handleSubmit } = methods

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]

      if (file) {
        setValue(
          "logo",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      }
    },
    [setValue]
  )

  const onSubmit = async (data: FieldValues) => {
    const formData = new FormData()

    formData.append("logo", data.logo)
    formData.append("name", data.name)
    formData.append("slogan", data.slogan)
    formData.append("website", data.website)
    formData.append("type", data.type)
    formData.append("currency", data.currency)
    creationStepOne(formData)
      .unwrap()
      .then(() => {
        handleNext()
      })
      .catch(() => {
        open({
          message: t("A problem has occurred."),
          autoHideDuration: 6000,
          type: "error",
          variant: "contained",
        })
      })
  }

  return (
    <MotionContainer>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className='container mx-auto flex h-full flex-col items-center justify-center gap-5 rounded-xl px-10 py-10  sm:px-16 md:px-32 lg:w-3/4'>
          <motion.div
            variants={varFade().in}
            className='flex h-full w-full flex-col items-center gap-6'
          >
            <h1 className='text-3xl font-semibold'>{t("Let's set up your company")}</h1>
            <p className='text-center text-gray-600 dark:text-gray-300'>
              {t(
                "We need some initial information about your company to get you started, please fill in the fields below"
              )}
            </p>
            <label
              className={clsx(
                "flex items-center gap-1 text-sm font-medium text-gray-800 dark:text-gray-200"
              )}
            >
              {t("Company Logo")} <span className='text-xs font-light'>({t("Optional")})</span>
            </label>

            <RHFUploadAvatar
              maxSize={3145728}
              onDrop={handleDrop}
              name='logo'
              helperText={
                <p className='mx-auto mt-3 mb-6 block flex-1 text-center text-sm text-gray-600 dark:text-gray-400'>
                  {t("Allowed *.jpeg, *.jpg, *.png, *.gif")}
                  <br /> {t("max size of")} {fData(3145728)}
                </p>
              }
            />
            <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-2'>
              <RHFTextField name='name' label={t("Company name")} />
              <RHFTextField name='website' optional label={t("Company Website")} />
              <RHFField name='type' label={t("Business Type")}>
                <Select
                  options={BUSINESS_TYPES}
                  getOptionLabel={(option) => t(option.label)}
                  onChange={(newValue) => {
                    setValue("type", newValue?.value)
                    setBusinessType(newValue?.value || 0)
                  }}
                  value={BUSINESS_TYPES.find((item) => item.value === type)}
                  className='react-select-container'
                  classNamePrefix='react-select'
                  placeholder=''
                />
              </RHFField>
              <RHFTextField name='currency' label={t("Currency")} />
              <div className='md:col-span-2'>
                <RHFTextField name='slogan' label={t("Company Slogan")} optional />
              </div>
            </div>
          </motion.div>
          <Button type='submit' className='w-1/3 self-end' loading={isLoading}>
            {t("Next")}
          </Button>
        </div>
      </FormProvider>
    </MotionContainer>
  )
}
