import React from "react"
// next
import Head from "next/head"
// hooks
import useTranslate from "hooks/useTranslate"
// layout
import Layout from "layout/Index"
// components
import { HeaderBreadcrumbs, Card, CardHeader, CardContent } from "components"
import RoleBasedGuard from "guards/RoleBasedGuard"

function index() {
  const { t } = useTranslate()
  return (
    <>
      <Head>
        <title>PivotPoint BMS | {t("Human Resource")}</title>
      </Head>
      <div className='flex max-w-full flex-col overflow-hidden px-5'>
        <HeaderBreadcrumbs heading={t("Human Resource")} />
        <div className='grid grid-cols-1 items-center gap-6 md:grid-cols-3'>
          <Card fullWidth>
            <CardHeader title='Total Employees' />
            <CardContent>
              <h6 className='text-3xl font-semibold'>10</h6>
            </CardContent>
          </Card>
          <Card fullWidth>
            <CardHeader title='Total Work Hours' />
            <CardContent>
              <h6 className='text-3xl font-semibold'>10</h6>
            </CardContent>
          </Card>
          <Card fullWidth>
            <CardHeader title='Total Absences' />
            <CardContent>
              <h6 className='text-3xl font-semibold'>10</h6>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
index.getLayout = function getLayout(page: JSX.Element) {
  return (
    <Layout variant='dashboard'>
      <RoleBasedGuard accessibleRoles={["Owner", "HRM"]}>{page}</RoleBasedGuard>
    </Layout>
  )
}

export default index
