import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
// utils
import clsx from 'clsx'
// redux
import { wrapper } from 'store'
import {
  getRunningQueriesThunk,
  getWorkersNumber,
  useGetWorkersNumberQuery,
} from 'store/api/humanResourceApi'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import Card from '@/components/Card'
import CardHeader from '@/components/CardHeader'
import CardContent from '@/components/CardContent'

const Home: NextPage = () => {
  const router = useRouter()
  const { t } = useTranslate()
  const { data } = useGetWorkersNumberQuery(undefined, {
    skip: router.isFallback,
    refetchOnFocus: true,
  })
  return (
    <>
      <Head>
        <title>Pivot Point BMS | {t('Dashboard')}</title>
      </Head>
      <div className={clsx('grid gap-6 p-4 pt-24', 'grid-cols-6')}>
        {/* Col 1 */}
        <Card
          fullWidth
          className='col-span-6 overflow-clip sm:col-span-3 md:col-span-2 lg:col-span-1'
        >
          <CardHeader title='Contacts (Leads)' className='pb-2 [&>*]:text-lg' />
          <CardContent className=''>
            <h3 className='text-2xl'>10</h3>
          </CardContent>
        </Card>{' '}
        <Card
          fullWidth
          className='col-span-6 overflow-clip sm:col-span-3 md:col-span-2 lg:col-span-1'
        >
          <CardHeader title='Users' className='pb-2 [&>*]:text-lg' />
          <CardContent>
            <h3 className='text-2xl'>10</h3>
          </CardContent>
        </Card>{' '}
        <Card
          fullWidth
          className='col-span-6 overflow-clip sm:col-span-3 md:col-span-2 lg:col-span-1'
        >
          <CardHeader title='Workers' className='pb-2 [&>*]:text-lg' />
          <CardContent>
            <h3 className='text-2xl'>{data}</h3>
          </CardContent>
        </Card>{' '}
        <Card
          fullWidth
          className='col-span-6 overflow-clip sm:col-span-3 md:col-span-2 lg:col-span-1'
        >
          <CardHeader title='Products' className='pb-2 [&>*]:text-lg' />
          <CardContent>
            <h3 className='text-2xl'>10</h3>
          </CardContent>
        </Card>{' '}
        <Card
          fullWidth
          className='col-span-6 overflow-clip sm:col-span-3 md:col-span-2 lg:col-span-1'
        >
          <CardHeader title='AI Usage' className='pb-2 [&>*]:text-lg' />
          <CardContent>
            <h3 className='text-2xl'>10</h3>
          </CardContent>
        </Card>
        <Card
          fullWidth
          className='col-span-6 overflow-clip sm:col-span-3 md:col-span-2 lg:col-span-1'
        >
          <CardHeader title='Contacts' className='pb-2 [&>*]:text-lg' />
          <CardContent>
            <h3 className='text-2xl'>10</h3>
          </CardContent>
        </Card>
        {/* Col 2 */}
        <Card fullWidth className='col-span-6 md:col-span-4'>
          <CardHeader title='Title' />
        </Card>
        <Card fullWidth className='col-span-6 md:col-span-2'>
          <CardHeader title='Title' />
        </Card>
        {/* Col 3 */}
        <Card fullWidth className='col-span-6 md:col-span-4'>
          <CardHeader title='Title' />
        </Card>
        <Card fullWidth className='col-span-6 md:col-span-2'>
          <CardHeader title='Title' />
        </Card>
      </div>
    </>
  )
}
export default Home

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  store.dispatch(getWorkersNumber.initiate())

  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})
