import React, { ReactNode } from 'react'
// hooks
import useTranslate from 'hooks/useTranslate'
// types
import { Lead } from 'types'
// components
import DataTable, { TableColumn } from 'react-data-table-component'
import { Icon as Iconify } from '@iconify/react'
import TextField from '@/components/TextField'
import Button from '@/components/Button'
import IconButton from '@/components/IconButton'
import Checkbox from '@/components/Checkbox'

const columns: TableColumn<Lead>[] = [
  {
    name: 'Lead Name',
    selector: (row) => row.FullName,
    sortable: true,
    reorder: true,
  },
  {
    name: 'Contact',
    cell: ({ Email, PhoneNumber }) => (
      <div>
        {Email} {PhoneNumber}
      </div>
    ),
    sortable: true,
    reorder: true,
  },
  {
    name: 'Lead Status',
    selector: (row) => row.Status,
    sortable: true,
    reorder: true,
  },
  {
    name: 'Lead Source',
    selector: (row) => (row.Email ? row.Email : 'None'),
    sortable: true,
    reorder: true,
  },
  {
    right: true,
    cell: () => (
      <IconButton>
        <Iconify icon='material-symbols:more-vert' height={20} />
      </IconButton>
    ),
  },
]

const data: Lead[] = [
  {
    id: 1,
    FullName: 'Guendoui Yaniss',
    PhoneNumber: '0542662874',
    Status: 1,
  },
  {
    id: 2,
    FullName: 'Zairi Aimen',
    PhoneNumber: '0542662874',
    Status: 1,
  },
]

export default function LeadsList() {
  const { t } = useTranslate()
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
          size='large'
          variant='outlined'
          intent='default'
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
          selectableRowsComponent={Checkbox as unknown as ReactNode}
          sortIcon={<Iconify icon='typcn:arrow-sorted-down' />}
        />
      </div>
    </>
  )
}
