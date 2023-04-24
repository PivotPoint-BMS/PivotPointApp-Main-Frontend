import React, { ReactNode, useState } from 'react'
// hooks
import useTranslate from 'hooks/useTranslate'
// redux
import { useAppDispatch } from 'store/hooks'
import { previewLead } from 'store/slices/leadPreviewSlice'
// types
import { Lead } from 'types'
// asset
import avatarPlaceholder from 'public/avatar_placeholder.png'
// components
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

const data: Lead[] = [
  {
    id: '1',
    fullName: 'Guendoui Yaniss',
    phoneNumber: '0542662874',
    status: 0,
    email: 'guendouizyaniss@gmail.com',
    source: {
      source: 'store',
    },
  },
  {
    id: '2',
    fullName: 'Zairi Aimen',
    phoneNumber: '0542662874',
    status: 1,
    email: 'zairiaimen@gmail.com',
  },
  {
    id: '3',
    fullName: 'Zairi Aimen',
    phoneNumber: '0542662874',
    status: 2,
    email: 'zairiaimen@gmail.com',
    source: {
      source: 'store',
    },
  },
  {
    id: '1',
    fullName: 'Guendoui Yaniss',
    phoneNumber: '0542662874',
    status: 4,
    email: 'guendouizyaniss@gmail.com',
    source: {
      source: 'store',
    },
  },
  {
    id: '1',
    fullName: 'Guendoui Yaniss',
    phoneNumber: '0542662874',
    status: 5,
    email: 'guendouizyaniss@gmail.com',
    source: {
      source: 'store',
    },
  },
  {
    id: '1',
    fullName: 'Guendoui Yaniss',
    phoneNumber: '0542662874',
    status: 6,
    email: 'guendouizyaniss@gmail.com',
    source: {
      source: 'store',
    },
  },
]

export default function LeadsList() {
  const { t } = useTranslate()
  const dispatch = useAppDispatch()
  const [selectedRows, setSelectedRows] = useState<Lead[]>([])
  const [selectedCount, setSelectedCount] = useState(0)
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
      right: true,
      cell: (lead) => (
        <DropdownMenu
          trigger={
            <IconButton>
              <Iconify icon='material-symbols:more-vert' height={20} />
            </IconButton>
          }
          items={[
            {
              type: 'button',
              label: 'Preview',
              icon: <Iconify icon='material-symbols:preview' height={18} />,
              onClick: () => dispatch(previewLead(lead)),
            },
            {
              type: 'button',
              label: 'View Details',
              icon: <Iconify icon='mingcute:external-link-fill' height={18} />,
            },
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
      ),
    },
  ]

  return (
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
      </div>
      <LeadTableToolbar selectedCount={selectedCount} />
      <LeadPreview />
    </>
  )
}
