/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react"
import clsx from "clsx"
// form
// radix
import * as TabsPrimitive from "@radix-ui/react-tabs"
// next
import Head from "next/head"
import { useRouter } from "next/router"
// routes
import { PATH_DASHBOARD } from "routes/paths"
// hooks
import useTranslate from "hooks/useTranslate"
import useResponsive from "hooks/useResponsive"
import { useAppSelector } from "store/hooks"
// sections
import Company from "sections/auth/company-setup/Company"
import Contact from "sections/auth/company-setup/Contact"
import Subscription from "sections/auth/company-setup/Subscription"
import Workers from "sections/auth/company-setup/workers"
import DataImport from "sections/auth/company-setup/DataImport"
import Feedback from "sections/auth/company-setup/Feedback"
// layout
import Layout from "layout/Index"
// components
import { Icon as Iconify } from "@iconify/react"
// pages
import Login from "./login"

const Tabs = [
  { name: "Setup Company", value: "1" },
  { name: "Contact Info", value: "2" },
  { name: "Choose Subscription", value: "3" },
  { name: "Setup personnel", value: "4" },
  { name: "Import Data", value: "5" },
  { name: "Feedback", value: "6" },
]

function index() {
  const { push } = useRouter()
  const { t, locale } = useTranslate()
  const isDesktop = useResponsive("md", "up")
  const { user } = useAppSelector((state) => state.session)
  const [step, setStep] = useState(user?.currentStep ? user?.currentStep.toString() : "1")
  const [tier, setTier] = useState(0)

  useEffect(() => {
    if (user && user.hasSetupCompany) push(PATH_DASHBOARD.crm.dashboard)
  }, [user])

  const ToSecondStep = () => {
    setStep("2")
  }

  const ToThirdStep = () => {
    setStep("3")
  }
  const ToFourthStep = (plan: number) => {
    setTier(plan)
    setStep("4")
  }

  const ToFifthStep = () => {
    setStep("5")
  }
  const ToSixthStep = () => {
    setStep("6")
  }

  // useEffect(() => {
  //   if (!user && refreshToken) push(PATH_DASHBOARD.root)
  // }, [push, refreshToken])

  if (!user) return <Login />

  return (
    <>
      <Head>
        <title>Pivot Point BMS | {t("Company Setup")}</title>
      </Head>
      <main className='flex h-screen flex-col items-center'>
        <TabsPrimitive.Root
          defaultValue='tab1'
          className='h-full w-full'
          value={step}
          dir={locale === "ar" ? "rtl" : "ltr"}
        >
          <TabsPrimitive.List
            className={clsx(
              "fixed top-0 right-0 z-20 flex w-full items-center justify-between overflow-y-hidden bg-white  sm:overflow-hidden",
              "dark:bg-dark"
            )}
          >
            {Tabs.map((item, i) => (
              <TabsPrimitive.Trigger
                key={i}
                value={item.value}
                className={clsx(
                  "flex h-16 min-w-fit flex-1 items-center justify-start gap-3 border-b-2 border-r p-3 dark:border-gray-300",
                  step === item.value
                    ? "border-b-primary-500 dark:border-b-primary-300"
                    : "opacity-50"
                )}
              >
                <div className='flex h-12 w-full items-center justify-center rounded-full bg-gray-100 p-4 dark:bg-paper-dark md:w-12'>
                  <span className='text-xl font-medium'>
                    {Number(step) > Number(item.value) ? (
                      <Iconify
                        className='text-green-600'
                        icon='material-symbols:check-small-rounded'
                        height={32}
                        width={32}
                      />
                    ) : (
                      i + 1
                    )}
                  </span>
                </div>
                {isDesktop && (
                  <div className=' flex flex-col items-start'>
                    <p
                      className={clsx(
                        "text-xs font-medium",
                        step === item.value && "text-secondary-600 dark:text-secondary-300"
                      )}
                    >
                      {step === item.value ? (
                        <span className='text-secondary-600 dark:text-secondary-300'>
                          {t("Current")}
                        </span>
                      ) : Number(step) > Number(item.value) ? (
                        <span className='text-green-600'>{t("Completed")}</span>
                      ) : (
                        t("Pending")
                      )}
                    </p>
                    <h6 className='font-medium'>{t(item.name)}</h6>
                  </div>
                )}
              </TabsPrimitive.Trigger>
            ))}
          </TabsPrimitive.List>
          <TabsPrimitive.Content
            value='1'
            className={clsx("mt-12 h-full  bg-gray-100/50 py-6 dark:bg-dark")}
          >
            <Company handleNext={ToSecondStep} />
          </TabsPrimitive.Content>
          <TabsPrimitive.Content
            value='2'
            className={clsx("mt-12 h-full  bg-gray-100/50 py-6 dark:bg-dark")}
          >
            <Contact handleNext={ToThirdStep} />
          </TabsPrimitive.Content>
          <TabsPrimitive.Content
            value='3'
            className={clsx("mt-12 h-full bg-gray-100/50 py-6 dark:bg-dark")}
          >
            <Subscription handleNext={(plan) => ToFourthStep(plan)} />
          </TabsPrimitive.Content>
          <TabsPrimitive.Content
            value='4'
            className={clsx("mt-12 h-full bg-gray-100/50 py-6 dark:bg-dark")}
          >
            <Workers handleNext={ToFifthStep} plan={tier} />
          </TabsPrimitive.Content>
          <TabsPrimitive.Content
            value='5'
            className={clsx("mt-12 h-full bg-gray-100/50 py-6 dark:bg-dark")}
          >
            <DataImport handleNext={ToSixthStep} />
          </TabsPrimitive.Content>
          <TabsPrimitive.Content
            value='6'
            className={clsx("mt-12 h-full bg-gray-100/50 py-6 dark:bg-dark")}
          >
            <Feedback />
          </TabsPrimitive.Content>
        </TabsPrimitive.Root>
      </main>
    </>
  )
}
index.getLayout = function getLayout(page: JSX.Element) {
  return <Layout variant='main'>{page}</Layout>
}

export default index
