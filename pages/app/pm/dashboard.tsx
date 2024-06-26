import Head from "next/head"
import React from "react"
// layout
import Layout from "layout/Index"
import RoleBasedGuard from "guards/RoleBasedGuard"

function index() {
  return (
    <>
      <Head>
        <title>Project Management | Pivot Point BMS</title>
      </Head>
      <div className='flex h-full items-center justify-center'>
        <h1 className='text-2xl font-medium'>Project Management</h1>
      </div>
    </>
  )
}
index.getLayout = function getLayout(page: JSX.Element) {
  return (
    <Layout variant='dashboard'>
      <RoleBasedGuard accessibleRoles={["Owner", "PM"]}>{page}</RoleBasedGuard>
    </Layout>
  )
}

export default index
