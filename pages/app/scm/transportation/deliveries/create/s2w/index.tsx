import React from "react"
// next
// next
import Head from "next/head"
// hooks
import useTranslate from "hooks/useTranslate"
// routes
// layout
import Layout from "layout/Index"
import HeaderBreadcrumbs from "components/HeaderBreadcrumbs"
import { PATH_DASHBOARD } from "routes/paths"
// sections
import CreateEditS2WDeliveryForm from "sections/dashboard/scm/transportation/deliveries/create/s2w/CreateEditS2WDeliveryForm"

// components

function index() {
  const { t } = useTranslate()

  return (
    <>
      <Head>
        <title>{t("New Delivery")} | Pivot Point BMS</title>
      </Head>
      <div className='flex max-w-full flex-col px-5'>
        <HeaderBreadcrumbs
          heading={t("New Delivery")}
          links={[
            { name: t("Dashboard"), href: PATH_DASHBOARD.root },
            { name: t("Supply Chain & Inventory"), href: PATH_DASHBOARD.scm.dashboard },
            { name: t("Transportation"), href: PATH_DASHBOARD.scm.transportation.root },
            { name: t("New Delivery") },
          ]}
        />
        <CreateEditS2WDeliveryForm />
      </div>
    </>
  )
}

index.getLayout = function getLayout(page: JSX.Element) {
  return <Layout variant='dashboard'>{page}</Layout>
}

export default index
