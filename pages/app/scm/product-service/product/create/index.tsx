// next
import Head from 'next/head'
// hooks
import useTranslate from 'hooks/useTranslate'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// sections
import CreateEditProductForm from 'sections/dashboard/scm/product-service/products/create/CreateEditProductForm'
// layout
import Layout from 'layout/Index'
// components
import { HeaderBreadcrumbs } from 'components'

function index() {
  const { t } = useTranslate()

  return (
    <>
      <Head>
        <title>{t('Create Product')} | Pivot Point BMS</title>
      </Head>
      <div className='flex max-w-full flex-col  px-5'>
        <HeaderBreadcrumbs
          heading={t('Create Product')}
          links={[
            { name: t('Dashboard'), href: PATH_DASHBOARD.root },
            { name: t('Supply Chain & Inventory'), href: PATH_DASHBOARD.scm.dashboard },
            { name: t('Products & Services'), href: PATH_DASHBOARD.scm['product-service'].list },
            { name: t('Create Product') },
          ]}
        />
        <CreateEditProductForm />
      </div>
    </>
  )
}
index.getLayout = function getLayout(page: JSX.Element) {
  return <Layout variant='dashboard'>{page}</Layout>
}

export default index
