// next
import Head from 'next/head'
import { useRouter } from 'next/router'
// redux
import { wrapper } from 'store'
import {
  getLead,
  getRunningQueriesThunk,
  useGetLeadQuery,
} from 'store/api/crm/contact-leads/leadApis'
// hooks
import useTranslate from 'hooks/useTranslate'
// asset
import noData from 'public/no-data.png'
// sections
import GeneralInfo from 'sections/dashboard/crm/contacts-leads/contact/GeneralInfo'
import Details from 'sections/dashboard/crm/contacts-leads/contact/Details'
// layout
import Layout from 'layout/Index'
// components
import { Image } from 'components'

function index() {
  const { t } = useTranslate()
  const {
    query: { id },
    isFallback,
  } = useRouter()
  const { data } = useGetLeadQuery(id?.toString() ? id?.toString() : '', {
    skip: isFallback,
    refetchOnFocus: true,
  })
  return (
    <>
      <Head>
        <title>{t('Contact Details')} | Pivot Point BMS</title>
      </Head>
      <div className='flex max-w-full flex-col overflow-hidden'>
        {data ? (
          <div className='grid grid-cols-1  divide-x md:grid-cols-3'>
            <GeneralInfo contact={data.data} />
            <Details />
          </div>
        ) : (
          <div className='flex h-full w-full flex-col items-center justify-center gap-5 py-20'>
            <Image src={noData.src} height={300} width={300} />
            <h1 className='text-4xl font-semibold'>{t('Contact Not Found')}</h1>
            <p className='text-gray-500'>{t('Sorry, The requested lead was not found.')}</p>
            <p className='text-gray-500'>{t('Please check the url')}</p>
          </div>
        )}
      </div>
    </>
  )
}

index.getLayout = function getLayout(page: JSX.Element) {
  return <Layout variant='dashboard'>{page}</Layout>
}

export default index

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query: { id } }) => {
      store.dispatch(getLead.initiate(id?.toString() ? id?.toString() : ''))

      await Promise.all(store.dispatch(getRunningQueriesThunk()))

      return {
        props: {},
      }
    }
)
