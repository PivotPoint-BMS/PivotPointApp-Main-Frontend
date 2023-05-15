// next
import Head from 'next/head'
// hooks
import useTranslate from 'hooks/useTranslate'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// sections
import CreateEditLeadForm from 'sections/dashboard/crm/contacts-leads/lead/CreateEditLeadForm'
// components
import { HeaderBreadcrumbs } from 'components'

export default function index() {
  const { t } = useTranslate()

  return (
    <>
      <Head>
        <title>{t('Create Lead')} | Pivot Point BMS</title>
      </Head>
      <div className='flex max-w-full flex-col  px-5'>
        <HeaderBreadcrumbs
          heading={t('Create Lead')}
          links={[
            { name: t('Dashboard'), href: PATH_DASHBOARD.root },
            { name: t('Customer Relationship'), href: PATH_DASHBOARD.crm.root },
            { name: t('Contacts & Leads'), href: PATH_DASHBOARD.crm['contacts-leads'].root },
            { name: t('Create Lead') },
          ]}
        />
        <CreateEditLeadForm />
      </div>
    </>
  )
}
