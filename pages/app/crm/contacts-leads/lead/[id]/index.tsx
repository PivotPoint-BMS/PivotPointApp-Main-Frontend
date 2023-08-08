// next
import Head from "next/head"
import { useRouter } from "next/router"
// api
import { useGetLeadQuery } from "store/api/crm/contact-leads/leadApis"
// hooks
import useTranslate from "hooks/useTranslate"
// asset
import noData from "public/no-data.png"
// sections
import GeneralInfo from "sections/dashboard/crm/contacts-leads/lead/GeneralInfo"
import Details from "sections/dashboard/crm/contacts-leads/lead/Details"
// layout
import Layout from "layout/Index"
// components
import { Image, LoadingIndicator } from "components"
import RoleBasedGuard from "guards/RoleBasedGuard"

function index() {
  const { t } = useTranslate()
  const {
    query: { id },
    isFallback,
  } = useRouter()
  const { data, isLoading, isSuccess } = useGetLeadQuery(id?.toString() ? id?.toString() : "", {
    skip: isFallback,
    refetchOnFocus: true,
  })

  if (isLoading)
    return (
      <div className='flex h-56 w-full items-center justify-center'>
        <LoadingIndicator />
      </div>
    )

  if (isSuccess)
    return (
      <>
        <Head>
          <title>{t("Lead Details")} | Pivot Point BMS</title>
        </Head>

        <div className='flex max-w-full  flex-col overflow-hidden'>
          <div className='grid h-full grid-cols-1 divide-x md:grid-cols-3'>
            <GeneralInfo lead={data.data} />
            <Details leadId={data.data.id} />
          </div>
        </div>
      </>
    )

  return (
    <>
      <Head>
        <title>{t("Lead Details")} | Pivot Point BMS</title>
      </Head>{" "}
      <div className='flex h-full w-full flex-col items-center justify-center gap-5 py-20'>
        <Image src={noData.src} height={300} width={300} />
        <h1 className='text-4xl font-semibold'>{t("Lead Not Found")}</h1>
        <p className='text-gray-500'>{t("Sorry, The requested lead was not found.")}</p>
        <p className='text-gray-500'>{t("Please check the url")}</p>
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
