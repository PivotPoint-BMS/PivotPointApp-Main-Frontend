import React from "react"
// next
import Head from "next/head"
// hooks
import useTranslate from "hooks/useTranslate"
// routes
import { PATH_DASHBOARD } from "routes/paths"
// layout
import Layout from "layout/Index"
// sections
import InvoicesList from "sections/dashboard/scm/invoices/list"
// components
import { Icon } from "@iconify/react"
import { Button, Card, HeaderBreadcrumbs } from "components"
import RoleBasedGuard from "guards/RoleBasedGuard"
import Link from "next/link"

function index() {
  const { t } = useTranslate()

  return (
    <>
      <Head>
        <title>{t("Invoices")} | Pivot Point BMS</title>
      </Head>
      <div className='flex max-w-full flex-col px-5'>
        <HeaderBreadcrumbs
          heading={t("Invoices")}
          links={[
            { name: t("Dashboard"), href: PATH_DASHBOARD.root },
            { name: t("Supply Chain & Inventory"), href: PATH_DASHBOARD.scm.dashboard },
            { name: t("Invoices") },
          ]}
          action={
            <>
              <Link href={PATH_DASHBOARD.scm.invoices.create}>
                <Button startIcon={<Icon icon='ic:round-add' height={24} />}>
                  {t("Add an invoice")}
                </Button>
              </Link>
            </>
          }
        />
        <Card fullWidth>
          <InvoicesList />
        </Card>
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
