import React, { useState } from 'react'
// next
import Head from 'next/head'
// utils
import { getItem } from 'utils/localStorage'
// hooks
import useTranslate from 'hooks/useTranslate'
// sections
import QuickSetup from 'sections/dashboard/fm/quick-setup'
// layout
import Layout from 'layout'
// components
import { AlertDialog } from 'components'

function index() {
  const hasDonQuickSetup = getItem('hasDonQuickSetup')
  const [openQuickSetupAlert, setOpenQuickSetupAlert] = useState(!hasDonQuickSetup)
  const [openQuickSetup, setOpenQuickSetup] = useState(false)
  const { t } = useTranslate()
  return (
    <>
      <Head>
        <title>Finance Management | Pivot Point BMS</title>
      </Head>

      <div className='flex h-full items-center justify-center'>
        <h1 className='text-2xl font-medium'>{t('Finance Management')}</h1>
      </div>
      <AlertDialog
        open={openQuickSetupAlert}
        title={t('Processeding To Finance Setup')}
        description={
          <p className='py-2 text-sm'>
            {t(
              "Let's get started! Complete the quick setup by providing some essential finance information."
            )}
          </p>
        }
        confirmText={t('Go to setup')}
        onConfirm={() => {
          setOpenQuickSetup(true)
          setOpenQuickSetupAlert(false)
        }}
        onClose={() => setOpenQuickSetupAlert(false)}
      />
      <QuickSetup open={openQuickSetup} />
    </>
  )
}
index.getLayout = function getLayout(page: JSX.Element) {
  return <Layout variant='dashboard'>{page}</Layout>
}

export default index
