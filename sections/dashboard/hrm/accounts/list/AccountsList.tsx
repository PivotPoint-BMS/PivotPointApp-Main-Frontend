import React, { ReactNode, useEffect, useState } from 'react'
// hooks
import useTranslate from 'hooks/useTranslate'
// types
import { Account } from 'types'
// asset
// components
import DataTable, { TableColumn } from 'react-data-table-component'
import { Icon as Iconify } from '@iconify/react'
import TextField from 'components/TextField'
import Button from 'components/Button'
import IconButton from 'components/IconButton'
import Checkbox from 'components/Checkbox'
import DropdownMenu from 'components/DropdownMenu'
import Tooltip from 'components/Tooltip'

export default function AccountsList() {
  const { t } = useTranslate()
  const [selectedRows, setSelectedRows] = useState<Account[]>([])
  const [selectedCount, setSelectedCount] = useState(0)

  const columns: TableColumn<Account>[] = [
    {
      name: 'Full Name',
      cell: ({ firstName, lastName }) => (
        <p className='font-small text-sm'>{`${firstName} ${lastName}`}</p>
      ),
      grow: 1.5,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Email',
      cell: ({ email }) => <p className='hyphens  flex items-center gap-1 truncate'>{email} </p>,
      sortable: true,
      reorder: true,
      grow: 2,
    },
    {
      name: 'Phone Number',
      cell: ({ phoneNumber }) => (
        <p className='hyphens flex items-center gap-1 truncate'>{phoneNumber} </p>
      ),
      sortable: true,
      reorder: true,
      grow: 2,
    },

    {
      name: t('Actions'),
      right: true,
      cell: () => (
        <div className='flex items-center gap-2'>
          <Tooltip title={t('View Details')} side='bottom'>
            <IconButton>
              <Iconify icon='mingcute:external-link-fill' height={18} />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('Preview')} side='bottom'>
            <IconButton>
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
              },
              {
                type: 'button',
                label: t('Delete'),
                icon: <Iconify icon='material-symbols:delete-rounded' height={18} />,
                className: 'text-red-600',
              },
            ]}
          />
        </div>
      ),
    },
  ]

  const data: Account[] = [
    {
      email: 'guendouziyaniss@gmail.com',
      firstName: 'Yaniss',
      lastName: 'Guendouzi',
      id: '111',
      password: '1111',
      phoneNumber: '0776575067',
    },
  ]

  useEffect(() => {
    console.log(selectedRows)
    console.log(selectedCount)
  }, [selectedRows, selectedCount])

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
        />
        {/* <AccountTableToolbar selectedCount={selectedCount} />
        <AccountPreview /> */}
      </div>
    </>
  )
}
