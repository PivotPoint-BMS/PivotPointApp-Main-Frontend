import React, { useState } from 'react'
// next
import Head from 'next/head'
// hooks
import useTranslate from 'hooks/useTranslate'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// layout
import Layout from 'layout/Index'
// components
import { Button, Card, HeaderBreadcrumbs } from 'components'
import { Icon } from '@iconify/react'
import WarehousesList from 'sections/dashboard/scm/warehousing/WarehousesList'
// import 'react-grid-layout/css/styles.css'
// import 'react-resizable/css/styles.css'

// const ReactGridLayout = WidthProvider(RGL)

// const COLS = 16

function index() {
  const { t } = useTranslate()
  const [openAddEditWarehouseDialog, setOpenAddEditWarehouseDialog] = useState(false)

  // const generateDOM = () =>
  //   _.map(_.range(1), () => (
  //     <div key='dewdwefref+5ref' className='h-full w-full select-none'>
  //       <Section />
  //     </div>
  //   ))

  return (
    <>
      <Head>
        <title>{t('Warehousing')} | Pivot Point BMS</title>
      </Head>
      <div className='flex max-w-full flex-col overflow-hidden px-5'>
        <HeaderBreadcrumbs
          heading={t('Warhousing')}
          links={[
            { name: t('Dashboard'), href: PATH_DASHBOARD.root },
            { name: t('Supply Chain & Inventory'), href: PATH_DASHBOARD.scm.dashboard },
            { name: t('Warhousing') },
          ]}
          action={
            <Button
              startIcon={<Icon icon='ic:round-add' height={24} />}
              onClick={() => setOpenAddEditWarehouseDialog(true)}
            >
              {t('Create a Warehouse')}
            </Button>
          }
        />
        <Card fullWidth className='mb-10 overflow-hidden'>
          <WarehousesList
            setOpenAddEditDialog={setOpenAddEditWarehouseDialog}
            openAddEditDialog={openAddEditWarehouseDialog}
          />
        </Card>
      </div>
      {/* <div className='w-full flex-1 overflow-auto'>
          <ReactGridLayout
            className='layout grid-background overflow-auto'
            style={{ width: 121 * COLS, height: 121 * COLS }}
            layout={[
              {
                x: 1,
                y: 1,
                w: 1,
                h: 1,
                i: 'dewdwefref+5ref',
                resizeHandles: ['se'],
              },
            ]}
            cols={COLS}
            rowHeight={100}
            verticalCompact={false}
            preventCollision
            margin={[20, 20]}
            onLayoutChange={(l) => console.log(l)}
          >
            {generateDOM()}
          </ReactGridLayout>
        </div> */}
    </>
  )
}

index.getLayout = function getLayout(page: JSX.Element) {
  return <Layout variant='dashboard'>{page}</Layout>
}

export default index
