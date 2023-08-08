import React, { useEffect, useState } from "react"
// next
import { useRouter } from "next/router"
// next
import Head from "next/head"
// hooks
import useTranslate from "hooks/useTranslate"
// routes
import { PATH_DASHBOARD } from "routes/paths"
// layout
import Layout from "layout/Index"
// sections
import VehiclesList from "sections/dashboard/scm/transportation/vehicules/VehiculesList"
import AddEditVehicleForm from "sections/dashboard/scm/transportation/vehicules/create/AddEditVehiculeForm"
import DeliveriesList from "sections/dashboard/scm/transportation/deliveries/list"
// components
import { Icon } from "@iconify/react"
import { Button, Card, Dialog, DropdownMenu, HeaderBreadcrumbs } from "components"
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from "components/Tabs"
import RoleBasedGuard from "guards/RoleBasedGuard"

const TABS = [
  { name: "Deliveries", value: "deliveries", icon: "solar:delivery-bold" },
  { name: "Vehicles", value: "vehicules", icon: "material-symbols:play-shapes-rounded" },
]

function index() {
  const { t } = useTranslate()
  const { push, pathname, query } = useRouter()
  const [tab, setTab] = useState(query?.tab ? (query?.tab as string) : "deliveries")
  const [openAddVehicleDialog, setOpenAddVehicleDialog] = useState(false)

  useEffect(() => {
    push(pathname, { query: { tab } })
  }, [pathname, tab])

  return (
    <>
      <Head>
        <title>{t("Transportation")} | Pivot Point BMS</title>
      </Head>
      <div className='flex max-w-full flex-col px-5'>
        <HeaderBreadcrumbs
          heading={t("Transportation")}
          links={[
            { name: t("Dashboard"), href: PATH_DASHBOARD.root },
            { name: t("Supply Chain & Inventory"), href: PATH_DASHBOARD.scm.dashboard },
            { name: t("Transportation") },
          ]}
          action={
            <>
              {tab === "deliveries" && (
                <DropdownMenu
                  items={[
                    {
                      type: "button",
                      label: "Warehouse To Customer",
                      onClick: () => push(PATH_DASHBOARD.scm.transportation.deliveries.create.w2c),
                      icon: (
                        <Icon
                          className='text-gray-600 dark:text-gray-400'
                          icon='mdi:package'
                          height={20}
                        />
                      ),
                    },
                    {
                      type: "button",
                      label: "Warehouse To Warehouse",
                      onClick: () => push(PATH_DASHBOARD.scm.transportation.deliveries.create.w2w),
                      icon: (
                        <Icon
                          className='text-gray-600 dark:text-gray-400'
                          icon='material-symbols:warehouse-rounded'
                          height={20}
                        />
                      ),
                    },
                    {
                      type: "button",
                      label: "Supplier To Warehouse",
                      onClick: () => push(PATH_DASHBOARD.scm.transportation.deliveries.create.s2w),
                      icon: (
                        <Icon
                          className='text-gray-600 dark:text-gray-400'
                          icon='solar:delivery-bold'
                          height={20}
                        />
                      ),
                    },
                  ]}
                  trigger={
                    <Button startIcon={<Icon icon='ic:round-add' height={24} />}>
                      {t("New Order")}
                    </Button>
                  }
                />
              )}
              {tab === "vehicules" && (
                <Button
                  startIcon={<Icon icon='ic:round-add' height={24} />}
                  onClick={() => setOpenAddVehicleDialog(true)}
                >
                  {t("Add a Vehicle")}
                </Button>
              )}
            </>
          }
        />
        <Card fullWidth>
          <TabsRoot defaultValue='deliveries' value={tab} onValueChange={(value) => setTab(value)}>
            <TabsList className='rounded-lg border dark:border-gray-600'>
              {TABS.map((item, i) => (
                <TabsTrigger key={i} value={item.value}>
                  <div className='flex w-max cursor-pointer items-center gap-2'>
                    {item.icon && <Icon icon={item.icon} height={20} width={20} />}
                    <label className='cursor-pointer font-medium'>{t(item.name)}</label>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value='deliveries'>
              <DeliveriesList />
            </TabsContent>
            <TabsContent value='vehicules' className='!bg-transparent'>
              <VehiclesList />
            </TabsContent>
          </TabsRoot>
        </Card>
      </div>
      <Dialog open={openAddVehicleDialog}>
        <AddEditVehicleForm
          onSuccess={() => setOpenAddVehicleDialog(false)}
          onFailure={() => setOpenAddVehicleDialog(false)}
        />
      </Dialog>
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
