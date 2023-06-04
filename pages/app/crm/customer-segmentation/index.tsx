import React, { useEffect, useState } from 'react'
// next
import Head from 'next/head'
// api
import { useGetSegmentationsQuery } from 'store/api/crm/customer-segmentation/customerSegmentationApi'
// hooks
import useTranslate from 'hooks/useTranslate'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// layout
import Layout from 'layout/Index'
// sections
import CreateEditSegmentForm from 'sections/dashboard/crm/customer-segmentation/CreateEditSegmentForm'
import SegmentDetails from 'sections/dashboard/crm/customer-segmentation/SegmentDetails'
// components
import { Icon as Iconify } from '@iconify/react'
import { HeaderBreadcrumbs, Button, Select, Dialog } from 'components'

function index() {
  const { t } = useTranslate()
  const [segmentId, setSegmentId] = useState('')
  const [openDialog, setOpenDialog] = useState(false)

  // Queries
  const { data, isSuccess, isLoading } = useGetSegmentationsQuery()

  useEffect(() => {
    if (isSuccess && data.data.length > 0) setSegmentId(data.data[0].id)
  }, [isLoading])

  return (
    <>
      <Head>
        <title>{t('Customer Segmentation')} | Pivot Point BMS</title>
      </Head>
      <div className='flex w-full flex-col overflow-hidden px-5'>
        <HeaderBreadcrumbs
          heading={t('Customer Segmentation')}
          links={[
            { name: t('Dashboard'), href: PATH_DASHBOARD.root },
            { name: t('Customer Relationship'), href: PATH_DASHBOARD.crm.dashboard },
            { name: t('Customer Segmentation') },
          ]}
          action={
            <div className='flex items-center gap-2'>
              {isSuccess && data.data.length > 0 && (
                <Select
                  items={data.data.map((segment) => ({
                    value: segment.id,
                    label: segment.segmentName,
                  }))}
                  value={segmentId || ''}
                  onValueChange={(value) => setSegmentId(value)}
                />
              )}
              <div className='flex items-center gap-2'>
                <Button
                  onClick={() => setOpenDialog(true)}
                  startIcon={<Iconify icon='ic:round-add' height={24} />}
                >
                  {t('New Segment')}
                </Button>
              </div>
            </div>
          }
        />
        <SegmentDetails segment={data?.data.find((segment) => segment.id === segmentId) || null} />
      </div>

      <Dialog open={openDialog} title={t('Add New Segment')}>
        <CreateEditSegmentForm
          currentSegment={null}
          isEdit={false}
          onSuccess={() => {
            setOpenDialog(false)
          }}
          onFailure={() => {
            setOpenDialog(false)
          }}
        />
      </Dialog>
    </>
  )
}

index.getLayout = function getLayout(page: JSX.Element) {
  return <Layout variant='dashboard'>{page}</Layout>
}

export default index
