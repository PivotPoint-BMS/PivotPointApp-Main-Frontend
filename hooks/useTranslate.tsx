import { useRouter } from 'next/router'

// locales
import fr from 'locales/fr'
import en from 'locales/en'
import ar from 'locales/ar'

const useTranslate = () => {
  const router = useRouter()
  const { locale } = router

  // eslint-disable-next-line no-nested-ternary
  const translation = locale !== 'en' ? (locale === 'fr' ? fr : ar) : en
  const t = (key: string) => (translation[key] ? translation[key] : key)
  return { t, locale }
}

export default useTranslate
