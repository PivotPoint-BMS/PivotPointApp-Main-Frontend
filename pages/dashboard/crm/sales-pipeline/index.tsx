import React, { useEffect, useState } from 'react'
// next
import Head from 'next/head'
// api
import {
  getDealBoards,
  getRunningQueriesThunk,
  useGetDealBoardsQuery,
} from 'store/api/crm/sales-pipeline/dealsBoardsApi'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// sections
import DealsKanban from 'sections/dashboard/crm/sales-pipeline/DealsKanban'
import CreateEditBoardForm from 'sections/dashboard/crm/sales-pipeline/CreateEditBoardForm'
// components
import { Icon as Iconify } from '@iconify/react'
import { HeaderBreadcrumbs, Button, Dialog } from 'components'
import Select from 'components/Select'
import { useRouter } from 'next/router'
import { wrapper } from 'store'

export default function index() {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const { query, push, pathname, isFallback } = useRouter()
  const { data, isError, isSuccess, isLoading, isFetching, refetch } = useGetDealBoardsQuery(
    undefined,
    {
      skip: isFallback,
    }
  )
  const [boards, setBoards] = useState<{ label: string; value: string; disabled?: boolean }[]>([])
  const [boardId, setBoardId] = useState(query?.boardId ? (query?.boardId as string) : '')
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    if (isError) {
      open({
        message: t('A problem has occured.'),
        type: 'error',
        variant: 'contained',
      })
    }
    if (isSuccess && data.length > 0) {
      setBoards(data?.map((board) => ({ label: board.title, value: board.id })) || [])
      if (boardId.length === 0) {
        setBoardId(data[0].id)
        push(pathname, { query: { boardId: data[0].id } })
      }
    }
  }, [isError, isSuccess, isFetching, isLoading])

  useEffect(() => {
    push(pathname, { query: { boardId } })
  }, [pathname, boardId])

  useEffect(() => {
    refetch()
  }, [pathname])

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
                  items={boards}
                  value={boardId}
                  onValueChange={(value) => setBoardId(value)}
                />
              )}
              <Button
                startIcon={<Iconify icon='ic:round-add' height={24} />}
                onClick={() => setOpenDialog(true)}
              >
                {t('New Board')}
              </Button>
            </div>
          }
        />
        <DealsKanban boardId={boardId} />
        <Dialog open={openDialog} title={t('Add New Board')}>
          <CreateEditBoardForm
            // TODO: Add Edit Board
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

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  store.dispatch(getDealBoards.initiate())

  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})
