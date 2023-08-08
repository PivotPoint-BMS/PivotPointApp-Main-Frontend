import React from "react"
// next
import Head from "next/head"
// hooks
import useTranslate from "hooks/useTranslate"
// routes
import { PATH_DASHBOARD } from "routes/paths"
// layout
import Layout from "layout/Index"
import RoleBasedGuard from "guards/RoleBasedGuard"
// sections
import CreateEditInvoiceForm from "sections/dashboard/scm/invoices/CreateEditInvoiceForm"
// components
import HeaderBreadcrumbs from "components/HeaderBreadcrumbs"

function index() {
  const { t } = useTranslate()

  return (
    <>
      <Head>
        <title>{t("New Invoice")} | Pivot Point BMS</title>
      </Head>
      <div className='flex max-w-full flex-col px-5'>
        <HeaderBreadcrumbs
          heading={t("New Invoice")}
          links={[
            { name: t("Dashboard"), href: PATH_DASHBOARD.root },
            { name: t("Supply Chain & Inventory"), href: PATH_DASHBOARD.scm.dashboard },
            { name: t("Invoices"), href: PATH_DASHBOARD.scm.invoices.root },
            { name: t("New Invoice") },
          ]}
        />
        <CreateEditInvoiceForm />
      </div>
    </>
  )
}

index.getLayout = function getLayout(page: JSX.Element) {
  return (
    <Layout variant='dashboard'>
      <RoleBasedGuard accessibleRoles={["Owner", "SCM"]}>{page}</RoleBasedGuard>
    </Layout>
  )
}

export default index
