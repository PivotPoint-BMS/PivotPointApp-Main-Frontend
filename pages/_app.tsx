import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/router'

// Components
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  if (router.route === '/404') return <Component {...pageProps} />

  return (
    <ThemeProvider attribute='class'>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
