import React from "react"
// hooks
import useTranslate from "hooks/useTranslate"
// components
import { Icon as Iconify } from "@iconify/react"
import Card from "components/Card"
import CardContent from "components/CardContent"
import Button from "components/Button"
import Checkbox from "components/Switch"
import Select from "components/Select"

const exportTypes = [
  { label: "PDF", value: "pfd" },
  { label: "CSV", value: "csv" },
  { label: "EXCEL", value: "xlsx" },
]

export default function SettingsData() {
  const { t } = useTranslate()
  return (
    <Card className='!w-full'>
      <CardContent className='flex flex-col gap-5'>
        <p className='font-medium text-gray-600 dark:text-gray-400'>{t("Choose exported data")}</p>
        <div className='inline-flex items-center gap-5'>
          <Checkbox defaultChecked />
          <label className='text-sm font-medium dark:text-white'>{t("Analytics")}</label>
        </div>
        <div className='inline-flex items-center gap-5'>
          <Checkbox defaultChecked />
          <label className='text-sm font-medium dark:text-white'> {t("Reports")}</label>
        </div>
        <div className='flex flex-col items-start gap-1 self-start'>
          <label className='text-sm font-medium dark:text-white'>{t("File type")}</label>
          <Select
            items={exportTypes}
            defaultValue={exportTypes[0].value}
            buttonProps={{ className: "w-fit" }}
          />
        </div>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
          <Button variant='outlined' startIcon={<Iconify icon='ic:round-file-download' />}>
            {t("Export Data")}
          </Button>
          <Button variant='outlined' startIcon={<Iconify icon='tabler:external-link' />}>
            {t("Access Settings")}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
