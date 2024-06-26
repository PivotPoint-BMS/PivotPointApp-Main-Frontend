/* eslint-disable quotes */
import React, { useEffect, useState } from "react"
// next
import Head from "next/head"
// apis
import { useGetFmDashboardStatsQuery } from "store/api/fm/fmDashboardApi"
import { useGetStepOneQuery } from "store/api/fm/financeSetupApi"
// hooks
import useTranslate from "hooks/useTranslate"
// sections
import QuickSetup from "sections/dashboard/fm/quick-setup"
// layout
import Layout from "layout/Index"
// components
import { AlertDialog, Backdrop, Button, HeaderBreadcrumbs } from "components"
import RoleBasedGuard from "guards/RoleBasedGuard"
import { Icon } from "@iconify/react"

function index() {
  const { t } = useTranslate()
  const [startStep, setStartStep] = useState("1")
  const [openQuickSetupAlert, setOpenQuickSetupAlert] = useState(false)
  const [openQuickSetup, setOpenQuickSetup] = useState(false)
  const { isLoading, isSuccess, isError, error } = useGetFmDashboardStatsQuery()
  const { data, isLoading: isYearsLoading } = useGetStepOneQuery()

  useEffect(() => {
    if (isError && error) {
      setStartStep(String(error) || "1")
    }
  }, [isLoading, isYearsLoading])

  return (
    <>
      <Head>
        <title>Finance Management | Pivot Point BMS</title>
      </Head>
      <div className='flex max-w-full flex-col overflow-hidden px-5'>
        <HeaderBreadcrumbs
          heading={t("Finance Management")}
          action={
            <div className='flex items-center gap-2'>
              {isSuccess && (
                <Button
                  startIcon={<Icon icon='carbon:view-filled' height={24} />}
                  onClick={() => {
                    setOpenQuickSetup(true)
                  }}
                >
                  {t("View Financal Plan")}
                </Button>
              )}
              <Button
                startIcon={
                  <Icon icon={isSuccess ? "pepicons-pop:arrow-spin" : "ic:settings"} height={24} />
                }
                onClick={() => {
                  setOpenQuickSetup(true)
                }}
              >
                {isSuccess ? t("Reconfigure Finance") : t("Configure Finance")}
              </Button>
            </div>
          }
        />
      </div>
      <AlertDialog
        open={openQuickSetupAlert}
        title={t("Proceeding  To Finance Setup")}
        description={
          <p className='py-2 text-sm'>
            {t(
              "Let's get started! Complete the quick setup by providing some essential finance information."
            )}
          </p>
        }
        confirmText={t("Go to setup")}
        onConfirm={() => {
          setOpenQuickSetup(true)
          setOpenQuickSetupAlert(false)
        }}
        onClose={() => setOpenQuickSetupAlert(false)}
      />
      {(openQuickSetup || (!isYearsLoading && !isLoading && isError && openQuickSetup)) && (
        <QuickSetup
          open={openQuickSetup}
          startStep={startStep}
          estimationRange={data?.data.years || 2}
          total={
            data?.data.financements.reduce((partialSum, a) => partialSum + Number(a.amount), 0) || 0
          }
          handleClose={() => setOpenQuickSetup(false)}
        />
      )}
      <Backdrop loading={isLoading || isYearsLoading} open={isLoading || isYearsLoading} />
    </>
  )
}
index.getLayout = function getLayout(page: JSX.Element) {
  return (
    <Layout variant='dashboard'>
      <RoleBasedGuard accessibleRoles={["Owner", "FM"]}>{page}</RoleBasedGuard>
    </Layout>
  )
}

export default index
