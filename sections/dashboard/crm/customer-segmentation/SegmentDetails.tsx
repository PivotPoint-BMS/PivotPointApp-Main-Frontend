import React, { useEffect, useState } from 'react'
import { min } from 'lodash'
import clsx from 'clsx'
// next
import Image from 'next/image'
import { useRouter } from 'next/router'
// types
import { Segment, SegmentClient } from 'types'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
import { useAppDispatch, useAppSelector } from 'store/hooks'
// redux
import { changePageNumber, changePageSize } from 'store/slices/pagginationSlice'
// api
import {
  useAddClientToSegmentMutation,
  useDeleteSegmentMutation,
  useInitiateSegmentationMutation,
} from 'store/api/crm/customer-segmentation/customerSegmentationApi'
import { useGetAllQuery, useGetSegmentClientsQuery } from 'store/api/crm/contact-leads/leadApis'
// config
import { PIVOTPOINT_API } from 'config'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// asset
import avatarPlaceholder from 'public/avatar_placeholder.png'
// sections
import LeadPreview from 'sections/dashboard/crm/contacts-leads/lead/list/LeadPreview'
// component
import {
  RowSelectionState,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Icon } from '@iconify/react'
import {
  AlertDialog,
  Backdrop,
  Badge,
  Button,
  Card,
  Dialog,
  IconButton,
  LoadingIndicator,
  Select,
  TextField,
  Tooltip,
} from 'components'
import CreateEditSegmentForm from './CreateEditSegmentForm'

export default function SegmentDetails({ segment }: { segment: Segment | null }) {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const dispatch = useAppDispatch()
  const { push } = useRouter()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openEditSegmentDialog, setOpenEditSegmentDialog] = useState(false)
  const [openAddLeadsDialog, setOpenAddLeadsDialog] = useState(false)
  const [openInitiateDialog, setOpenInitiateDialog] = useState(false)
  // Pogination
  const { PageSize, PageNumber } = useAppSelector((state) => state.paggination)
  // Filters
  const [searchValue, setSearchValue] = useState('')
  // Query Params
  const [SearchTerm, setSearchTerm] = useState<string | undefined>(undefined)

  // Queries
  const {
    data: segmentLeads,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetSegmentClientsQuery(
    {
      id: segment?.id || '',
      SearchTerm,
      PageNumber,
      PageSize,
    },
    { refetchOnMountOrArgChange: true }
  )
  const {
    data: leads,
    isLoading: isLeadsLoading,
    isSuccess: isLeadsSuccess,
  } = useGetAllQuery({ searchTerm: SearchTerm }, { refetchOnMountOrArgChange: true })

  // Mutations
  const [
    deleteSegment,
    { isError: isDeleteError, isLoading: isDeleteLoading, isSuccess: isDeleteSuccess },
  ] = useDeleteSegmentMutation()
  const [addClient, { isError: isAddClientError, isLoading: isAddClientLoading }] =
    useAddClientToSegmentMutation()
  const [initiateSegmentation, { isLoading: isSegmentationLoading }] =
    useInitiateSegmentationMutation()

  const columnHelper = createColumnHelper<SegmentClient>()

  const columns = [
    columnHelper.accessor((row) => ({ fullName: row.fullName, imageFile: row.imageFile }), {
      id: 'fullName',
      header: () => t('Full Name'),
      cell: (info) => (
        <div className='flex items-center gap-2'>
          <div className='h-12 w-12'>
            <Image
              alt='avatar'
              width={46}
              height={46}
              src={
                info.getValue().imageFile
                  ? `${PIVOTPOINT_API.crmPicUrl}/${info.getValue().imageFile}`
                  : avatarPlaceholder.src
              }
              className='aspect-square h-12 w-12 rounded-full object-cover'
            />
          </div>
          <p>{info.getValue().fullName}</p>
        </div>
      ),
    }),
    columnHelper.accessor('incomeK', {
      id: 'incomeK ',
      header: () => t('Income'),
      cell: (incomeK) => (
        <p>
          {incomeK.getValue()} {t('Da')}
        </p>
      ),
    }),
    columnHelper.accessor('spendingScore', {
      id: 'spendingScore ',
      header: () => t('Spending Score'),
      cell: (spendingScore) => <p>{spendingScore.getValue()}</p>,
    }),
    columnHelper.accessor('priority', {
      id: 'priority ',
      header: () => t('Priority'),
      cell: (priority) => {
        if (priority.getValue() === 1)
          return <Badge variant='ghost' intent='success' size='small' label={t('Low')} />
        if (priority.getValue() === 2)
          return <Badge variant='ghost' intent='warning' size='small' label={t('Medium')} />
        if (priority.getValue() === 3)
          return <Badge variant='ghost' intent='error' size='small' label={t('High')} />

        return <Badge variant='ghost' intent='info' size='small' label={t('Unassined')} />
      },
    }),
    columnHelper.accessor((row) => row, {
      id: 'actions ',
      size: 1,
      enableSorting: false,
      header: () => <p className='w-full text-right'>{t('Actions')}</p>,
      cell: (lead) => (
        <div className='flex items-center justify-end gap-2'>
          <Tooltip title={t('View Details')} side='bottom'>
            <IconButton
              onClick={() => push(PATH_DASHBOARD.crm['contacts-leads'].lead(lead.getValue().id))}
            >
              <Icon icon='mingcute:external-link-fill' height={18} />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('Delete From Segment')} side='bottom'>
            <IconButton>
              <Icon icon='ic:round-delete' className='text-red-500 dark:text-red-400' height={18} />
            </IconButton>
          </Tooltip>
        </div>
      ),
    }),
  ]

  const table = useReactTable({
    defaultColumn: {
      minSize: 0,
      size: 0,
    },
    data: segmentLeads?.data || [],
    columns,
    state: {
      rowSelection,
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  })

  useEffect(() => {
    if (isDeleteError) {
      open({
        message: t('A problem has occured.'),
        type: 'error',
        variant: 'contained',
      })
    }
    if (isDeleteSuccess) {
      open({
        message: t('Segment Deleted Successfully.'),
        type: 'success',
        variant: 'contained',
      })
    }
  }, [isDeleteError, isDeleteSuccess, isDeleteLoading])

  useEffect(() => {
    if (isAddClientError) {
      open({
        message: t('A problem has occured.'),
        autoHideDuration: 4000,
        type: 'error',
        variant: 'contained',
      })
    }
  }, [isAddClientError])

  return (
    <div>
      {segment ? (
        <>
          {' '}
          <div className='flex w-full flex-col items-center justify-between gap-2 md:flex-row'>
            <h1 className='text-xl font-medium capitalize md:self-start'>
              <span className='text-gray-600 dark:text-gray-400'>{t('Current Segment')}</span> :{' '}
              {segment?.segmentName}
            </h1>
            <div className='flex max-w-full items-center gap-2'>
              <Button
                variant='outlined'
                intent='error'
                startIcon={<Icon icon='ic:round-delete' height={18} />}
                onClick={() => setOpenDeleteDialog(true)}
              >
                {t('Delete')}
              </Button>
              <Button
                variant='outlined'
                intent='default'
                startIcon={<Icon icon='material-symbols:edit' height={18} />}
                onClick={() => setOpenEditSegmentDialog(true)}
              >
                {t('Edit')}
              </Button>
              <Button
                variant='outlined'
                intent='default'
                startIcon={<Icon icon='ic:round-add' height={18} />}
                onClick={() => {
                  setOpenAddLeadsDialog(true)
                  setSearchTerm('')
                }}
              >
                {t('Add Lead')}
              </Button>
              <Button
                variant='outlined'
                intent='primary'
                startIcon={<Icon icon='ic:round-rocket-launch' height={18} />}
                onClick={() => {
                  setOpenInitiateDialog(true)
                }}
              >
                {t('Initiate Segmentation')}
              </Button>
            </div>
          </div>
          <Card fullWidth className='mb-10 mt-4 overflow-hidden'>
            <div className='flex items-center justify-center gap-6 p-3 '>
              <TextField
                placeholder={t('Search...')}
                endAdornment={
                  <IconButton
                    onClick={() => setSearchTerm(searchValue === '' ? undefined : searchValue)}
                  >
                    <Icon icon='ion:search-outline' height={18} className='text-gray-500' />
                  </IconButton>
                }
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className='flex h-full'
                onKeyDown={(e) => {
                  if (e.key === 'Enter')
                    setSearchTerm(e.currentTarget.value === '' ? undefined : e.currentTarget.value)
                }}
              />
            </div>
            {isLoading || isFetching ? (
              <div className='flex h-56 w-full items-center justify-center'>
                <LoadingIndicator />
              </div>
            ) : (
              <>
                {isSuccess && segmentLeads?.data.length > 0 ? (
                  <>
                    <div className='w-full overflow-x-scroll'>
                      <div className='w-max min-w-full'>
                        <table className='w-full'>
                          <thead className='bg-gray-100 ltr:text-left rtl:text-right dark:!bg-paper-dark-contrast dark:text-white'>
                            {table.getHeaderGroups().map((headerGroup) => (
                              <tr key={headerGroup.id} className='border-none text-sm'>
                                {headerGroup.headers.map((header) => (
                                  <th
                                    key={header.id}
                                    className='whitespace-nowrap p-4 text-sm font-semibold'
                                    style={{
                                      width: header.getSize() !== 0 ? header.getSize() : undefined,
                                    }}
                                  >
                                    {header.isPlaceholder ? null : (
                                      <div
                                        {...{
                                          className: header.column.getCanSort()
                                            ? 'cursor-pointer select-none flex items-center gap-2'
                                            : '',
                                          onClick: header.column.getToggleSortingHandler(),
                                        }}
                                      >
                                        {flexRender(
                                          header.column.columnDef.header,
                                          header.getContext()
                                        )}
                                        {{
                                          asc: (
                                            <Icon
                                              icon='material-symbols:arrow-drop-up-rounded'
                                              fontSize={24}
                                            />
                                          ),
                                          desc: (
                                            <Icon
                                              icon='material-symbols:arrow-drop-down-rounded'
                                              fontSize={24}
                                            />
                                          ),
                                        }[header.column.getIsSorted() as string] ?? null}
                                      </div>
                                    )}
                                  </th>
                                ))}
                              </tr>
                            ))}
                          </thead>
                          <tbody>
                            {table.getRowModel().rows.map((row) => (
                              <tr
                                key={row.id}
                                className={clsx(
                                  'cursor-pointer border-b last-of-type:border-b-0 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-paper-hover-dark',
                                  row.getIsSelected() && 'bg-gray-50 dark:bg-paper-hover-dark/80'
                                )}
                              >
                                {row.getVisibleCells().map((cell) => (
                                  <td
                                    key={cell.id}
                                    className='px-4 py-2'
                                    style={{
                                      width:
                                        cell.column.getSize() !== 0
                                          ? cell.column.getSize()
                                          : undefined,
                                    }}
                                  >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className='flex w-max min-w-full items-center justify-end divide-x border-t p-4 rtl:divide-x-reverse dark:divide-gray-600 dark:border-gray-600'>
                          <div className='flex items-center justify-center gap-2 px-2'>
                            <p className='text-sm'>{t('Row per page : ')}</p>
                            <Select
                              items={['10', '25', '50'].map((item) => ({
                                label: item,
                                value: item,
                              }))}
                              onValueChange={(page) => dispatch(changePageSize(Number(page)))}
                              value={String(PageSize)}
                              buttonProps={{ intent: 'default' }}
                            />
                          </div>
                          <div className='flex h-full items-center justify-center gap-2 p-2 '>
                            <p className='text-sm'>
                              {(segmentLeads.pageNumber - 1) * (segmentLeads.pageSize + 1) === 0
                                ? 1
                                : (segmentLeads.pageNumber - 1) * (segmentLeads.pageSize + 1)}{' '}
                              -{' '}
                              {min([
                                segmentLeads.pageNumber * segmentLeads.pageSize,
                                segmentLeads.totalRecords,
                              ])}{' '}
                              {t('of')} {segmentLeads.totalRecords}
                            </p>
                          </div>
                          <div className='flex items-center justify-center gap-2 px-2'>
                            <Tooltip side='bottom' title={t('First page')}>
                              <IconButton
                                className='border dark:border-gray-600'
                                onClick={() => dispatch(changePageNumber(1))}
                                disabled={PageNumber === 1}
                              >
                                <Icon
                                  icon='fluent:chevron-double-left-20-filled'
                                  className='rtl:rotate-180'
                                />
                              </IconButton>
                            </Tooltip>
                            <Tooltip side='bottom' title={t('Previous page')}>
                              <IconButton
                                className='border dark:border-gray-600'
                                onClick={() =>
                                  dispatch(changePageNumber(PageNumber > 1 ? PageNumber - 1 : 1))
                                }
                                disabled={PageNumber === 1}
                              >
                                <Icon
                                  icon='fluent:chevron-left-20-filled'
                                  className='rtl:rotate-180'
                                />
                              </IconButton>
                            </Tooltip>
                            <p className='text-sm'>
                              {t('Page')} {PageNumber} {t('of')} {segmentLeads.totalPages}
                            </p>
                            <Tooltip side='bottom' title={t('Next page')}>
                              <IconButton
                                className='border dark:border-gray-600'
                                onClick={() =>
                                  dispatch(
                                    changePageNumber(
                                      PageNumber < segmentLeads.totalPages
                                        ? PageNumber + 1
                                        : segmentLeads.totalPages
                                    )
                                  )
                                }
                                disabled={PageNumber === segmentLeads.totalPages}
                              >
                                <Icon
                                  icon='fluent:chevron-right-20-filled'
                                  className='rtl:rotate-180'
                                />
                              </IconButton>
                            </Tooltip>
                            <Tooltip side='bottom' title={t('Last page')}>
                              <IconButton
                                className='border dark:border-gray-600'
                                onClick={() => dispatch(changePageNumber(segmentLeads.totalPages))}
                                disabled={PageNumber === segmentLeads.totalPages}
                              >
                                <Icon
                                  icon='fluent:chevron-double-right-20-filled'
                                  className='rtl:rotate-180'
                                />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                      {/* <SegmentLeadTableToolbar
                      selectedCount={Object.keys(rowSelection).length}
                      selectedIds={selectedIds}
                      setRowSelection={setRowSelection}
                    /> */}
                      <LeadPreview />
                    </div>
                  </>
                ) : (
                  <div className='flex h-56 flex-col items-center justify-center gap-2 px-4 py-2'>
                    <h1 className='text-xl font-semibold'>{t('No Lead Found')}</h1>
                  </div>
                )}
              </>
            )}
          </Card>
        </>
      ) : (
        <div className='flex h-full w-full items-center justify-center'>
          <h1 className='text-xl font-semibold text-red-500 dark:text-red-400'>
            {t('No Segment Selected')}
          </h1>
        </div>
      )}
      {/* Edit Segment Dialog */}
      <Dialog open={openEditSegmentDialog} title={t('Edit Segment')}>
        <CreateEditSegmentForm
          currentSegment={segment}
          isEdit={true}
          onSuccess={() => {
            setOpenEditSegmentDialog(false)
          }}
          onFailure={() => {
            setOpenEditSegmentDialog(false)
          }}
        />
      </Dialog>
      {/* Add Client Dialog */}
      <Dialog
        open={openAddLeadsDialog}
        title={t('Add Leads to Segment')}
        handleClose={() => {
          setOpenAddLeadsDialog(false)
          setSearchTerm('')
        }}
      >
        <div className='flex flex-col items-center  justify-center gap-2 py-2'>
          <TextField
            placeholder={t('Search...')}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter')
                setSearchTerm(e.currentTarget.value === '' ? undefined : e.currentTarget.value)
            }}
            endAdornment={
              <IconButton
                onClick={() => setSearchTerm(searchValue === '' ? undefined : searchValue)}
              >
                <Icon icon='ion:search-outline' height={18} className='text-gray-500' />
              </IconButton>
            }
          />
          {isLeadsLoading ? (
            <LoadingIndicator />
          ) : (
            <>
              {isLeadsSuccess && leads.data.length > 0 ? (
                <div className='w-full divide-y dark:divide-gray-600'>
                  {leads.data.map((lead) => (
                    <div className='flex w-full items-center justify-between py-2'>
                      <div className='flex items-center gap-2'>
                        <Image
                          alt='avatar'
                          width={46}
                          height={46}
                          src={
                            lead.imageFile
                              ? `${PIVOTPOINT_API.crmPicUrl}/${lead.imageFile}`
                              : avatarPlaceholder.src
                          }
                          className='aspect-square rounded-full object-cover'
                        />
                        <div>
                          <p>{lead.fullName}</p>
                          <p className='text-xs text-gray-600 dark:text-gray-400'>
                            {lead.isContact ? t('Contact') : t('Lead')}
                          </p>
                        </div>
                      </div>
                      <Button
                        intent={
                          !segmentLeads?.data.every((item) => item.id !== lead.id)
                            ? 'secondary'
                            : 'primary'
                        }
                        startIcon={
                          <Icon
                            icon={
                              !segmentLeads?.data.every((item) => item.id !== lead.id)
                                ? 'ic:round-check'
                                : 'ic:round-add'
                            }
                            height={24}
                          />
                        }
                        variant='text'
                        size='small'
                        onClick={
                          segmentLeads?.data.every((item) => item.id !== lead.id)
                            ? () =>
                                addClient({
                                  segmentId: segment?.id || '',
                                  client: lead,
                                  PageNumber,
                                  PageSize,
                                })
                            : () => {}
                        }
                      >
                        {!segmentLeads?.data.every((item) => item.id !== lead.id)
                          ? t('Added')
                          : t('Add')}
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <h1 className='py-5 text-xl'>{t('No Leads Found')}</h1>
              )}
            </>
          )}
        </div>
      </Dialog>
      {/* Delete Segment Alert Dialog */}
      <AlertDialog
        title={t('Confirm Delete')}
        description={
          <p className='mb-4 text-sm text-red-600 dark:text-red-400'>
            {t('This action cannot be undone. this segment will be permanently deleted.')}
          </p>
        }
        cancelText={t('Cancel')}
        confirmText={t('Yes, Delete')}
        onConfirm={() => {
          if (segment) {
            deleteSegment(segment.id)
            setOpenDeleteDialog(false)
          }
        }}
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        buttonProps={{ intent: 'error' }}
      />
      {/* Initiate Segment Alert Dialog */}
      <AlertDialog
        title={t('Confirm Initiation')}
        description={
          <p className='my-4 text-sm text-primary-700 dark:text-primary-400'>
            {t(
              'Customer segmentation process will initiate, unlocking insights, personalizing experiences, and driving business growth.'
            )}
          </p>
        }
        cancelText={t('Cancel')}
        confirmText={t("Let's Start")}
        onConfirm={() => {
          setOpenInitiateDialog(false)
          initiateSegmentation()
            .then(() =>
              open({
                message: t('Client Segmentation Initiated.'),
                type: 'success',
                variant: 'contained',
              })
            )
            .catch(() =>
              open({
                message: t('A problem has occured.'),
                type: 'error',
                variant: 'contained',
              })
            )
        }}
        open={openInitiateDialog}
        onClose={() => setOpenInitiateDialog(false)}
      />
      <Backdrop
        open={isAddClientLoading || isSegmentationLoading}
        loading={isAddClientLoading || isSegmentationLoading}
      />
    </div>
  )
}
