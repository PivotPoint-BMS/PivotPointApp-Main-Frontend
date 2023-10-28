/* eslint-disable @next/next/inline-script-id */
import React, { useEffect } from "react"
import moment from "moment"
import "moment/min/locales"
// next
import Head from "next/head"
import type { AppProps } from "next/app"
import { ThemeProvider } from "next-themes"
import { useRouter } from "next/router"
import Script from "next/script"
// redux
import { wrapper } from "store"
import { Provider as ReduxProvider } from "react-redux"
// hooks
import useTranslate from "hooks/useTranslate"
// types
import { NextLayoutComponentType } from "types"
// components
import { NextProgressBar, SnackbarProvider } from "components"
// css
import "simplebar-react/dist/simplebar.min.css"
import "react-lazy-load-image-component/src/effects/blur.css"
import "react-lazy-load-image-component/src/effects/opacity.css"
import "react-lazy-load-image-component/src/effects/black-and-white.css"
import "react-csv-importer/dist/index.css"
import "styles/globals.css"
// import 'reactflow/dist/style.css'

// function getDirection(locale: string) {
//   if (locale === 'ar') {
//     return 'rtl'
//   }

//   return 'ltr'
// }

// TODO: Add/Edit Forms to Sheet

function MyApp({
  Component,
  ...rest
}: Omit<AppProps, "Component"> & { Component: NextLayoutComponentType }) {
  const router = useRouter()
  const { t, locale } = useTranslate()
  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props
  useEffect(() => {
    moment.locale(locale === "ar" ? "ar-dz" : locale)
    const body = document.querySelector("body")
    if (body)
      if (locale === "ar") {
        body.dir = "rtl"
      } else {
        body.dir = "ltr"
      }
  }, [locale])

  const getLayout = Component.getLayout ?? ((page) => page)

  if (router.route === "/404") return <Component {...pageProps} />

  return (
    <>
      <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy='lazyOnload'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
          page_path: window.location.pathname,
          });
        `}
      </Script>
      <Script
        strategy='lazyOnload'
        src='https://unpkg.com/react@16.0.0/umd/react.production.min.js'
      ></Script>
      <Script src='https://unpkg.com/react-copy-to-clipboard/build/react-copy-to-clipboard.js'></Script>
      <Head>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='description' content={t("PivotPoint Description")} />
        <meta name='keywords' content={t("PivotPoint keywords")} />
        <meta name='image' content='https://app.pivotpointbms.com/logo-black.png' />
        <meta name='robots' content='index, follow' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta content='https://app.pivotpointbms.com' property='og:url' />
        <meta name='twitter:site' content='pivotpointbms' />
        <meta name='twitter:creator' content='zairiaimen' />
        <meta name='twitter:image' content='https://app.pivotpointbms.com/logo-black.png' />
        <meta property='og:title' content='PivotPoint BMS' />
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='PivotPoint BMS' />{" "}
        <meta property='og:image' content='https://app.pivotpointbms.com/logo-black.png' />
        <meta property='og:description' content={t("PivotPoint Description")} />
        <link href='https://app.pivotpointbms.com/' rel='canonical' />
      </Head>
      <ThemeProvider attribute='class'>
        <ReduxProvider store={store}>
          <SnackbarProvider>
            <NextProgressBar />
            {getLayout(<Component {...pageProps} />)}
          </SnackbarProvider>
        </ReduxProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
