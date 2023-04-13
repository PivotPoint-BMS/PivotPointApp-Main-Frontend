// next
import Head from 'next/head'
// hooks
import useTranslate from 'hooks/useTranslate'

export default function index() {
  const { t } = useTranslate()
  return (
    <>
      <Head>
        <title>{t('Workflow')} | Pivot Point BMS</title>
      </Head>
      <div className='flex h-full items-center justify-center'>
        <h1 className='text-2xl font-medium'>Workflow</h1>
      </div>
    </>
  )
}
