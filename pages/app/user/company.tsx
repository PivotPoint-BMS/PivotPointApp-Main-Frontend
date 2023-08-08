import React from "react"
import clsx from "clsx"
// next
import Head from "next/head"
// hooks
import useTranslate from "hooks/useTranslate"
// routes
import { PATH_ACCOUNT, PATH_DASHBOARD } from "routes/paths"
// sections
import SettingsDetails from "sections/dashboard/user/settings/SettingsDetails"
import SettingsEmail from "sections/dashboard/user/settings/SettingsEmail"
import SettingsStorage from "sections/dashboard/user/settings/SettingsStorage"
import SettingsIntegration from "sections/dashboard/user/settings/SettingsIntegration"
import SettingsSecurity from "sections/dashboard/user/settings/SettingsSecurity"
import SettingsApi from "sections/dashboard/user/settings/SettingsApi"
// layout
import Layout from "layout/Index"
// componenets
import { Icon as Iconify } from "@iconify/react"
import { HeaderBreadcrumbs } from "components"
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from "components/Tabs"
import RoleBasedGuard from "guards/RoleBasedGuard"

function Settings() {
  const { t, locale } = useTranslate()

  const TABS = [
    { name: "Details", icon: "fluent:card-ui-24-filled", value: "details", disabled: false },
    { name: "Email", icon: "ion:mail", value: "email", disabled: false },
    { name: "API", icon: "ant-design:api-filled", value: "api" },
    {
      name: "Storage",
      icon: "material-symbols:home-storage-rounded",
      value: "storage",
      disabled: true,
    },
    { name: "Integration", icon: "mdi:link-box", value: "integration", disabled: true },
  ]

  return (
    <>
      <Head>
        <title>PivotPoint BMS | {t("Company Settings")}</title>
      </Head>
      <div className='flex max-w-full flex-col overflow-hidden px-5'>
        <HeaderBreadcrumbs
          heading={t("Company Settings")}
          links={[
            { name: t("Dashboard"), href: PATH_DASHBOARD.root },
            { name: t("User"), href: PATH_ACCOUNT.profile },
            { name: t("Company Settings") },
          ]}
        />
        <TabsRoot defaultValue='details' dir={locale === "ar" ? "rtl" : "ltr"}>
          <TabsList className='rounded-lg border dark:border-gray-600'>
            {TABS.map((item, i) => (
              <TabsTrigger key={i} value={item.value} disabled={item.disabled}>
                {item.icon && <Iconify icon={item.icon} height={20} width={20} />}
                <label className='cursor-pointer font-medium'>{t(item.name)}</label>
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value='details' className={clsx("w-full py-6")}>
            <SettingsDetails />
          </TabsContent>{" "}
          <TabsContent value='email' className={clsx("w-full py-6")}>
            <SettingsEmail />
          </TabsContent>{" "}
          <TabsContent value='storage' className={clsx("w-full py-6")}>
            <SettingsStorage />
          </TabsContent>{" "}
          <TabsContent value='integration' className={clsx("w-full py-6")}>
            <SettingsIntegration />
          </TabsContent>{" "}
          <TabsContent value='4' className={clsx("w-full py-6")}>
            <SettingsSecurity />
          </TabsContent>{" "}
          <TabsContent value='api' className={clsx("w-full py-6")}>
            <SettingsApi />
          </TabsContent>
        </TabsRoot>
      </div>
    </>
  )
}

Settings.getLayout = function getLayout(page: JSX.Element) {
  return (
    <Layout variant='dashboard'>
      <RoleBasedGuard accessibleRoles={["Owner"]}>{page}</RoleBasedGuard>
    </Layout>
  )
}

export default Settings
