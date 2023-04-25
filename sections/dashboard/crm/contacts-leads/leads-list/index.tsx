import React, { ReactNode, useState } from 'react'
// next
import { useRouter } from 'next/router'
// hooks
import useTranslate from 'hooks/useTranslate'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// redux
import { wrapper } from 'store'
import { useAppDispatch } from 'store/hooks'
import { previewLead } from 'store/slices/leadPreviewSlice'
import { getLeads, getRunningQueriesThunk, useGetLeadsQuery } from 'store/api/crm/crmApis'
// types
import { Lead } from 'types'
// asset
import avatarPlaceholder from 'public/avatar_placeholder.png'
import noData from 'public/no-data.png'
// components
import { LoadingIndicator } from 'components'
import DataTable, { TableColumn } from 'react-data-table-component'
import { Icon as Iconify } from '@iconify/react'
import TextField from '@/components/TextField'
import Button from '@/components/Button'
import IconButton from '@/components/IconButton'
import Checkbox from '@/components/Checkbox'
import Badge from '@/components/Badge'
import Image from '@/components/Image'
import LeadTableToolbar from './LeadTableToolbar'
import DropdownMenu from '@/components/DropdownMenu'
import LeadPreview from './LeadPreview'
import Tooltip from '@/components/Tooltip'

export default function LeadsList() {
  const { t } = useTranslate()
  const { push, isFallback } = useRouter()
  const dispatch = useAppDispatch()
  const [selectedRows, setSelectedRows] = useState<Lead[]>([])
  const [selectedCount, setSelectedCount] = useState(0)

  const { data, isLoading } = useGetLeadsQuery(undefined, {
    skip: isFallback,
    refetchOnFocus: true,
  })

  const columns: TableColumn<Lead>[] = [
    {
      name: 'Lead Name',
      cell: ({ fullName }) => (
        <div className='flex items-center gap-2'>
          <div>
            <Image
              alt='avatar'
              width={30}
              height={30}
              src={avatarPlaceholder.src}
              className='rounded-full'
            />
          </div>

          <p className='font-small text-sm'>{fullName}</p>
        </div>
      ),
      grow: 1.5,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Contact',
      cell: ({ email, phoneNumber }) => (
        <div className='flex flex-col gap-2 py-2'>
          <p className='hyphens  flex items-center gap-1 truncate'>
            <Iconify icon='material-symbols:mail-rounded' height={18} className='text-gray-500' />{' '}
            {email}{' '}
          </p>
          <p className='flex items-center gap-1 truncate'>
            <Iconify icon='material-symbols:call' height={18} className='text-gray-500' />{' '}
            {phoneNumber}{' '}
          </p>
        </div>
      ),
      sortable: true,
      reorder: true,
      grow: 2,
    },
    {
      name: 'Lead status',
      cell: ({ status }) => {
        if (status === 0)
          return <Badge variant='ghost' intent='info' size='small' label={t('New')} />
        if (status === 1)
          return <Badge variant='ghost' intent='primary' size='small' label={t('Open')} />
        if (status === 2)
          return (
            <Badge variant='ghost' intent='info' size='small' label={t('Attempt to Contact')} />
          )
        if (status === 4)
          return (
            <Badge variant='ghost' intent='warning' size='small' label={t('Deal Unqualified')} />
          )
        if (status === 5)
          return <Badge variant='ghost' intent='success' size='small' label={t('Success')} />
        if (status === 6)
          return <Badge variant='ghost' intent='error' size='small' label={t('Failure')} />
        return <Badge variant='ghost' size='small' label='Closed' />
      },
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: 'Lead Source',
      cell: ({ source }) =>
        source?.source ? (
          <Badge
            variant='ghost'
            intent='default'
            size='small'
            label={source?.source}
            className='capitalize'
          />
        ) : (
          <Badge variant='ghost' intent='error' size='small' label='None' />
        ),
      sortable: true,
      reorder: true,
    },
    {
      name: t('Actions'),
      right: true,
      cell: (lead) => (
        <div className='flex items-center gap-2'>
          <Tooltip title={t('View Details')} side='bottom'>
            <IconButton onClick={() => push(PATH_DASHBOARD.crm['contacts-leads'].lead(lead.id))}>
              <Iconify icon='mingcute:external-link-fill' height={18} />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('Preview')} side='bottom'>
            <IconButton onClick={() => dispatch(previewLead(lead))}>
              <Iconify icon='material-symbols:preview' height={18} />
            </IconButton>
          </Tooltip>
          <DropdownMenu
            trigger={
              <IconButton>
                <Tooltip title={t('More')} side='bottom' sideOffset={10}>
                  <Iconify icon='material-symbols:more-vert' height={20} />
                </Tooltip>
              </IconButton>
            }
            items={[
              {
                type: 'button',
                label: 'Edit',
                icon: <Iconify icon='material-symbols:edit' height={18} />,
              },
              {
                type: 'button',
                label: 'Delete',
                icon: <Iconify icon='material-symbols:delete-rounded' height={18} />,
                className: 'text-red-600',
              },
            ]}
          />
        </div>
      ),
    },
  ]

  return (
    <>
      {isLoading ? (
        <div className='flex h-56 w-full items-center justify-center'>
          <LoadingIndicator />
        </div>
      ) : (
        <>
          {data ? (
            <>
              <div className='flex items-center justify-center gap-6 p-3'>
                <TextField
                  placeholder={t('Search...')}
                  startAdornment={
                    <Iconify icon='ion:search-outline' height={24} className='text-gray-500' />
                  }
                  className='flex h-full'
                />
                <Button
                  variant='outlined'
                  intent='default'
                  size='large'
                  className='h-full'
                  startIcon={<Iconify icon='material-symbols:filter-list-rounded' height={20} />}
                >
                  {t('Filters')}
                </Button>
              </div>
              <div>
                <DataTable
                  columns={columns}
                  data={data}
                  selectableRows
                  pagination
                  highlightOnHover
                  pointerOnHover
                  onSelectedRowsChange={({
                    selectedCount: _selectedCount,
                    selectedRows: _selectedRows,
                  }) => {
                    setSelectedCount(_selectedCount)
                    setSelectedRows(_selectedRows)
                  }}
                  selectableRowsComponent={Checkbox as unknown as ReactNode}
                  sortIcon={<Iconify icon='typcn:arrow-sorted-down' />}
                  onRowDoubleClicked={(lead) => dispatch(previewLead(lead))}
                />
                <LeadTableToolbar selectedCount={selectedCount} />
                <LeadPreview />
              </div>
            </>
          ) : (
            <div className='flex flex-col items-center justify-center gap-2 p-4'>
              <Image src={noData.src} height={300} width={300} />
              <h1 className='text-xl font-semibold'>{t('No Lead Found')}</h1>
            </div>
          )}
        </>
      )}
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  store.dispatch(getLeads.initiate())

  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})
