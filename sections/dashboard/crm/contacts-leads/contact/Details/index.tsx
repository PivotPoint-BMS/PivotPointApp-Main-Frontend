import clsx from "clsx"
// radix
import * as TabsPrimitive from "@radix-ui/react-tabs"
// hooks
import useTranslate from "hooks/useTranslate"
// components
import { Icon as Iconify } from "@iconify/react"
import Card from "components/Card"
// sections
import Notes from "./notes"
import Activities from "./activities"

const TABS = [
  { name: "Activity", value: "activity", icon: "fluent:clipboard-task-24-filled" },
  { name: "Notes", value: "notes", icon: "material-symbols:note" },
  { name: "Emails", value: "emails", icon: "material-symbols:mail" },
  { name: "Calls", value: "calls", icon: "material-symbols:call" },
  { name: "Meetings", value: "meetings", icon: "material-symbols:groups" },
]

export default function Details() {
  const { t, locale } = useTranslate()
  return (
    <Card
      fullWidth
      className='rounded-tr-none rounded-br-none rounded-bl-none !border-gray-200 dark:!border-gray-700 dark:!bg-gray-900 md:col-span-2'
      variant='outlined'
    >
      <TabsPrimitive.Root defaultValue='activity' dir={locale === "ar" ? "rtl" : "ltr"}>
        <TabsPrimitive.List className='flex w-full items-center rounded-t-lg border-b  bg-gray-100 dark:border-gray-700 dark:bg-gray-800'>
          {TABS.map((item, i) => (
            <TabsPrimitive.Trigger
              key={i}
              value={item.value}
              className={clsx(
                "relative flex flex-1 cursor-pointer items-center justify-center gap-3 px-4 pt-3 pb-3 text-sm transition-all",
                "before:absolute before:bottom-0 before:h-[3px] before:w-full before:rounded-t-full before:bg-primary-600 before:transition-all ltr:before:left-0 rtl:before:right-0",
                "before:duration-500 data-[state=inactive]:before:w-0",
                "data-[state=inactive]:text-gray-600 dark:data-[state=inactive]:text-gray-400"
              )}
            >
              <div className='flex w-max cursor-pointer items-center gap-2'>
                {item.icon && <Iconify icon={item.icon} height={20} width={20} />}
                <label className='cursor-pointer font-medium'>{t(item.name)}</label>
              </div>
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>
        <TabsPrimitive.Content value='activity' className='h-full w-full'>
          <Activities />
        </TabsPrimitive.Content>
        <TabsPrimitive.Content value='notes' className='w-full'>
          <Notes />
        </TabsPrimitive.Content>
      </TabsPrimitive.Root>
    </Card>
  )
}
