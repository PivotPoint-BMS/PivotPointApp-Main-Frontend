import React, { useEffect, useState } from 'react'
// next
import { useRouter } from 'next/router'
// next
import Head from 'next/head'
// hooks
import useTranslate from 'hooks/useTranslate'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// layout
import Layout from 'layout/Index'
// sections
import VehiculesList from 'sections/dashboard/scm/transportation/vehicules/VehiculesList'
import AddEditVehiculeForm from 'sections/dashboard/scm/transportation/vehicules/create/AddEditVehiculeForm'
// components
import { Icon } from '@iconify/react'
import { Button, Dialog, HeaderBreadcrumbs } from 'components'
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'components/Tabs'

const TABS = [
  { name: 'Deliveries', value: 'deliveries', icon: 'solar:delivery-bold' },
  { name: 'Vehicules', value: 'vehicules', icon: 'material-symbols:play-shapes-rounded' },
]

function index() {
  const { t } = useTranslate()
  const { push, pathname, query } = useRouter()
  const [tab, setTab] = useState(query?.tab ? (query?.tab as string) : 'deliveries')
  const [openAddVehiculeDialog, setOpenAddVehiculeDialog] = useState(false)

  useEffect(() => {
    push(pathname, { query: { tab } })
  }, [pathname, tab])

  return (
    <>
      <Head>
        <title>{t('Transportation')} | Pivot Point BMS</title>
      </Head>
      <div className='flex max-w-full flex-col px-5'>
        <HeaderBreadcrumbs
          heading={t('Transportation')}
          links={[
            { name: t('Dashboard'), href: PATH_DASHBOARD.root },
            { name: t('Supply Chain & Inventory'), href: PATH_DASHBOARD.scm.dashboard },
            { name: t('Transportation') },
          ]}
          action={
            <>
              {tab === 'deliveries' && (
                <Button
                  startIcon={<Icon icon='ic:round-add' height={24} />}
                  // onClick={() => setOpenAddCategoryDialog(true)}
                >
                  {t('New Order')}
                </Button>
              )}
              {tab === 'vehicules' && (
                <Button
                  startIcon={<Icon icon='ic:round-add' height={24} />}
                  onClick={() => setOpenAddVehiculeDialog(true)}
                >
                  {t('Add a Vehicule')}
                </Button>
              )}
            </>
          }
        />
        <TabsRoot defaultValue='deliveries' value={tab} onValueChange={(value) => setTab(value)}>
          <TabsList className='rounded-lg border'>
            {TABS.map((item, i) => (
              <TabsTrigger key={i} value={item.value}>
                <div className='flex w-max cursor-pointer items-center gap-2'>
                  {item.icon && <Icon icon={item.icon} height={20} width={20} />}
                  <label className='cursor-pointer font-medium'>{t(item.name)}</label>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value='deliveries'></TabsContent>
          <TabsContent value='vehicules' className='!bg-transparent'>
            <VehiculesList />
          </TabsContent>
        </TabsRoot>
      </div>
      <Dialog open={openAddVehiculeDialog}>
        <AddEditVehiculeForm
          onSuccess={() => setOpenAddVehiculeDialog(false)}
          onFailure={() => setOpenAddVehiculeDialog(false)}
        />
      </Dialog>
    </>
  )
}

index.getLayout = function getLayout(page: JSX.Element) {
  return <Layout variant='dashboard'>{page}</Layout>
}

export default index
