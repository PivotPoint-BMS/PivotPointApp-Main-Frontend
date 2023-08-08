import { useEffect, useState } from "react"
// next
import Head from "next/head"
import { useRouter } from "next/router"
import Link from "next/link"
// hooks
import useTranslate from "hooks/useTranslate"
// routes
import { PATH_DASHBOARD } from "routes/paths"
// sections
import CategoriesList from "sections/dashboard/scm/product-service/categories/list"
import ProductsList from "sections/dashboard/scm/product-service/products/list"
// layout
import Layout from "layout/Index"
// components
import { Icon as Iconify } from "@iconify/react"
import { HeaderBreadcrumbs, Card, Button } from "components"
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from "components/Tabs"
import RoleBasedGuard from "guards/RoleBasedGuard"

const TABS = [
  { name: "Products", value: "products", icon: "ic:baseline-inventory" },
  { name: "Categories", value: "categories", icon: "material-symbols:play-shapes-rounded" },
]

function index() {
  const { t, locale } = useTranslate()
  const { push, pathname, query } = useRouter()
  const [tab, setTab] = useState(query?.tab ? (query?.tab as string) : "products")
  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false)

  useEffect(() => {
    push(pathname, { query: { tab } })
  }, [pathname, tab])

  return (
    <>
      <Head>
        <title>{t("Products & Services")} | Pivot Point BMS</title>
      </Head>
      <div className='flex max-w-full flex-col overflow-hidden px-5'>
        <HeaderBreadcrumbs
          heading={t("Products & Services")}
          links={[
            { name: t("Dashboard"), href: PATH_DASHBOARD.root },
            { name: t("Supply Chain & Inventory"), href: PATH_DASHBOARD.scm.dashboard },
            { name: t("Product/Service") },
          ]}
          action={
            <>
              {tab === "categories" && (
                <Button
                  startIcon={<Iconify icon='ic:round-add' height={24} />}
                  onClick={() => setOpenAddCategoryDialog(true)}
                >
                  {t("Create a Category")}
                </Button>
              )}
              {tab === "products" && (
                <Link href={PATH_DASHBOARD.scm["product-service"].products.create}>
                  <Button startIcon={<Iconify icon='ic:round-add' height={24} />}>
                    {t("Create a Product")}
                  </Button>
                </Link>
              )}
            </>
          }
        />
        <Card fullWidth className='mb-10 overflow-hidden'>
          <TabsRoot
            defaultValue='products'
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

            <TabsContent value='products'>
              <ProductsList />
            </TabsContent>
            <TabsContent value='categories'>
              <CategoriesList
                openAddDialog={openAddCategoryDialog}
                setOpenAddDialog={setOpenAddCategoryDialog}
              />
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
      <RoleBasedGuard accessibleRoles={["Owner", "SCM"]}>{page}</RoleBasedGuard>
    </Layout>
  )
}

export default index
