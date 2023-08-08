import React, { useEffect } from "react"
import * as Yup from "yup"
// form
import { useForm, FieldValues } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
// types
import { ChangePassword } from "types"
// api
import { useChangePasswordMutation } from "store/api/auth/authApi"
import { useGetUserDetailsQuery } from "store/api/settings/settingsAPIs"
// hooks
import useTranslate from "hooks/useTranslate"
import useSnackbar from "hooks/useSnackbar"
// components
import { FormProvider, RHFTextField } from "components/hook-form"
import Card from "components/Card"
import CardContent from "components/CardContent"
import Button from "components/Button"
import LoadingIndicator from "components/LoadingIndicator"

export default function ProfilePassword() {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const { data: userData, isLoading: detailsLoading } = useGetUserDetailsQuery()
  const [changePassword, { isLoading, isError, isSuccess }] = useChangePasswordMutation()

  const UpdateUserSchema = Yup.object().shape({
    currentPassword: Yup.string().required(t("Password is required")),
    newPassword: Yup.string()
      .required(t("Password is required"))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.-_])[A-Za-z\d@$!%*?&.-_]{8,}$/,
        t(
          "Password must be at least 8 characters and include at least 1 upper, 1 lower, 1 digit, and 1 special character"
        )
      ),
    confirmPassword: Yup.string()
      .required(t("Confirm your password"))
      .oneOf([Yup.ref("newPassword"), null], t("Passwords does not match")),
  })

  const defaultValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  }

  const methods = useForm<FieldValues>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  })

  const { handleSubmit } = methods

  const onSubmit = async (data: FieldValues) => {
    const newPassword: ChangePassword = {
      currentPassword: data.currentPassword,
      email: userData?.data.email || "",
      newPassword: data.newPassword,
    }
    changePassword(newPassword)
  }

  useEffect(() => {
    if (isError) {
      open({
        message: t("A problem has occurred."),
        autoHideDuration: 4000,
        type: "error",
        variant: "contained",
      })
    }
    if (isSuccess) {
      open({
        message: t("Password Changed Successfully."),
        autoHideDuration: 4000,
        type: "success",
        variant: "contained",
      })
    }
  }, [isError, isSuccess])

  return (
    <Card className='col-span-2 !w-full'>
      {detailsLoading ? (
        <div className='flex h-56 w-full items-center justify-center'>
          <LoadingIndicator />
        </div>
      ) : (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <CardContent className='flex flex-col gap-5'>
            <RHFTextField name='currentPassword' type='password' label={t("Old Password")} />
            <RHFTextField name='newPassword' type='password' label={t("New Password")} />
            <RHFTextField name='confirmPassword' type='password' label={t("Confirm password")} />
            <Button className='w-full self-center md:w-1/3' type='submit' loading={isLoading}>
              {t("Save Changes")}
            </Button>
          </CardContent>
        </FormProvider>
      )}
    </Card>
  )
}
