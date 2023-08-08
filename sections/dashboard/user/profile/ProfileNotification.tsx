import React, { useEffect, useMemo, useState } from "react"
// types
import { NotificationsSettings } from "types"
// api
import {
  useGetNotifficationsSettingsQuery,
  useUpdateNotificationsSettingsMutation,
} from "store/api/settings/settingsAPIs"
// hooks
import useTranslate from "hooks/useTranslate"
import useSnackbar from "hooks/useSnackbar"
// components
import { Backdrop, Card, CardContent, LoadingIndicator, Switch } from "components"

export default function ProfileNotification() {
  const { t } = useTranslate()
  const { open } = useSnackbar()

  const { data, isLoading, refetch } = useGetNotifficationsSettingsQuery()
  const [update, { isLoading: isUpdateLoading, isError, isSuccess }] =
    useUpdateNotificationsSettingsMutation()

  const defaultValues = useMemo<NotificationsSettings>(
    () => ({
      passwordChange: data?.data.passwordChange || false,
      weeklyReport: data?.data.weeklyReport || false,
      subscriptionRenewal: data?.data.subscriptionRenewal || false,
      successfulRenewal: data?.data.successfulRenewal || false,
    }),
    [isLoading]
  )
  const [settings, setSettings] = useState<NotificationsSettings>(defaultValues)

  const handleValueChange = (name: string, value: boolean) => {
    setSettings((prevState) => ({ ...prevState, [name]: value }))
    update(settings).then(() => refetch())
  }

  useEffect(() => {
    setSettings(defaultValues)
  }, [isLoading])

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
        message: t("Setting Updated Successfully."),
        autoHideDuration: 4000,
        type: "success",
        variant: "contained",
      })
    }
  }, [isError, isSuccess])

  return (
    <Card className='!w-full'>
      {isLoading ? (
        <div className='flex h-56 w-full items-center justify-center'>
          <LoadingIndicator />
        </div>
      ) : (
        <CardContent className='flex flex-col gap-5'>
          <h1 className='font-medium text-gray-600 dark:text-gray-400'>{t("Activity")}</h1>
          <div className='inline-flex items-center gap-5'>
            <Switch
              checked={settings.passwordChange}
              onCheckedChange={(value) => handleValueChange("passwordChange", value)}
            />
            <label className='text-sm font-medium dark:text-white'>
              {t("Email me when")} {t("password change")}
            </label>
          </div>
          <h1 className='mt-5 font-medium text-gray-600 dark:text-gray-400'>{t("Application")}</h1>
          <div className='inline-flex items-center gap-5'>
            <Switch
              checked={settings.weeklyReport}
              onCheckedChange={(value) => handleValueChange("weeklyReport", value)}
            />
            <label className='text-sm font-medium dark:text-white'>{t("Weekly reports")}</label>
          </div>
          <div className='inline-flex items-center gap-5'>
            <Switch
              checked={settings.subscriptionRenewal}
              onCheckedChange={(value) => handleValueChange("subscriptionRenewal", value)}
            />
            <label className='text-sm font-medium dark:text-white'>
              {t("Subscription renewal")}
            </label>
          </div>
          <div className='inline-flex items-center gap-5'>
            <Switch
              checked={settings.successfulRenewal}
              onCheckedChange={(value) => handleValueChange("successfulRenewal", value)}
            />
            <label className='text-sm font-medium dark:text-white'>{t("Successful renewal")}</label>
          </div>
        </CardContent>
      )}
      <Backdrop open={isUpdateLoading} loading={isUpdateLoading} />
    </Card>
  )
}
