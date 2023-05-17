import React, { useEffect } from 'react'
// next
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/router'
// redux
import { wrapper } from 'store'
// hooks
import useTranslate from 'hooks/useTranslate'
// Components
import { NextProgressBar, SnackbarProvider } from 'components'
// css
import 'styles/globals.css'
import 'simplebar-react/dist/simplebar.min.css'
import 'react-lazy-load-image-component/src/effects/blur.css'
import 'react-lazy-load-image-component/src/effects/opacity.css'
import 'react-lazy-load-image-component/src/effects/black-and-white.css'
import { NextLayoutComponentType } from 'types'
// import 'reactflow/dist/style.css'

// function getDirection(locale: string) {
//   if (locale === 'ar') {
//     return 'rtl'
//   }

//   return 'ltr'
// }

function MyApp({
  Component,
  pageProps,
}: Omit<AppProps, 'Component'> & { Component: NextLayoutComponentType }) {
  const router = useRouter()
  const { t, locale } = useTranslate()

  useEffect(() => {
    const body = document.querySelector('body')
    if (body)
      if (locale === 'ar') {
        body.dir = 'rtl'
      } else {
        body.dir = 'ltr'
      }
  }, [locale])

  const getLayout = Component.getLayout ?? ((page) => page)

  if (router.route === '/404') return <Component {...pageProps} />

  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='description' content={t('PivotPoint Description')} />
        <meta name='keywords' content={t('PivotPoint keywords')} />
        <meta name='image' content='https://app.pivotpointbms.com/logo-black.png' />
        <meta name='robots' content='index, follow' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta content='https://app.pivotpointbms.com' property='og:url' />
        <meta name='twitter:site' content='pivotpointbms' />
        <meta name='twitter:creator' content='zairiaimen' />
        <meta name='twitter:image' content='https://app.pivotpointbms.com/logo-black.png' />
        <meta property='og:title' content='PivotPoint BMS' />
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='PivotPoint BMS' />{' '}
        <meta property='og:image' content='https://app.pivotpointbms.com/logo-black.png' />
        <meta property='og:description' content={t('PivotPoint Description')} />
        <link href='https://app.pivotpointbms.com/' rel='canonical' />
      </Head>
      <ThemeProvider attribute='class'>
        <SnackbarProvider>
          <NextProgressBar />
          {getLayout(<Component {...pageProps} />)}
        </SnackbarProvider>
      </ThemeProvider>
    </>
  )
}

export default wrapper.withRedux(MyApp)
