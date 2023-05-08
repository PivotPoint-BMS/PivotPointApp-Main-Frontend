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
// components
import { Icon as Iconify } from '@iconify/react'
import { HeaderBreadcrumbs, Button } from 'components'
import Select from 'components/Select'
import { useRouter } from 'next/router'

export default function index() {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const { query, push, pathname } = useRouter()
  const { data, isError, isSuccess, isLoading } = useGetDealBoardsQuery()
  const [boards, setBoards] = useState<{ label: string; value: string; disabled?: boolean }[]>([])
  const [boardId, setBoardId] = useState(query?.tab ? (query?.tab as string) : '')

  useEffect(() => {
    if (isError) {
      open({
        message: t('A problem has occured.'),
        type: 'error',
        variant: 'contained',
      })
    }
    if (isSuccess) {
      setBoards(data?.map((board) => ({ label: board.title, value: board.id })) || [])
      setBoardId(data[0].id)
      push(pathname, { query: { boardId: data[0].id } })
    }
  }, [isError, isLoading])

  useEffect(() => {
    push(pathname, { query: { boardId } })
  }, [pathname, boardId])

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
              <Select items={boards} value={boardId} onValueChange={(value) => setBoardId(value)} />
              <Button startIcon={<Iconify icon='ic:round-add' height={24} />}>
                {t('Create Deal')}
              </Button>
            </div>
          }
        />
        <DealsKanban />
      </div>
    </>
  )
}
