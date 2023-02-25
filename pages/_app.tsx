import React, { useEffect } from 'react'
// next
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/router'
// redux
import { Provider as ReduxProvider } from 'react-redux'
import { wrapper } from 'store'
// hooks
import useTranslate from 'hooks/useTranslate'
// layout
import Layout from 'layout/Index'
// Components
import ProgressBar from '@/components/Progressbar'
// css
import 'styles/globals.css'
import 'simplebar-react/dist/simplebar.min.css'

// function getDirection(locale: string) {
//   if (locale === 'ar') {
//     return 'rtl'
//   }

//   return 'ltr'
// }
function MyApp({ Component, ...rest }: AppProps) {
  const router = useRouter()
  const { locale } = useTranslate()
  const { store, props } = wrapper.useWrappedStore(rest)

  useEffect(() => {
    const body = document.querySelector('body')
    if (body)
      if (locale === 'ar') {
        body.dir = 'rtl'
      } else {
        body.dir = 'ltr'
      }
  }, [locale])

  if (router.route === '/404') return <Component {...props.pageProps} />

  return (
    <ReduxProvider store={store}>
      <ThemeProvider attribute='class'>
        <ProgressBar />
        <Layout
          variant={
            // eslint-disable-next-line no-nested-ternary
            router.route.includes('dashboard')
              ? 'dashboard'
              : router.route.includes('auth')
              ? 'main'
              : 'logoOnly'
          }
        >
          <Component {...props.pageProps} />
        </Layout>
      </ThemeProvider>
    </ReduxProvider>
  )
}

export default MyApp
