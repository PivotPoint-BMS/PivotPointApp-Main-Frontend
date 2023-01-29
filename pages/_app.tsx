import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/router'
import { Provider as ReduxProvider } from 'react-redux'
import { IntlProvider } from 'react-intl'
// redux
import { store } from 'store'
// layout
import Layout from 'layout/Layout'
// Components
import ProgressBar from '@/components/Progressbar'
// css
import 'simplebar-react/dist/simplebar.min.css'

// function getDirection(locale: string) {
//   if (locale === 'ar') {
//     return 'rtl'
//   }

//   return 'ltr'
// }
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { locale = 'en' } = router

  if (router.route === '/404') return <Component {...pageProps} />

  return (
    <ReduxProvider store={store}>
      <IntlProvider locale={locale}>
        <ThemeProvider attribute='class'>
          <Layout>
            <ProgressBar />
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </IntlProvider>
    </ReduxProvider>
  )
}

export default MyApp
