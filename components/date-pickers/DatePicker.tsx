import React from "react"
// hooks
import useTranslate from "hooks/useTranslate"
// components
import DatePicker, { DatePickerProps } from "react-date-picker"
import { Icon } from "@iconify/react"
// styles
import "react-date-picker/dist/DatePicker.css"
import "react-calendar/dist/Calendar.css"

export default function CustomDatePicker(props: DatePickerProps) {
  const { locale } = useTranslate()
  return (
    <DatePicker
      clearIcon={<Icon icon='ic:round-clear' height={16} />}
      calendarIcon={<Icon icon='uim:calender' height={16} />}
      locale={locale === "ar" ? "ar-dz" : locale}
      format='dd/MM/y'
      {...props}
    />
  )
}
