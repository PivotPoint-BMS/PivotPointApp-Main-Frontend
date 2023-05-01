import React, { ReactNode, useEffect, useState } from 'react'
// next
import { useTheme } from 'next-themes'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// redux
import { wrapper } from 'store'
import {
  getLeadSources,
  getRunningQueriesThunk,
  invalidateTags,
  useDeleteLeadSourceMutation,
  useGetLeadSourcesQuery,
} from 'store/api/crm/crmApis'
// types
import { LeadSource } from 'types/Lead'
// asset
import noData from 'public/no-data.png'
import noDataDark from 'public/no-data-dark.png'
// components
import DataTable, { TableColumn } from 'react-data-table-component'
import { Icon as Iconify } from '@iconify/react'
import {
  Image,
  LoadingIndicator,
  TextField,
  Button,
  IconButton,
  Checkbox,
  Tooltip,
  Backdrop,
  Dialog,
  AlertDialog,
} from 'components'
// sections
import LeadSourceTableToolbar from './LeadSourceTableToolbar'
import CreateEditLeadSourceForm from '../create/CreateEditLeadSourceForm'

export default function LeadSourcesList({
  openAddDialog,
  setOpenAddDialog,
}: {
  openAddDialog: boolean
  setOpenAddDialog: (value: boolean) => void
}) {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const { theme } = useTheme()
  const [selectedRows, setSelectedRows] = useState<LeadSource[]>([])
  const [selectedCount, setSelectedCount] = useState(0)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [leadSourceToEdit, setLeadSourceToEdit] = useState<LeadSource | null>(null)
  const [idToDelete, setIdToDelete] = useState<string | null>(null)
  const { data, isLoading } = useGetLeadSourcesQuery(undefined, {
    refetchOnFocus: true,
  })

  const [deleteLeadSource, { isLoading: isDeleteLeading, isSuccess, isError }] =
    useDeleteLeadSourceMutation()

  const columns: TableColumn<LeadSource>[] = [
    {
      name: 'Source',
      cell: ({ source }) => <p>{source}</p>,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Source Link',
      cell: ({ sourceLink }) => <p>{sourceLink}</p>,
      sortable: true,
      reorder: true,
    },
    {
      name: t('Actions'),
      right: true,
      cell: (leadSource) => (
        <div className='flex items-center gap-2'>
          <Tooltip title={t('Delete')} side='bottom'>
            <IconButton onClick={() => setIdToDelete(leadSource.id || '')}>
              <Iconify
                className='text-red-600 dark:text-red-500'
                icon='material-symbols:delete-rounded'
                height={20}
              />
            </IconButton>
          </Tooltip>

          <Tooltip title={t('Edit')} side='bottom'>
            <IconButton
              onClick={() => {
                setLeadSourceToEdit(leadSource)
                setOpenEditDialog(true)
              }}
            >
              <Iconify icon='material-symbols:edit' height={20} />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ]

  useEffect(() => {
    if (isError) {
      open({
        message: t('A problem has occured.'),
        autoHideDuration: 4000,
        type: 'error',
        variant: 'contained',
      })
    }
    if (isSuccess) {
      open({
        message: t('Lead Source Deleted Successfully.'),
        autoHideDuration: 4000,
        type: 'success',
        variant: 'contained',
      })
    }
  }, [isError, isSuccess])

  return (
    <>
      {isLoading ? (
        <div className='flex h-56 w-full items-center justify-center'>
          <LoadingIndicator />
        </div>
      ) : (
        <>
          {data?.data && data?.data.length ? (
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
                />
                <LeadSourceTableToolbar selectedCount={selectedCount} />
              </div>
            </>
          ) : (
            <div className='flex flex-col items-center justify-center gap-2 p-4'>
              <Image
                src={theme === 'dark' ? noDataDark.src : noData.src}
                height={300}
                width={300}
              />
              <h1 className='text-xl font-semibold'>{t('No Contact Found')}</h1>
            </div>
          )}
        </>
      )}
      <Backdrop loading={isDeleteLeading} />
      <Dialog
        open={openEditDialog || openAddDialog}
        title={openEditDialog ? t('Edit Lead Source') : t('Add Lead Source')}
      >
        <CreateEditLeadSourceForm
          isEdit={openEditDialog}
          currentLeadSource={leadSourceToEdit}
          onSuccess={() => {
            setOpenAddDialog(false)
            setOpenEditDialog(false)
          }}
          onFailure={() => {
            setOpenAddDialog(false)
            setOpenEditDialog(false)
          }}
        />
      </Dialog>
      <AlertDialog
        title={t('Confirm Delete')}
        description={t(
          'This action cannot be undone. This will permanently delete this lead source.'
        )}
        cancelText={t('Cancel')}
        confirmText={t('Yes, Delete')}
        onConfirm={() => {
          deleteLeadSource(idToDelete || '')
          invalidateTags(['LeadSources'])
          setIdToDelete(null)
        }}
        open={idToDelete !== null}
        onClose={() => setIdToDelete(null)}
      />
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  store.dispatch(getLeadSources.initiate())

  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})
