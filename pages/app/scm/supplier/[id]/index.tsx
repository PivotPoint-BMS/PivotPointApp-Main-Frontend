// next
import Head from 'next/head'
import { useRouter } from 'next/router'
// api
import { useGetSupplierQuery } from 'store/api/scm/products-service/suppliersApis'
// hooks
import useTranslate from 'hooks/useTranslate'
// asset
import noData from 'public/no-data.png'
// sections
import GeneralInfo from 'sections/dashboard/scm/suppliers/details/GeneralInfo'
import SupplierProductsList from 'sections/dashboard/scm/suppliers/details/SupplierProductsList'
// layout
import Layout from 'layout/Index'
// components
import { Image, LoadingIndicator } from 'components'

function index() {
  const { t } = useTranslate()
  const {
    query: { id },
    isFallback,
  } = useRouter()
  const { data, isLoading } = useGetSupplierQuery(id?.toString() ? id?.toString() : '', {
    skip: isFallback,
    refetchOnFocus: true,
  })
  return (
    <>
      <Head>
        <title>{t('Supplier Details')} | Pivot Point BMS</title>
      </Head>
      {isLoading ? (
        <div className='flex h-56 w-full items-center justify-center'>
          <LoadingIndicator />
        </div>
      ) : (
        <div className='flex max-w-full flex-col overflow-hidden'>
          {data ? (
            <div className='grid grid-cols-1  divide-x md:grid-cols-3'>
              <GeneralInfo supplier={data.data} />
              <SupplierProductsList id={data.data.id} itemsList={data.data.supplierItems} />
            </div>
          ) : (
            <div className='flex h-full w-full flex-col items-center justify-center gap-5 py-20'>
              <Image src={noData.src} height={300} width={300} />
              <h1 className='text-4xl font-semibold'>{t('Supplier Not Found')}</h1>
              <p className='text-gray-500'>{t('Sorry, The requested lead was not found.')}</p>
              <p className='text-gray-500'>{t('Please check the url')}</p>
            </div>
          )}
        </div>
      )}
    </>
  )
}

index.getLayout = function getLayout(page: JSX.Element) {
  return <Layout variant='dashboard'>{page}</Layout>
}

export default index
