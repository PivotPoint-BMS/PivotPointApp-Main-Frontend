import React, { useEffect } from 'react'

// next
import Head from 'next/head'
// api
import { useGetBusinnesPlanQuery } from 'store/api/fm/fmBusinessPlanApis'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// sections
// layout
import Layout from 'layout/Index'
// components
import { HeaderBreadcrumbs, LoadingIndicator } from 'components'
import BalanceSheetForecasts from 'sections/dashboard/fm/business-plan/BalanceSheetForecasts'

function Dashboard() {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const { data, isError, isLoading, isSuccess, isFetching } = useGetBusinnesPlanQuery(undefined, {
    pollingInterval: 2 * 60 * 60 * 1000, // 2 hours
  })

  useEffect(() => {
    if (isError) {
      open({
        message: t('A problem has occured while retrieving data.'),
        type: 'error',
        variant: 'contained',
      })
    }
  }, [isError, isSuccess, isFetching, isLoading])

  console.log(data)

  return (
    <>
      <Head>
        <title>{t('Financal Business Plan')} | Pivot Point BMS</title>
      </Head>
      <div className='px-5'>
        {isLoading ? (
          <div className='flex h-56 w-full items-center justify-center'>
            <LoadingIndicator />
          </div>
        ) : (
          <>
            <HeaderBreadcrumbs heading={t('Financal Business Plan')} />
            <BalanceSheetForecasts />
          </>
        )}
      </div>
    </>
  )
}

Dashboard.getLayout = function getLayout(page: JSX.Element) {
  return <Layout variant='dashboard'>{page}</Layout>
}

export default Dashboard
