import React, { ReactNode, useEffect, useState } from 'react'
// next
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// redux
import { wrapper } from 'store'
import { useAppDispatch } from 'store/hooks'
import { previewLead } from 'store/slices/leadPreviewSlice'
import {
  getLeads,
  getRunningQueriesThunk,
  invalidateTags,
  useDeleteLeadMutation,
  useGetLeadsQuery,
} from 'store/api/crm/leadApis'
// config
import { PIVOTPOINT_API } from 'config'
// types
import { Lead } from 'types'
// asset
import avatarPlaceholder from 'public/avatar_placeholder.png'
import noData from 'public/no-data.png'
import noDataDark from 'public/no-data-dark.png'
// components
import { AlertDialog, Backdrop, LoadingIndicator } from 'components'
import DataTable, { TableColumn } from 'react-data-table-component'
import { Icon as Iconify } from '@iconify/react'
import TextField from 'components/TextField'
import Button from 'components/Button'
import IconButton from 'components/IconButton'
import Checkbox from 'components/Checkbox'
import Badge from 'components/Badge'
import Image from 'components/Image'
import DropdownMenu from 'components/DropdownMenu'
import Tooltip from 'components/Tooltip'
import LeadTableToolbar from './LeadTableToolbar'
import LeadPreview from './LeadPreview'

export default function LeadsList() {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const { theme } = useTheme()
  const { push, isFallback } = useRouter()
  const dispatch = useAppDispatch()
  const [selectedRows, setSelectedRows] = useState<Lead[]>([])
  const [selectedCount, setSelectedCount] = useState(0)
  const [idToDelete, setIdToDelete] = useState<string | null>(null)

  const { data, isLoading } = useGetLeadsQuery(
    { IsContact: false, IsLead: true },
    {
      skip: isFallback,
      refetchOnFocus: true,
    }
  )
  const [
    deleteLead,
    { isLoading: isDeleteLeading, isError: isDeleteError, isSuccess: isDeleteSuccess },
  ] = useDeleteLeadMutation()

  const columns: TableColumn<Lead>[] = [
    {
      name: 'Lead Name',
      cell: ({ fullName, imageFile }) => (
        <div className='flex items-center gap-2'>
          <div>
            <Image
              alt='avatar'
              width={30}
              height={30}
              src={imageFile ? `${PIVOTPOINT_API.crmPicUrl}/${imageFile}` : avatarPlaceholder.src}
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
      cell: ({ leadStatus }) => {
        if (leadStatus === 1)
          return <Badge variant='ghost' intent='primary' size='small' label={t('Open')} />
        if (leadStatus === 2)
          return (
            <Badge variant='ghost' intent='info' size='small' label={t('Attempt to Contact')} />
          )
        if (leadStatus === 4)
          return (
            <Badge variant='ghost' intent='warning' size='small' label={t('Deal Unqualified')} />
          )
        if (leadStatus === 5)
          return <Badge variant='ghost' intent='success' size='small' label={t('Success')} />
        if (leadStatus === 6)
          return <Badge variant='ghost' intent='error' size='small' label={t('Failure')} />
        if (leadStatus === 7)
          return <Badge variant='ghost' intent='success' size='small' label={t('Closed')} />
        return <Badge variant='ghost' intent='info' size='small' label={t('New')} />
      },
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: 'Lead Source',
      cell: ({ leadSource }) =>
        leadSource?.source ? (
          <Badge
            variant='ghost'
            intent='default'
            size='small'
            label={leadSource?.source}
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
                onClick: () => push(PATH_DASHBOARD.crm['contacts-leads'].edit(lead.id)),
              },
              {
                type: 'button',
                label: 'Delete',
                icon: <Iconify icon='material-symbols:delete-rounded' height={18} />,
                className: 'text-red-600',
                onClick: () => setIdToDelete(lead.id),
              },
            ]}
          />
        </div>
      ),
    },
  ]

  useEffect(() => {
    if (isDeleteError) {
      open({
        message: t('A problem has occured.'),
        autoHideDuration: 4000,
        type: 'error',
        variant: 'contained',
      })
    }
    if (isDeleteSuccess) {
      open({
        message: t('Lead Source Deleted Successfully.'),
        autoHideDuration: 4000,
        type: 'success',
        variant: 'contained',
      })
    }
  }, [isDeleteError, isDeleteSuccess])

  useEffect(() => {
    console.log(selectedRows)
  }, [selectedRows])

  return (
    <>
      {isLoading ? (
        <div className='flex h-56 w-full items-center justify-center'>
          <LoadingIndicator />
        </div>
      ) : (
        <>
          {data?.data && data?.data.length > 0 ? (
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
                  data={data.data}
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
              {theme === 'dark' ? (
                <Image src={noDataDark.src} height={300} width={300} className='mix-blend-darken' />
              ) : (
                <Image src={noData.src} height={300} width={300} className='mix-blend-darken' />
              )}
              <h1 className='text-xl font-semibold'>{t('No Lead Found')}</h1>
            </div>
          )}
        </>
      )}
      <Backdrop loading={isDeleteLeading} />
      <AlertDialog
        title={t('Confirm Delete')}
        description={t('This action cannot be undone. This will permanently delete this lead.')}
        cancelText={t('Cancel')}
        confirmText={t('Yes, Delete')}
        onConfirm={() => {
          deleteLead(idToDelete || '')
          invalidateTags(['Leads'])
          setIdToDelete(null)
        }}
        open={idToDelete !== null}
        onClose={() => setIdToDelete(null)}
      />
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  store.dispatch(getLeads.initiate({ IsContact: false, IsLead: true }))

  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})
