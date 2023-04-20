import React, { ReactNode, useState } from 'react'
// hooks
import useTranslate from 'hooks/useTranslate'
// redux
import { useAppDispatch } from 'store/hooks'
import { previewContact } from 'store/slices/contactPreviewSlice'
// types
import { Contact } from 'types'
// asset
import avatarPlaceholder from 'public/avatar_placeholder.png'
// components
import DataTable, { TableColumn } from 'react-data-table-component'
import { Icon as Iconify } from '@iconify/react'
import Image from '@/components/Image'
import Badge from '@/components/Badge'
import TextField from '@/components/TextField'
import Button from '@/components/Button'
import Checkbox from '@/components/Checkbox'
import ContactTableToolbar from './ContactTableToolbar'
import DropdownMenu from '@/components/DropdownMenu'
import IconButton from '@/components/IconButton'
import ContactPreview from './ContactPreview'

const columns: TableColumn<Contact>[] = [
  {
    name: 'Contact Name',
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

        <p className='text-sm font-medium'>{fullName}</p>
      </div>
    ),
    grow: 1.5,
    sortable: true,
    reorder: true,
  },
  {
    name: 'Contact',
    cell: ({ email, phoneNumber }) => (
      <div className='flex w-full flex-col gap-2 truncate py-2'>
        <p className='hyphens  flex items-center gap-1 truncate'>
          <div>
            <Iconify icon='material-symbols:mail-rounded' height={18} className='text-gray-500' />{' '}
          </div>
          <span className='truncate'>{email} </span>
        </p>
        <p className='flex items-center gap-1 truncate'>
          <div>
            <Iconify icon='material-symbols:call' height={18} className='text-gray-500' />{' '}
          </div>
          <span className='truncate'>{phoneNumber} </span>
        </p>
      </div>
    ),
    sortable: true,
    reorder: true,
    grow: 2,
  },
  {
    name: 'Contact status',
    cell: ({ status }) => {
      if (status === 0) return <Badge variant='ghost' intent='info' size='medium' label='New' />
      if (status === 1) return <Badge variant='ghost' intent='warning' size='medium' label='Open' />
      if (status === 2)
        return <Badge variant='ghost' intent='secondary' size='medium' label='In Progress' />
      return <Badge variant='ghost' size='medium' label='Closed' />
    },
    sortable: true,
    reorder: true,
    grow: 0.8,
  },
  {
    name: 'Contact Source',
    cell: ({ source }) =>
      source?.source ? (
        <Badge
          variant='ghost'
          intent='default'
          size='medium'
          label={source?.source}
          className='capitalize'
        />
      ) : (
        <Badge variant='ghost' intent='error' size='medium' label='None' />
      ),
    sortable: true,
    reorder: true,
  },
  {
    right: true,
    cell: () => (
      <DropdownMenu
        trigger={
          <IconButton>
            <Iconify icon='material-symbols:more-vert' height={20} />
          </IconButton>
        }
        items={[
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

const data: Contact[] = [
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
]

export default function ContactsList() {
  const { t } = useTranslate()
  const dispatch = useAppDispatch()
  const [selectedRows, setSelectedRows] = useState<Contact[]>([])
  const [selectedCount, setSelectedCount] = useState(0)

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
          onRowDoubleClicked={(contact) => dispatch(previewContact(contact))}
        />
      </div>
      <ContactTableToolbar selectedCount={selectedCount} />
      <ContactPreview />
    </>
  )
}
