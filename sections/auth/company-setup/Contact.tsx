import * as Yup from "yup"
// frame motion
import { motion } from "framer-motion"
// hooks
import useTranslate from "hooks/useTranslate"
import useSnackbar from "hooks/useSnackbar"
// apis
import { useCreationStepTwoMutation } from "store/api/auth/companyApi"
// form
import { FieldValues, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
// components
import { Button } from "components"
import { FormProvider, RHFTextField } from "components/hook-form"
import MotionContainer from "components/animate/MotionContainer"
import { varFade } from "components/animate/variants"

export default function Contact({ handleNext }: { handleNext: () => void }) {
  const { t } = useTranslate()
  const { open } = useSnackbar()

  // Mutations
  const [creationStepTwo, { isLoading }] = useCreationStepTwoMutation()

  const CompanySetupSchema = Yup.object().shape({
    contactEmail: Yup.string().email(t("Email not valid")).required(t("This field is required")),
    contactPhone: Yup.string()
      .matches(/^(?:0|\+123)\d{9}$/, t("Please enter a valid phone number"))
      .required(t("This field is required")),
    address: Yup.string().required(t("This field is required")),
  })

  const defaultValues = {
    contactEmail: "",
    contactPhone: "",
    address: "",
  }

  const methods = useForm<FieldValues>({
    resolver: yupResolver(CompanySetupSchema),
    defaultValues,
  })

  const { handleSubmit } = methods

  const onSubmit = async (data: FieldValues) => {
    creationStepTwo({
      address: data.address,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
    })
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
        <div className='container mx-auto flex h-full flex-col items-center justify-center gap-5 rounded-xl px-10 py-10  sm:px-16 md:px-32 lg:w-1/2'>
          <motion.div
            variants={varFade().in}
            className='flex h-full w-full flex-col items-center gap-6'
          >
            <h1 className='text-3xl font-semibold'>{t("Contact Informations")}</h1>
            <p className='text-center text-gray-600 dark:text-gray-300'>
              {t(
                "Please enter your contact informations. This informations will be used to contact you."
              )}
            </p>

            <div className='grid w-full grid-cols-1 gap-4'>
              <RHFTextField name='contactEmail' label={t("Company Email")} />
              <RHFTextField name='contactPhone' label={t("Company Phone Number")} />
              <RHFTextField name='address' label={t("Company Addrsss")} />
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
