import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/router'
import { Provider as ReduxProvider } from 'react-redux'

// Components
import Layout from '../components/Layout'
import { store } from '../store'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  if (router.route === '/404') return <Component {...pageProps} />

  return (
    <ReduxProvider store={store}>
      <ThemeProvider attribute='class'>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </ReduxProvider>
  )
}

export default MyApp
