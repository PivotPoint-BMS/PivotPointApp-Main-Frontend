import React, { ReactNode } from 'react'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import DataTable, { TableColumn } from 'react-data-table-component'
import { Icon as Iconify } from '@iconify/react'
import Card from '@/components/Card'
import Button from '@/components/Button'
import TextField from '@/components/TextField'
import Checkbox from '@/components/Checkbox'

const columns: TableColumn<{ id: number; title: string; year: string }>[] = [
  {
    name: 'Lead Name',
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: 'Contact',
    selector: (row) => row.year,
    sortable: true,
  },
  {
    name: 'Lead Status',
    selector: (row) => row.year,
    sortable: true,
  },
  {
    name: 'Lead Source',
    selector: (row) => row.year,
    sortable: true,
  },
]

const data = [
  {
    id: 1,
    title: 'Beetlejuice',
    year: '1988',
  },
  {
    id: 2,
    title: 'Ghostbusters',
    year: '1984',
  },
]

export default function DealsList() {
  const { t } = useTranslate()
  return (
    <Card fullWidth className='overflow-hidden'>
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
          onColumnOrderChange={(cols) => console.log(cols)}
        />
      </div>
    </Card>
  )
}
