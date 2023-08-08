import React, { useState } from "react"
// next
import Head from "next/head"
import { useRouter } from "next/router"
// hooks
import useTranslate from "hooks/useTranslate"
// routes
import { PATH_DASHBOARD } from "routes/paths"
// apis
import { useGetInvoiceQuery } from "store/api/scm/invoices/invoicesApis"
// config
import { INVOICE_STATUS } from "config"
// layout
import Layout from "layout/Index"
import RoleBasedGuard from "guards/RoleBasedGuard"
// sections
// components
import { Icon } from "@iconify/react"
import { HeaderBreadcrumbs, LoadingIndicator, IconButton, Tooltip, Select } from "components"
import Link from "next/link"

function index() {
  const { t } = useTranslate()
  const {
    query: { id },
    isFallback,
  } = useRouter()

  const [status, setStatus] = useState(0)

  // query
  const {
    data: invoice,
    isSuccess,
    isLoading,
  } = useGetInvoiceQuery(id?.toString() ? id?.toString() : "", {
    skip: isFallback,
    refetchOnFocus: true,
  })

  if (isLoading)
    return (
      <>
        <Head>
          <title>{t("Invoice Details")} | Pivot Point BMS</title>
        </Head>
        <div className='flex max-w-full flex-col px-5'>
          <HeaderBreadcrumbs
            heading={t("Invoice Details")}
            links={[
              { name: t("Dashboard"), href: PATH_DASHBOARD.root },
              { name: t("Supply Chain & Inventory"), href: PATH_DASHBOARD.scm.dashboard },
              { name: t("Invoices"), href: PATH_DASHBOARD.scm.invoices.root },
              { name: t("Invoice Details") },
            ]}
          />
          <div className='flex h-56 w-full items-center justify-center'>
            <LoadingIndicator />
          </div>
        </div>
      </>
    )
  if (isSuccess)
    return (
      <>
        <Head>
          <title>{t("Invoice Details")} | Pivot Point BMS</title>
        </Head>
        <div className='flex max-w-full flex-col px-5'>
          <HeaderBreadcrumbs
            heading={t("Invoice Details")}
            links={[
              { name: t("Dashboard"), href: PATH_DASHBOARD.root },
              { name: t("Supply Chain & Inventory"), href: PATH_DASHBOARD.scm.dashboard },
              { name: t("Invoices"), href: PATH_DASHBOARD.scm.invoices.root },
              { name: t("Invoice Details") },
            ]}
          />
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <Tooltip title={t("Edit")} side='bottom'>
                <Link href={PATH_DASHBOARD.scm.invoices.edit(invoice.data.id)}>
                  <IconButton>
                    <Icon icon='ic:round-edit' height={22} />
                  </IconButton>
                </Link>
              </Tooltip>
              <Tooltip title={t("Preview")} side='bottom'>
                <IconButton>
                  <Icon icon='ic:round-remove-red-eye' height={22} />
                </IconButton>
              </Tooltip>
              <Tooltip title={t("Download")} side='bottom'>
                <IconButton>
                  <Icon icon='ic:baseline-cloud-download' height={22} />
                </IconButton>
              </Tooltip>
              <Tooltip title={t("Print")} side='bottom'>
                <IconButton>
                  <Icon icon='ic:round-print' height={22} />
                </IconButton>
              </Tooltip>
              <Tooltip title={t("Archive")} side='bottom'>
                <IconButton>
                  <Icon icon='ic:round-archive' height={22} />
                </IconButton>
              </Tooltip>
              <Tooltip title={t("Delete")} side='bottom'>
                <IconButton>
                  <Icon
                    icon='ic:round-delete'
                    className='text-red-600 dark:text-red-400'
                    height={22}
                  />
                </IconButton>
              </Tooltip>
            </div>
            <Select
              items={INVOICE_STATUS.map((item) => ({
                label: t(item.label),
                value: item.value.toString(),
              }))}
              value={status.toString()}
              onValueChange={(value) => {
                if (value === "1") {
                  setStatus(1)
                } else if (value === "2") {
                  setStatus(2)
                } else if (value === "3") {
                  setStatus(3)
                }
              }}
            />
          </div>
        </div>
      </>
    )
  return (
    <>
      <Head>
        <title>{t("Invoice Details")} | Pivot Point BMS</title>
      </Head>
      <div className='flex max-w-full flex-col px-5'>
        <HeaderBreadcrumbs
          heading={t("Invoice Details")}
          links={[
            { name: t("Dashboard"), href: PATH_DASHBOARD.root },
            { name: t("Supply Chain & Inventory"), href: PATH_DASHBOARD.scm.dashboard },
            { name: t("Invoices"), href: PATH_DASHBOARD.scm.invoices.root },
            { name: t("Invoice Details") },
          ]}
        />
        <div className='flex h-full w-full items-center justify-center'>
          <div>{t("Invoice Not Found")}</div>
        </div>
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
