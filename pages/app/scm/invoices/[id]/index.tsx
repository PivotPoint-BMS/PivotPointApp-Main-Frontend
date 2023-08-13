import React, { useEffect, useState } from "react"
// next
import Head from "next/head"
import { useRouter } from "next/router"
// hooks
import useTranslate from "hooks/useTranslate"
// routes
import { useAppSelector } from "store/hooks"
import { PATH_DASHBOARD } from "routes/paths"
import Link from "next/link"
// apis
import {
  useCompletedInvoiceMutation,
  useGetInvoiceQuery,
  usePaidInvoiceMutation,
  usePendingInvoiceMutation,
} from "store/api/scm/invoices/invoicesApis"
import { useGetCompanyDetailsQuery } from "store/api/settings/settingsAPIs"
// config
import { INVOICE_STATUS } from "config"
// hooks
import { useBoolean } from "usehooks-ts"
// layout
import Layout from "layout/Index"
import RoleBasedGuard from "guards/RoleBasedGuard"
// sections
import InvoicePreview from "sections/dashboard/scm/invoices/details/InvoicePreview"
// react pdf
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer"
// components
import { Icon } from "@iconify/react"
import {
  HeaderBreadcrumbs,
  LoadingIndicator,
  IconButton,
  Tooltip,
  Select,
  Backdrop,
  Dialog,
} from "components"
import InvoicePDFView from "sections/dashboard/scm/invoices/details/InvoicePDFView"

function index() {
  const { t } = useTranslate()
  const {
    query: { id },
    isFallback,
  } = useRouter()
  const [status, setStatus] = useState(0)
  const { value: openPdf, setTrue, setFalse } = useBoolean(false)

  const { PageNumber, PageSize } = useAppSelector((state) => state.pagination)

  // query
  const {
    data: invoice,
    isSuccess,
    isFetching,
    isLoading,
  } = useGetInvoiceQuery(id?.toString() ? id?.toString() : "", {
    skip: isFallback,
    refetchOnFocus: true,
  })
  const {
    data: companyDetails,
    isLoading: isCompanyDetailsLoading,
    isSuccess: isCompanyDetailsSuccess,
  } = useGetCompanyDetailsQuery()

  // mutations
  const [pendingInvoice, { isLoading: isPendingInvoiceLoading }] = usePendingInvoiceMutation()
  const [paidInvoice, { isLoading: isPaidInvoiceLoading }] = usePaidInvoiceMutation()
  const [completedInvoice, { isLoading: isCompletedInvoiceLoading }] = useCompletedInvoiceMutation()

  useEffect(() => {
    if (isSuccess) {
      setStatus(invoice.data.status)
    }
  }, [isSuccess, isFetching])

  if (isLoading || isCompanyDetailsLoading)
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
  if (isSuccess && isCompanyDetailsSuccess)
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
          <div className='mb-10 flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <Tooltip title={t("Edit")} side='bottom'>
                <Link href={PATH_DASHBOARD.scm.invoices.edit(invoice.data.id)}>
                  <IconButton>
                    <Icon icon='ic:round-edit' height={22} />
                  </IconButton>
                </Link>
              </Tooltip>
              <Tooltip title={t("Preview")} side='bottom'>
                <IconButton onClick={() => setTrue()}>
                  <Icon icon='ic:round-print' height={22} />
                </IconButton>
              </Tooltip>
              <PDFDownloadLink
                document={
                  <InvoicePDFView invoice={invoice.data} companyDetails={companyDetails.data} />
                }
                fileName='test.pdf'
              >
                {({ loading }) =>
                  loading ? (
                    <LoadingIndicator height={24} width={24} />
                  ) : (
                    <Tooltip title={t("Download")} side='bottom'>
                      <IconButton>
                        <Icon icon='ic:baseline-cloud-download' height={22} />
                      </IconButton>
                    </Tooltip>
                  )
                }
              </PDFDownloadLink>

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
                  pendingInvoice({ id: invoice.data.id, PageNumber, PageSize })
                    .unwrap()
                    .then(() => {
                      setStatus(1)
                    })
                } else if (value === "2") {
                  paidInvoice({ id: invoice.data.id, PageNumber, PageSize })
                    .unwrap()
                    .then(() => {
                      setStatus(2)
                    })
                } else if (value === "3") {
                  completedInvoice({ id: invoice.data.id, PageNumber, PageSize })
                    .unwrap()
                    .then(() => {
                      setStatus(3)
                    })
                }
              }}
            />
          </div>
          <InvoicePreview companyDetails={companyDetails.data} invoice={invoice.data} />
        </div>
        <Backdrop
          open={isPendingInvoiceLoading || isPaidInvoiceLoading || isCompletedInvoiceLoading}
          loading={isPendingInvoiceLoading || isPaidInvoiceLoading || isCompletedInvoiceLoading}
        />
        <Dialog open={openPdf} fullScreen handleClose={() => setFalse()} className='!p-0'>
          <PDFViewer className='h-full w-full'>
            <InvoicePDFView invoice={invoice.data} companyDetails={companyDetails.data} />
          </PDFViewer>
        </Dialog>
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
