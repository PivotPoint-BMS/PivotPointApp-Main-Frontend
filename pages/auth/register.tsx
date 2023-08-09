/* eslint-disable quotes */
import React, { useEffect } from "react"
// next
import Link from "next/link"
import Head from "next/head"
// routes
import { PATH_AUTH, PATH_DASHBOARD, PATH_PAGE } from "routes/paths"
// hooks
import useResponsive from "hooks/useResponsive"
import useTranslate from "hooks/useTranslate"
// sections
import RegisterForm from "sections/auth/Register"
// layout
import Layout from "layout/Index"
// components
import { Logo } from "components"
import { useAppSelector } from "store/hooks"
import { useRouter } from "next/router"

function index() {
  const { t } = useTranslate()
  const { push, pathname } = useRouter()
  const { refreshToken } = useAppSelector((state) => state.session)
  const isDesktop = useResponsive("lg", "up")

  useEffect(() => {
    if (refreshToken) push(PATH_DASHBOARD.crm.dashboard)
  }, [push, refreshToken, pathname])

  return (
    <>
      <Head>
        <title>Pivot Point BMS | {t("Register")}</title>
      </Head>
      <main className='flex h-screen flex-col items-center justify-center'>
        {isDesktop && <Logo height={100} width={100} className='mb-5' />}
        <div className='container mx-auto flex flex-col items-center justify-center gap-5 px-10 sm:px-16 md:px-32 lg:w-1/2'>
          <h1 className='text-center text-4xl font-semibold'>
            {t("Let's Set You Up For Success")}
          </h1>
          <p className='text-center'>
            {t("Already have an account?")}{" "}
            <span>
              <Link
                className='font-medium text-primary-600 hover:underline focus:underline focus:outline-none dark:text-primary-200'
                href={PATH_AUTH.login}
              >
                {t("Sign in")}
              </Link>
            </span>
          </p>
          <RegisterForm />
          <p className='text-center text-xs text-gray-600 dark:text-gray-400'>
            {t("By registering, I agree to PivotPoint BMS's")}{" "}
            <Link
              href={PATH_PAGE.termOfService}
              className='font-medium text-primary-600 hover:underline focus:underline focus:outline-none dark:text-primary-200'
            >
              {t("Terms of Service")}
            </Link>{" "}
            {t("and")}{" "}
            <Link
              href={PATH_PAGE.privacyPolicy}
              className='font-medium text-primary-600 hover:underline focus:underline focus:outline-none dark:text-primary-200'
            >
              {t("Privacy Policy")}
            </Link>
            .
          </p>
        </div>
      </main>
    </>
  )
}

index.getLayout = function getLayout(page: JSX.Element) {
  return <Layout variant='main'>{page}</Layout>
}

export default index
