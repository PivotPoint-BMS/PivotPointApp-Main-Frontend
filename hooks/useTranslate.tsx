import { useRouter } from 'next/router'

// locales
import fr from 'locales/fr'
import en from 'locales/en'
import ar from 'locales/ar'

const useTranslate = () => {
  const router = useRouter()
  const { locale } = router

  // eslint-disable-next-line no-nested-ternary
  const t = locale !== 'en' ? (locale === 'fr' ? fr : ar) : en
  return t
}

export default useTranslate
