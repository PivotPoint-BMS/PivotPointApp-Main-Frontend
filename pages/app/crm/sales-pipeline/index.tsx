import React, { useEffect, useState } from 'react'
// next
import Head from 'next/head'
// api
import { useGetDealBoardsQuery } from 'store/api/crm/sales-pipeline/dealsBoardsApi'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// sections
import DealsKanban from 'sections/dashboard/crm/sales-pipeline/DealsKanban'
import CreateEditBoardForm from 'sections/dashboard/crm/sales-pipeline/CreateEditBoardForm'
// layout
import Layout from 'layout/Index'
// components
import { Icon as Iconify } from '@iconify/react'
import { HeaderBreadcrumbs, Button, Dialog } from 'components'
import Select from 'components/Select'
import { useRouter } from 'next/router'

function index() {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const { query, push, pathname } = useRouter()
  const { data, isError, isSuccess, isLoading, isFetching } = useGetDealBoardsQuery()
  const [boardId, setBoardId] = useState<string | null>(
    query?.boardId !== null ? (query?.boardId as string) : null
  )
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    if (isError) {
      open({
        message: t('A problem has occured.'),
        type: 'error',
        variant: 'contained',
      })
    }
    if ((boardId === null || boardId === '') && isSuccess && data.length > 0) {
      setBoardId(data[0].id)
      push(pathname, { query: { boardId: data[0].id } })
    }
  }, [isError, isSuccess, isFetching, isLoading, data, boardId])

  useEffect(() => {
    push(pathname, { query: { boardId } })
  }, [boardId])

  return (
    <>
      <Head>
        <title>{t('Sales Pipeline')} | Pivot Point BMS</title>
      </Head>
      <div className='flex w-full flex-col overflow-hidden px-5'>
        <HeaderBreadcrumbs
          heading={t('Sales Pipeline')}
          links={[
            { name: t('Dashboard'), href: PATH_DASHBOARD.root },
            { name: t('Customer Relationship'), href: PATH_DASHBOARD.crm.root },
            { name: t('Sales Pipeline') },
          ]}
          action={
            <div className='flex items-center gap-2'>
              {data && data.length > 0 && (
                <Select
                  items={data.map((board) => ({ value: board.id, label: board.title }))}
                  value={boardId || ''}
                  onValueChange={(value) => setBoardId(value)}
                />
              )}
              <Button
                startIcon={<Iconify icon='ic:round-add' height={24} />}
                onClick={() => setOpenDialog(true)}
              >
                {t('New Pipeline')}
              </Button>
            </div>
          }
        />
        <DealsKanban boardId={boardId} setBoardId={setBoardId} />
        <Dialog open={openDialog} title={t('Add New Pipeline')}>
          <CreateEditBoardForm
            currentBoard={null}
            isEdit={false}
            onSuccess={() => {
              setOpenDialog(false)
            }}
            onFailure={() => {
              setOpenDialog(false)
            }}
          />
        </Dialog>
      </div>
    </>
  )
}

index.getLayout = function getLayout(page: JSX.Element) {
  return <Layout variant='dashboard'>{page}</Layout>
}

export default index
