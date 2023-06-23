import { useState } from 'react'
// next
import Head from 'next/head'
// hooks
import useTranslate from 'hooks/useTranslate'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// sections
import SuppliersList from 'sections/dashboard/scm/suppliers/list'
// layout
import Layout from 'layout/Index'
// components
import { Icon as Iconify } from '@iconify/react'
import { HeaderBreadcrumbs, Card, Button } from 'components'
import RoleBasedGuard from 'guards/RoleBasedGuard'

function index() {
  const { t } = useTranslate()
  const [openAddSupplierDialog, setOpenAddSupplierDialog] = useState(false)

  return (
    <>
      <Head>
        <title>{t('Suppliers')} | Pivot Point BMS</title>
      </Head>
      <div className='flex max-w-full flex-col overflow-hidden px-5'>
        <HeaderBreadcrumbs
          heading={t('Suppliers')}
          links={[
            { name: t('Dashboard'), href: PATH_DASHBOARD.root },
            { name: t('Supply Chain & Inventory'), href: PATH_DASHBOARD.scm.dashboard },
            { name: t('Suppliers') },
          ]}
          action={
            <Button
              startIcon={<Iconify icon='ic:round-add' height={24} />}
              onClick={() => setOpenAddSupplierDialog(true)}
            >
              {t('Create a Supplier')}
            </Button>
          }
        />
        <Card fullWidth className='mb-10 overflow-hidden'>
          <SuppliersList
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
      <RoleBasedGuard accessibleRoles={['Owner', 'SCM']}>{page}</RoleBasedGuard>
    </Layout>
  )
}

export default index
