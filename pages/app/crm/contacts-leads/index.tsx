import { useEffect, useState } from "react"
// next
import Head from "next/head"
import { useRouter } from "next/router"
import Link from "next/link"
// hooks
import useTranslate from "hooks/useTranslate"
// routes
import { PATH_DASHBOARD } from "routes/paths"
// guards
import RoleBasedGuard from "guards/RoleBasedGuard"
// layout
import Layout from "layout/Index"
// sections
import ContactsList from "sections/dashboard/crm/contacts-leads/contact/list"
import LeadsList from "sections/dashboard/crm/contacts-leads/lead/list"
import LeadSourcesList from "sections/dashboard/crm/contacts-leads/lead-sources/list"
// components
import { Icon as Iconify } from "@iconify/react"
import { HeaderBreadcrumbs, Card, Button } from "components"
import { TabsContent, TabsRoot, TabsList, TabsTrigger } from "components/Tabs"

const TABS = [
  { name: "Leads Sources", value: "sources", icon: "mdi:person-tie" },
  { name: "Leads", value: "leads", icon: "mdi:person-tie" },
  { name: "Contacts", value: "contacts", icon: "material-symbols:contacts-rounded" },
]

function index() {
  const { t, locale } = useTranslate()
  const { push, pathname, query } = useRouter()
  const [tab, setTab] = useState(query?.tab ? (query?.tab as string) : "leads")
  const [openAddDialog, setOpenAddDialog] = useState(false)

  useEffect(() => {
    push(pathname, { query: { tab } })
  }, [pathname, tab])

  return (
    <>
      <Head>
        <title>{t("Contacts & Leads")} | Pivot Point BMS</title>
      </Head>
      <div className='flex max-w-full flex-col overflow-hidden px-5'>
        <HeaderBreadcrumbs
          heading={t("Contacts & Leads")}
          links={[
            { name: t("Dashboard"), href: PATH_DASHBOARD.root },
            { name: t("Customer Relationship"), href: PATH_DASHBOARD.crm.root },
            { name: t("Contacts & Leads") },
          ]}
          action={
            tab === "sources" ? (
              <Button
                startIcon={<Iconify icon='ic:round-add' height={24} />}
                onClick={() => setOpenAddDialog(true)}
              >
                {t("Create Lead Source")}
              </Button>
            ) : (
              <Link href={PATH_DASHBOARD.crm["contacts-leads"].create}>
                <Button startIcon={<Iconify icon='ic:round-add' height={24} />}>
                  {t("Create Lead")}
                </Button>
              </Link>
            )
          }
        />
        <Card fullWidth className='mb-10 overflow-hidden'>
          <TabsRoot
            defaultValue='leads'
            dir={locale === "ar" ? "rtl" : "ltr"}
            value={tab}
            onValueChange={(value) => setTab(value)}
          >
            <TabsList>
              {TABS.map((item, i) => (
                <TabsTrigger key={i} value={item.value}>
                  {item.icon && <Iconify icon={item.icon} height={20} width={20} />}
                  <label className='cursor-pointer font-medium'>{t(item.name)}</label>
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value='contacts' className='w-full'>
              <ContactsList />
            </TabsContent>
            <TabsContent value='leads' className='w-full'>
              <LeadsList />
            </TabsContent>
            <TabsContent value='sources' className='w-full'>
              <LeadSourcesList openAddDialog={openAddDialog} setOpenAddDialog={setOpenAddDialog} />
            </TabsContent>
          </TabsRoot>
        </Card>
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
