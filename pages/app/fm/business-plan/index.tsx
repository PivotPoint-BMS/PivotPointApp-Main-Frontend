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
import FinancementInvestment from 'sections/dashboard/fm/business-plan/FinancementInvestment'
import ProfitabilityThresholds from 'sections/dashboard/fm/business-plan/ProfitabilityThresholds'
import PrevisionalResultsAccounts from 'sections/dashboard/fm/business-plan/PrevisionalResultsAccounts'
import BalanceSheetForecasts from 'sections/dashboard/fm/business-plan/BalanceSheetForecasts'
import RoleBasedGuard from 'guards/RoleBasedGuard'

function Dashboard() {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const { data, isError, isLoading, isSuccess, isFetching } = useGetBusinnesPlanQuery(undefined, {
    pollingInterval: 2 * 60 * 60 * 1000, // 2 hours
  })

  useEffect(() => {
    if (isError) {
      open({
        message: t('A problem has occurred while retrieving data.'),
        type: 'error',
        variant: 'contained',
      })
    }
  }, [isError, isSuccess, isFetching, isLoading])

  if (isLoading)
    return (
      <div className='flex h-56 w-full items-center justify-center'>
        <LoadingIndicator />
      </div>
    )

  if (isSuccess)
    return (
      <>
        <Head>
          <title>{t('Financial Business Plan')} | Pivot Point BMS</title>
        </Head>
        <div className='space-y-4 px-5'>
          <HeaderBreadcrumbs heading={t('Financial Business Plan')} />
          <FinancementInvestment data={data.data.financialPlan} />
          <ProfitabilityThresholds
            data={data.data.profitabilityThresholds}
            years={data.data.years}
          />
          <PrevisionalResultsAccounts
            data={data.data.previsionalResultsAccounts}
            years={data.data.years}
          />
          <BalanceSheetForecasts data={data.data.balanceSheetForecasts} years={data.data.years} />
        </div>
      </>
    )

  return (
    <>
      <Head>
        <title>{t('Financial Business Plan')} | Pivot Point BMS</title>
      </Head>
      <div className='px-5'>
        <div className='flex h-56 w-full items-center justify-center'>
          <h1>No Financial Plan</h1>
        </div>
      </div>
    </>
  )
}

Dashboard.getLayout = function getLayout(page: JSX.Element) {
  return (
    <Layout variant='dashboard'>
      <RoleBasedGuard accessibleRoles={['Owner', 'FM']}>{page}</RoleBasedGuard>
    </Layout>
  )
}

export default Dashboard
