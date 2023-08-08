import { useState } from "react"
// next
import Head from "next/head"
// hooks
import useTranslate from "hooks/useTranslate"
// routes
import { PATH_DASHBOARD } from "routes/paths"
// sections
import BankAccountsList from "sections/dashboard/fm/bank-accounts/list"
// layout
import Layout from "layout/Index"
import RoleBasedGuard from "guards/RoleBasedGuard"
// components
import { Icon as Iconify } from "@iconify/react"
import { HeaderBreadcrumbs, Card, Button } from "components"

function index() {
  const { t } = useTranslate()
  const [openAddSupplierDialog, setOpenAddSupplierDialog] = useState(false)

  return (
    <>
      <Head>
        <title>{t("Bank Accounts")} | Pivot Point BMS</title>
      </Head>
      <div className='flex max-w-full flex-col overflow-hidden px-5'>
        <HeaderBreadcrumbs
          heading={t("Bank Accounts")}
          links={[
            { name: t("Dashboard"), href: PATH_DASHBOARD.root },
            { name: t("Finance"), href: PATH_DASHBOARD.scm.dashboard },
            { name: t("Bank Accounts") },
          ]}
          action={
            <Button
              startIcon={<Iconify icon='ic:round-add' height={24} />}
              onClick={() => setOpenAddSupplierDialog(true)}
            >
              {t("Create an account")}
            </Button>
          }
        />
        <Card fullWidth className='mb-10 overflow-hidden'>
          <BankAccountsList
            openAddDialog={openAddSupplierDialog}
            setOpenAddDialog={setOpenAddSupplierDialog}
          />
        </Card>
      </div>
    </>
  )
}

index.getLayout = function getLayout(page: JSX.Element) {
  return (
    <Layout variant='dashboard'>
      <RoleBasedGuard accessibleRoles={["Owner", "FM"]}>{page}</RoleBasedGuard>
    </Layout>
  )
}

export default index
