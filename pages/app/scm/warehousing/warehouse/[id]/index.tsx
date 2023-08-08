import React, { useEffect, useRef, useState } from "react"
// next
import Head from "next/head"
import { useRouter } from "next/router"
// hooks
import useTranslate from "hooks/useTranslate"
// routes
import { PATH_DASHBOARD } from "routes/paths"
// api
import {
  useEditWarehouseSectionMutation,
  useGetWarehouseSectionsQuery,
} from "store/api/scm/warehousing/warehouseSectionApis"
// types
import { WarehouseSection } from "types"
// layout
import Layout from "layout/Index"
// sections
import CreateEditSectionForm from "sections/dashboard/scm/warehousing/details/CreateEditSectionForm"
// components
import RGL, { WidthProvider } from "react-grid-layout"
import { Icon } from "@iconify/react"
import { Button, Dialog, HeaderBreadcrumbs, LoadingIndicator } from "components"
import Section from "sections/dashboard/scm/warehousing/details/Section"
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
  MiniMap,
} from "react-zoom-pan-pinch"
// styles
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import SectionPreview from "sections/dashboard/scm/warehousing/details/SectionPreview"
import RoleBasedGuard from "guards/RoleBasedGuard"

const ReactGridLayout = WidthProvider(RGL)

const COLS = 16

function index() {
  const { t } = useTranslate()
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null)
  const [openAddEditSectionDialog, setOpenAddEditSectionDialog] = useState(false)
  const [sectionToEdit] = useState<WarehouseSection | null>(null)
  const { query } = useRouter()

  const [warehouseId, setWarehouseId] = useState(query?.id !== null ? (query?.id as string) : "")

  // Queries
  const { data, isLoading } = useGetWarehouseSectionsQuery(warehouseId)
  const [editSection] = useEditWarehouseSectionMutation()

  useEffect(() => {
    setWarehouseId(query?.id !== null ? (query?.id as string) : "")
  }, [query.id])

  const handleLayoutChange = (layout: RGL.Layout[]) => {
    layout.forEach((item) => {
      const section = data?.data.find((s) => s.id === item.i)
      if (
        section &&
        (section?.h !== item.h ||
          section?.w !== item.w ||
          section?.x !== item.x ||
          section?.y !== item.y)
      ) {
        editSection({ data: { ...section, ...item }, id: section.id, warehouseId })
      }
    })
  }

  const element = (
    <ReactGridLayout
      className='layout grid-background'
      style={{ width: 121 * COLS, height: 121 * COLS }}
      layout={data?.data.map((section) => ({
        x: section.x,
        y: section.y,
        w: section.w,
        h: section.h,
        i: section.id,
        resizeHandles: ["se"],
      }))}
      cols={COLS}
      rowHeight={100}
      compactType={null}
      preventCollision
      margin={[20, 20]}
      onLayoutChange={handleLayoutChange}
    >
      {data?.data.map((section) => (
        <div key={section.id} className='h-full w-full select-none'>
          <Section section={section} />
        </div>
      ))}
    </ReactGridLayout>
  )

  return (
    <>
      <Head>
        <title>{t("Warehousing")} | Pivot Point BMS</title>
      </Head>
      <div className='flex max-w-full flex-col'>
        <div className='px-5'>
          <HeaderBreadcrumbs
            heading={t("Warehouse")}
            links={[
              { name: t("Dashboard"), href: PATH_DASHBOARD.root },
              { name: t("Supply Chain & Inventory"), href: PATH_DASHBOARD.scm.dashboard },
              { name: t("Warehousing"), href: PATH_DASHBOARD.scm.warehousing.list },
              { name: t("Warehouse") },
            ]}
            action={
              <Button
                startIcon={<Icon icon='ic:round-add' height={24} />}
                onClick={() => setOpenAddEditSectionDialog(true)}
              >
                {t("Create a Section")}
              </Button>
            }
          />
        </div>
        {isLoading ? (
          <div className='flex h-full w-full items-center justify-center '>
            {" "}
            <LoadingIndicator />
          </div>
        ) : (
          <TransformWrapper
            initialScale={1}
            initialPositionX={1}
            initialPositionY={1}
            ref={transformComponentRef}
            maxScale={1}
            panning={{ activationKeys: ["Shift"] }}
            limitToBounds
            disablePadding
          >
            {() => (
              <>
                <div
                  className='fixed bottom-12 z-10 overflow-hidden rounded-lg border border-dashed border-gray-600 ltr:right-12 rtl:left-12 dark:border-gray-200'
                  style={{
                    position: "fixed",
                    zIndex: 5,
                    bottom: "50px",
                    right: "50px",
                    pointerEvents: "none",
                  }}
                >
                  <MiniMap width={200} borderColor='#0073BA'>
                    {element}
                  </MiniMap>
                </div>
                <TransformComponent
                  wrapperStyle={{
                    maxWidth: "100%",
                    height: "calc(100vh - 100px )",
                    overflow: "hidden",
                  }}
                >
                  {element}
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        )}
      </div>
      <Dialog open={openAddEditSectionDialog} title={t("Add Section")}>
        <CreateEditSectionForm
          warehouseId={warehouseId}
          isEdit={Boolean(sectionToEdit)}
          currentSection={sectionToEdit}
          onSuccess={() => {
            setOpenAddEditSectionDialog(false)
          }}
          onFailure={() => {
            setOpenAddEditSectionDialog(false)
          }}
        />
      </Dialog>
      <SectionPreview warehouseId={warehouseId} />
    </>
  )
}

index.getLayout = function getLayout(page: JSX.Element) {
  return (
    <Layout variant='dashboard'>
      <RoleBasedGuard accessibleRoles={["Owner", "SCM"]}>{page}</RoleBasedGuard>
    </Layout>
  )
}

export default index
