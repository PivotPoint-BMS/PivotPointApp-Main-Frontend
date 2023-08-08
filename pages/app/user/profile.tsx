import React, { useEffect, useState } from "react"
// next
import Head from "next/head"
import { useRouter } from "next/router"
// routes
import { PATH_ACCOUNT, PATH_DASHBOARD } from "routes/paths"
// hooks
import useTranslate from "hooks/useTranslate"
// sections
import ProfileGeneral from "sections/dashboard/user/profile/ProfileGeneral"
import ProfilePassword from "sections/dashboard/user/profile/ProfilePassword"
import ProfileBilling from "sections/dashboard/user/profile/ProfileBilling"
import ProfileNotification from "sections/dashboard/user/profile/ProfileNotification"
import ProfileSupport from "sections/dashboard/user/profile/ProfileSupport"
// layout
import Layout from "layout/Index"
// components
import { Icon as Iconify } from "@iconify/react"
import { HeaderBreadcrumbs } from "components"
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from "components/Tabs"
import ProfileLayout from "sections/dashboard/user/profile/ProfileLayout"

const TABS = [
  { name: "General", icon: "mdi:user-circle", value: "general" },
  { name: "Password", icon: "mdi:password", value: "password" },
  { name: "Billing", icon: "basil:invoice-solid", value: "billing" },
  { name: "Notification", icon: "ic:round-notifications", value: "notification" },
  { name: "Layout", icon: "mingcute:layout-4-fill", value: "layout" },
  { name: "Support", icon: "material-symbols:contact-support-rounded", value: "support" },
]

function Profile() {
  const { t, locale } = useTranslate()
  const { push, pathname, query } = useRouter()
  const [tab, setTab] = useState(query?.tab ? (query?.tab as string) : "general")

  useEffect(() => {
    push(pathname, { query: { tab } })
  }, [pathname, tab])

  return (
    <>
      <Head>
        <title>PivotPoint BMS | {t("Profile")}</title>
      </Head>
      <div className='flex max-w-full flex-col overflow-hidden px-5'>
        <HeaderBreadcrumbs
          heading={t("Profile")}
          links={[
            { name: t("Dashboard"), href: PATH_DASHBOARD.root },
            { name: t("User"), href: PATH_ACCOUNT.profile },
            { name: t("Profile") },
          ]}
        />
        <TabsRoot
          defaultValue='general'
          dir={locale === "ar" ? "rtl" : "ltr"}
          value={tab}
          onValueChange={(value) => setTab(value)}
        >
          <TabsList className='rounded-lg border dark:border-gray-600'>
            {TABS.map((item, i) => (
              <TabsTrigger key={i} value={item.value}>
                <div className='flex w-max cursor-pointer items-center gap-2'>
                  {item.icon && <Iconify icon={item.icon} height={20} width={20} />}
                  <label className='cursor-pointer font-medium'>{t(item.name)}</label>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value='general' className=' py-6'>
            <ProfileGeneral />
          </TabsContent>
          <TabsContent value='password' className=' py-6'>
            <ProfilePassword />
          </TabsContent>
          <TabsContent value='billing' className=' py-6'>
            <ProfileBilling />
          </TabsContent>
          <TabsContent value='notification' className=' py-6'>
            <ProfileNotification />
          </TabsContent>{" "}
          <TabsContent value='layout' className=' py-6'>
            <ProfileLayout />
          </TabsContent>
          <TabsContent value='support' className='w-full py-6'>
            <ProfileSupport />
          </TabsContent>
        </TabsRoot>
      </div>
    </>
  )
}

Profile.getLayout = function getLayout(page: JSX.Element) {
  return <Layout variant='dashboard'>{page}</Layout>
}

export default Profile
