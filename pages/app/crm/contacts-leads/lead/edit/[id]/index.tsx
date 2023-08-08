// next
import Head from "next/head"
import { useRouter } from "next/router"
// hooks
import useTranslate from "hooks/useTranslate"
// api
import { useGetLeadQuery } from "store/api/crm/contact-leads/leadApis"
// routes
import { PATH_DASHBOARD } from "routes/paths"
// sections
import CreateEditLeadForm from "sections/dashboard/crm/contacts-leads/lead/CreateEditLeadForm"
// layout
import Layout from "layout/Index"
// components
import { HeaderBreadcrumbs, LoadingIndicator } from "components"
import RoleBasedGuard from "guards/RoleBasedGuard"

function index() {
  const { t } = useTranslate()
  const {
    query: { id },
    isFallback,
  } = useRouter()
  const { data, isLoading } = useGetLeadQuery(id?.toString() ? id?.toString() : "", {
    skip: isFallback,
    refetchOnFocus: true,
  })
  return (
    <>
      <Head>
        <title>{t("Edit Lead")} | Pivot Point BMS</title>
      </Head>
      <div className='flex max-w-full flex-col overflow-hidden px-5'>
        <HeaderBreadcrumbs
          heading={t("Edit Lead")}
          links={[
            { name: t("Dashboard"), href: PATH_DASHBOARD.root },
            { name: t("Customer Relationship"), href: PATH_DASHBOARD.crm.root },
            { name: t("Contacts & Leads"), href: PATH_DASHBOARD.crm["contacts-leads"].root },
            { name: t("Edit Lead") },
          ]}
        />
        {isLoading ? (
          <div className='flex h-56 w-full items-center justify-center'>
            <LoadingIndicator />
          </div>
        ) : (
          <CreateEditLeadForm isEdit currentLead={data?.data} />
        )}
      </div>
    </>
  )
}
index.getLayout = function getLayout(page: JSX.Element) {
  return (
    <Layout variant='dashboard'>
      <RoleBasedGuard accessibleRoles={["Owner", "CRM"]}>{page}</RoleBasedGuard>
    </Layout>
  )
}

export default index
