// next
import Head from 'next/head'
// hooks
import useTranslate from 'hooks/useTranslate'
// routes
// import { PATH_DASHBOARD } from 'routes/paths'
// sections
import GeneralInfo from 'sections/dashboard/crm/contacts-leads/contacts-list/lead/GeneralInfo'
import Details from 'sections/dashboard/crm/contacts-leads/contacts-list/lead/Details'
// components
// import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs'

export default function index() {
  const { t } = useTranslate()

  return (
    <>
      <Head>
        <title>{t('Lead Details')} | Pivot Point BMS</title>
      </Head>
      <div className='flex max-w-full flex-col overflow-hidden'>
        {/* <HeaderBreadcrumbs
          heading={t('Lead Details')}
          links={[
            { name: t('Dashboard'), href: PATH_DASHBOARD.root },
            { name: t('Customer Relationship'), href: PATH_DASHBOARD.crm.root },
            { name: t('Contacts & Leads'), href: PATH_DASHBOARD.crm['contacts-leads'].root },
            { name: t('Lead Details') },
          ]}
        /> */}
        <div className='grid grid-cols-1 divide-x md:grid-cols-3'>
          <GeneralInfo />
          <Details />
        </div>
      </div>
    </>
  )
}
