import { useEffect, useState } from 'react'
import clsx from 'clsx'
// next
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
// radix
import * as TabsPrimitive from '@radix-ui/react-tabs'
// hooks
import useTranslate from 'hooks/useTranslate'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// sections
import SuppliersList from 'sections/dashboard/scm/product-service/suppliers/list'
import CategoriesList from 'sections/dashboard/scm/product-service/categories/list'
import ProductsList from 'sections/dashboard/scm/product-service/products/list'
// layout
import Layout from 'layout/Index'
// components
import { Icon as Iconify } from '@iconify/react'
import { HeaderBreadcrumbs, Card, Button } from 'components'

const TABS = [
  { name: 'Suppliers', value: 'suppliers', icon: 'solar:delivery-bold' },
  { name: 'Categories', value: 'categories', icon: 'material-symbols:play-shapes-rounded' },
  { name: 'Products', value: 'products', icon: 'ic:baseline-inventory' },
]

function index() {
  const { t, locale } = useTranslate()
  const { push, pathname, query } = useRouter()
  const [tab, setTab] = useState(query?.tab ? (query?.tab as string) : 'suppliers')
  const [openAddSupplierDialog, setOpenAddSupplierDialog] = useState(false)
  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false)

  useEffect(() => {
    push(pathname, { query: { tab } })
  }, [pathname, tab])

  return (
    <>
      <Head>
        <title>{t('Products & Services')} | Pivot Point BMS</title>
      </Head>
      <div className='flex max-w-full flex-col overflow-hidden px-5'>
        <HeaderBreadcrumbs
          heading={t('Products & Services')}
          links={[
            { name: t('Dashboard'), href: PATH_DASHBOARD.root },
            { name: t('Supply Chain & Inventory'), href: PATH_DASHBOARD.scm.dashboard },
            { name: t('Product/Service') },
          ]}
          action={
            <>
              {tab === 'suppliers' && (
                <Button
                  startIcon={<Iconify icon='ic:round-add' height={24} />}
                  onClick={() => setOpenAddSupplierDialog(true)}
                >
                  {t('Add a Supplier')}
                </Button>
              )}
              {tab === 'categories' && (
                <Button
                  startIcon={<Iconify icon='ic:round-add' height={24} />}
                  onClick={() => setOpenAddCategoryDialog(true)}
                >
                  {t('Create a Category')}
                </Button>
              )}
              {tab === 'products' && (
                <Link href={PATH_DASHBOARD.scm['product-service'].products.create}>
                  <Button startIcon={<Iconify icon='ic:round-add' height={24} />}>
                    {t('Create a Product')}
                  </Button>
                </Link>
              )}
            </>
          }
        />
        <Card fullWidth className='mb-10 overflow-hidden'>
          <TabsPrimitive.Root
            defaultValue='suppliers'
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
            className='overflow-hidden'
            value={tab}
            onValueChange={(value) => setTab(value)}
          >
            <TabsPrimitive.List className='flex w-full items-center gap-8 overflow-x-scroll bg-gray-100 px-4 dark:bg-gray-900'>
              {TABS.map((item, i) => (
                <TabsPrimitive.Trigger
                  key={i}
                  value={item.value}
                  className={clsx(
                    'relative flex cursor-pointer items-center justify-start gap-3  px-1 pt-3 pb-3 text-sm transition-all',
                    'before:absolute before:bottom-0 before:h-[3px] before:w-full before:rounded-t-full before:bg-primary-600 before:transition-all ltr:before:left-0 rtl:before:right-0',
                    'before:duration-500 data-[state=inactive]:before:w-0',
                    'data-[state=inactive]:text-gray-600 dark:data-[state=inactive]:text-gray-400'
                  )}
                >
                  <div className='flex w-max cursor-pointer items-center gap-2'>
                    {item.icon && <Iconify icon={item.icon} height={20} width={20} />}
                    <label className='cursor-pointer font-medium'>{t(item.name)}</label>
                  </div>
                </TabsPrimitive.Trigger>
              ))}
            </TabsPrimitive.List>
            <TabsPrimitive.Content value='suppliers' className='w-full'>
              <SuppliersList
                openAddDialog={openAddSupplierDialog}
                setOpenAddDialog={setOpenAddSupplierDialog}
              />
            </TabsPrimitive.Content>
            <TabsPrimitive.Content value='categories' className='w-full'>
              <CategoriesList
                openAddDialog={openAddCategoryDialog}
                setOpenAddDialog={setOpenAddCategoryDialog}
              />
            </TabsPrimitive.Content>
            <TabsPrimitive.Content value='products' className='w-full'>
              <ProductsList />
            </TabsPrimitive.Content>
          </TabsPrimitive.Root>
        </Card>
      </div>
    </>
  )
}

index.getLayout = function getLayout(page: JSX.Element) {
  return <Layout variant='dashboard'>{page}</Layout>
}

export default index
