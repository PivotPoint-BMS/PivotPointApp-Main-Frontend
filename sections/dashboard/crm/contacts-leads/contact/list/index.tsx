/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { HTMLProps, useEffect, useRef, useState } from 'react'
import { min } from 'lodash'
import clsx from 'clsx'
// next
import { useRouter } from 'next/router'
import Image from 'next/image'
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
  useGetContactsQuery,
} from 'store/api/crm/contact-leads/leadApis'
import { useGetLeadSourcesQuery } from 'store/api/crm/contact-leads/leadSourceApi'
// config
import { LEAD_PRIORITIES, PIVOTPOINT_API } from 'config'
// types
import { Lead } from 'types'
// asset
import avatarPlaceholder from 'public/avatar_placeholder.png'
// components
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  RowSelectionState,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table'
import Select from 'react-select'
import {
  AlertDialog,
  Backdrop,
  LoadingIndicator,
  IconButton,
  Popover,
  Button,
  TextField,
  Badge,
  DropdownMenu,
  Tooltip,
  Select as MySelect,
} from 'components'
import { Icon, Icon as Iconify } from '@iconify/react'
import ContactTableToolbar from './ContactTableToolbar'
import ContactPreview from './ContactPreview'

function IndeterminateCheckbox({
  indeterminate,
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof indeterminate === 'boolean' && ref.current) {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate])

  return (
    <label className='checkbox-container'>
      <input
        {...rest}
        ref={ref}
        type='checkbox'
        className='absolute h-0 w-0 cursor-pointer opacity-0'
      />
      <span className='checkbox-checkmark'>
        <Iconify
          icon='material-symbols:check-small-rounded'
          className='checkbox-checked h-5 w-5 self-center'
        />
        <Iconify
          icon='material-symbols:check-indeterminate-small-rounded'
          className='checkbox-indeterminate h-5 w-5 self-center'
        />
      </span>
    </label>
  )
}

export default function LeadsList() {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const dispatch = useAppDispatch()
  const { push, isFallback } = useRouter()
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [idToDelete, setIdToDelete] = useState<string | null>(null)
  const [sourcesList, setSourcesList] = useState<{ value: string; label: string }[]>([])
  // Pogination
  const [PageNumber, setPageNumber] = useState(1)
  const [PageSize, setPageSize] = useState(10)
  // Filters
  const [searchValue, setSearchValue] = useState('')
  const [source, setSource] = useState<{ value: string; label: string } | null>(null)
  const [selectedPriority, setSelectedPriority] = useState<{ value: string; label: string } | null>(
    null
  )
  // Query Params
  const [SearchTerm, setSearchTerm] = useState<string | undefined>(undefined)
  const [filters, setFilters] = useState<{
    LeadSourceId: string | undefined
    LeadPriority: 0 | 1 | 2 | 3 | undefined
  }>({ LeadSourceId: undefined, LeadPriority: undefined })

  // Queries
  const { data, isLoading, isSuccess, isFetching } = useGetContactsQuery(
    {
      SearchTerm,
      ...filters,
      PageNumber,
      PageSize,
    },
    { skip: isFallback, refetchOnMountOrArgChange: true }
  )
  const {
    data: sources,
    isLoading: isSourcesLoading,
    isSuccess: isSourcesSuccess,
  } = useGetLeadSourcesQuery({
    PageNumber: undefined,
    PageSize: undefined,
  })

  // Mutation
  const [
    deleteLead,
    { isLoading: isDeleteLeading, isError: isDeleteError, isSuccess: isDeleteSuccess },
  ] = useDeleteLeadMutation()

  const columnHelper = createColumnHelper<Lead>()

  const columns = [
    columnHelper.accessor((row) => ({ fullName: row.fullName, picture: row.picture }), {
      id: 'select',
      enableSorting: false,
      size: 24,
      header: ({ table }) => (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      ),
    }),
    columnHelper.accessor((row) => ({ fullName: row.fullName, picture: row.picture }), {
      id: 'fullName',
      header: () => t('Full Name'),
      cell: (info) => (
        <div className='flex items-center gap-2'>
          <div className='h-12 w-12'>
            <Image
              alt='avatar'
              width={48}
              height={48}
              src={
                info.getValue().picture
                  ? `${PIVOTPOINT_API.crmPicUrl}/${info.getValue().picture}`
                  : avatarPlaceholder.src
              }
              className='aspect-square h-12 w-12 rounded-full object-cover'
            />
          </div>
          <p>{info.getValue().fullName}</p>
        </div>
      ),
    }),
    columnHelper.accessor((row) => ({ email: row.email, phoneNumber: row.phoneNumber }), {
      id: 'contact',
      header: () => t('Contact'),
      cell: (info) => (
        <div className='flex flex-col gap-2'>
          <p className='hyphens  flex items-center gap-1 truncate text-sm'>
            <Iconify icon='material-symbols:mail-rounded' height={18} className='text-gray-500' />{' '}
            {info.getValue().email}{' '}
          </p>
          <p className='flex items-center gap-1 truncate text-sm'>
            <Iconify icon='material-symbols:call' height={18} className='text-gray-500' />{' '}
            {info.getValue().phoneNumber}{' '}
          </p>
        </div>
      ),
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
    columnHelper.accessor('leadSource', {
      id: 'leadSource ',
      header: () => t('Source'),
      cell: (leadSource) =>
        leadSource.getValue().source ? (
          <Badge
            variant='ghost'
            intent='default'
            size='small'
            label={leadSource.getValue().source}
            className='capitalize'
          />
        ) : (
          <Badge variant='ghost' intent='error' size='small' label={t('None')} />
        ),
    }),
    columnHelper.accessor((row) => row, {
      id: 'actions ',
      size: 50,
      enableSorting: false,
      header: () => <p className='w-full text-right'>{t('Actions')}</p>,
      cell: (lead) => (
        <div className='flex items-center justify-end gap-2'>
          <Tooltip title={t('View Details')} side='bottom'>
            <IconButton
              onClick={() => push(PATH_DASHBOARD.crm['contacts-leads'].lead(lead.getValue().id))}
            >
              <Iconify icon='mingcute:external-link-fill' height={18} />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('Preview')} side='bottom'>
            <IconButton onClick={() => dispatch(previewLead(lead.getValue()))}>
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
                label: t('Edit'),
                icon: <Iconify icon='material-symbols:edit' height={18} />,
                onClick: () => push(PATH_DASHBOARD.crm['contacts-leads'].edit(lead.getValue().id)),
              },
              {
                type: 'button',
                label: t('Delete'),
                icon: <Iconify icon='material-symbols:delete-rounded' height={18} />,
                className: 'text-red-600 dark:text-red-400 rtl:flex-row-reverse',
                onClick: () => setIdToDelete(lead.getValue().id),
              },
            ]}
          />
        </div>
      ),
    }),
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
        message: t('Lead Deleted Successfully.'),
        autoHideDuration: 4000,
        type: 'success',
        variant: 'contained',
      })
    }
  }, [isDeleteError, isDeleteSuccess])

  useEffect(() => {
    if (isSourcesSuccess)
      setSourcesList(
        sources.data.map((newSource) => ({
          value: newSource.id as string,
          label: newSource.source,
        }))
      )
  }, [isSourcesLoading])

  useEffect(() => {
    if (isSuccess) setPageSize(data.pageSize)
  }, [isLoading, isFetching])

  const table = useReactTable({
    defaultColumn: {
      minSize: 0,
      size: 0,
    },
    data: data?.data || [],
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
    setSelectedIds(
      data?.data
        .map((lead, i) => (Object.keys(rowSelection).includes(i.toString()) ? lead.id : ''))
        .filter((item) => item !== '') || []
    )
  }, [rowSelection])

  const handleFilter = () => {
    setFilters({
      LeadPriority: (Number(selectedPriority?.value) as 0 | 1 | 2 | 3) || undefined,
      LeadSourceId: source?.value || undefined,
    })
  }

  return (
    <>
      <div className='flex items-center justify-center gap-6 p-3 '>
        <TextField
          placeholder={t('Search...')}
          endAdornment={
            <IconButton onClick={() => setSearchTerm(searchValue)}>
              <Iconify icon='ion:search-outline' height={18} className='text-gray-500' />
            </IconButton>
          }
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className='flex h-full'
          onKeyDown={(e) => {
            if (e.key === 'Enter') setSearchTerm(e.currentTarget.value)
          }}
        />
        <Popover
          trigger={
            <Button
              variant='outlined'
              intent='default'
              size='large'
              className='h-full'
              startIcon={<Iconify icon='material-symbols:filter-list-rounded' height={20} />}
            >
              {t('Filters')}
            </Button>
          }
          align='start'
        >
          <div className='flex flex-col items-start px-2'>
            <h1 className='mb-4 font-semibold'>{t('Filters')}</h1>
            <div className='flex flex-col gap-4'>
              <div className='flex w-full flex-col items-start gap-1'>
                <label className='text-sm font-medium dark:text-white'>{t('Lead Source')}</label>
                <Select
                  options={sourcesList}
                  isLoading={isSourcesLoading}
                  onChange={(newValue) => {
                    setSource(newValue)
                  }}
                  value={source}
                  className='react-select-container'
                  classNamePrefix='react-select'
                  isClearable
                  placeholder={t('Select Source')}
                />
              </div>
              <div className='flex w-full flex-col items-start gap-1'>
                <label className='text-sm font-medium dark:text-white'>{t('Priority')}</label>
                <Select
                  options={LEAD_PRIORITIES.map((item) => ({
                    value: item.value,
                    label: t(item.label),
                  }))}
                  isLoading={isSourcesLoading}
                  onChange={(newValue) => {
                    setSelectedPriority(newValue)
                  }}
                  value={selectedPriority}
                  className='react-select-container'
                  classNamePrefix='react-select'
                  isClearable
                  placeholder={t('Select Priority')}
                />
              </div>
              <Button variant='outlined' intent='secondary' onClick={handleFilter}>
                {t('Filter')}
              </Button>
            </div>
          </div>
        </Popover>
      </div>
      {isLoading || isFetching ? (
        <div className='flex h-56 w-full items-center justify-center'>
          <LoadingIndicator />
        </div>
      ) : (
        <>
          {data?.data && data?.data.length > 0 ? (
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
                                  {flexRender(header.column.columnDef.header, header.getContext())}
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
                          onDoubleClick={() => dispatch(previewLead(row.original))}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <td
                              key={cell.id}
                              className='px-4 py-2'
                              style={{
                                width:
                                  cell.column.getSize() !== 0 ? cell.column.getSize() : undefined,
                              }}
                            >
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className='flex w-full items-center justify-end divide-x border-t p-4 rtl:divide-x-reverse dark:divide-gray-600 dark:border-gray-600'>
                    <div className='flex items-center justify-center gap-2 px-2'>
                      <p className='text-sm'>{t('Row per page : ')}</p>
                      <MySelect
                        items={['10', '25', '50'].map((item) => ({ label: item, value: item }))}
                        onValueChange={(page) => setPageSize(Number(page))}
                        value={String(PageSize)}
                        buttonProps={{ intent: 'default' }}
                      />
                    </div>
                    <div className='flex h-full items-center justify-center gap-2 p-2 '>
                      <p className='text-sm'>
                        {(data.pageNumber - 1) * (data.pageSize + 1) === 0
                          ? 1
                          : (data.pageNumber - 1) * (data.pageSize + 1)}{' '}
                        - {min([data.pageNumber * data.pageSize, data.totalRecords])} {t('of')}{' '}
                        {data.totalRecords}
                      </p>
                    </div>
                    <div className='flex items-center justify-center gap-2 px-2'>
                      <Tooltip side='bottom' title={t('First page')}>
                        <IconButton
                          className='border dark:border-gray-600'
                          onClick={() => setPageNumber(1)}
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
                          onClick={() => setPageNumber((prev) => (prev > 1 ? prev - 1 : 1))}
                          disabled={PageNumber === 1}
                        >
                          <Icon icon='fluent:chevron-left-20-filled' className='rtl:rotate-180' />
                        </IconButton>
                      </Tooltip>
                      <p className='text-sm'>
                        {t('Page')} {PageNumber} {t('of')} {data.totalPages}
                      </p>
                      <Tooltip side='bottom' title={t('Next page')}>
                        <IconButton
                          className='border dark:border-gray-600'
                          onClick={() =>
                            setPageNumber((prev) =>
                              prev < data.totalPages ? prev + 1 : data.totalPages
                            )
                          }
                          disabled={PageNumber === data.totalPages}
                        >
                          <Icon icon='fluent:chevron-right-20-filled' className='rtl:rotate-180' />
                        </IconButton>
                      </Tooltip>
                      <Tooltip side='bottom' title={t('Last page')}>
                        <IconButton
                          className='border dark:border-gray-600'
                          onClick={() => setPageNumber(data.totalPages)}
                          disabled={PageNumber === data.totalPages}
                        >
                          <Icon
                            icon='fluent:chevron-double-right-20-filled'
                            className='rtl:rotate-180'
                          />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                  <ContactTableToolbar
                    selectedCount={Object.keys(rowSelection).length}
                    selectedIds={selectedIds}
                    setRowSelection={setRowSelection}
                  />
                  <ContactPreview />
                </div>
              </div>
            </>
          ) : (
            <div className='flex h-56 flex-col items-center justify-center gap-2 px-4 py-2'>
              <h1 className='text-xl font-semibold'>{t('No Contact Found')}</h1>
            </div>
          )}
        </>
      )}
      <Backdrop loading={isDeleteLeading} />
      <AlertDialog
        title={t('Confirm Delete')}
        description={t('This action cannot be undone. This will permanently delete this contact.')}
        cancelText={t('Cancel')}
        confirmText={t('Yes, Delete')}
        onConfirm={() => {
          deleteLead(idToDelete || '')
          invalidateTags(['Leads'])
          setIdToDelete(null)
        }}
        open={idToDelete !== null}
        onClose={() => setIdToDelete(null)}
        buttonProps={{ intent: 'error' }}
      />
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  if (store.getState().session.token)
    store.dispatch(getLeads.initiate({ PageSize: 10, PageNumber: 1 }))

  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})
