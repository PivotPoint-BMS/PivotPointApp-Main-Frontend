import React from 'react'

// next
import Head from 'next/head'
// hooks
import useTranslate from 'hooks/useTranslate'
// sections
import { CustomerSatisfaction, Sales, TopCustomerComplaints } from 'sections/dashboard/crm/dashbord'
// components
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs'
import Card from '@/components/Card'
import CardHeader from '@/components/CardHeader'
import CardContent from '@/components/CardContent'

export default function index() {
  const { t } = useTranslate()

  return (
    <>
      <Head>
        <title>{t('Customer Relationship')} | Pivot Point BMS</title>
      </Head>
      <div className='flex max-w-full flex-col overflow-hidden px-5'>
        <HeaderBreadcrumbs heading={t('Customer Relationship')} />
        <div className='grid grid-cols-1 items-center gap-6 md:grid-cols-3'>
          <Card fullWidth>
            <CardHeader title={t('Customers')} />
            <CardContent>
              <h6 className='text-3xl font-semibold'>10</h6>
            </CardContent>
          </Card>
          <Card fullWidth>
            <CardHeader title={t('New Customers')} />
            <CardContent>
              <h6 className='text-3xl font-semibold'>10</h6>
            </CardContent>
          </Card>
          <Card fullWidth>
            <CardHeader title={t('Average customer lifetime value')} />
            <CardContent>
              <h6 className='text-3xl font-semibold'>10</h6>
            </CardContent>
          </Card>
          <CustomerSatisfaction />
          <TopCustomerComplaints />
          <Sales />
        </div>
      </div>
    </>
  )
}
