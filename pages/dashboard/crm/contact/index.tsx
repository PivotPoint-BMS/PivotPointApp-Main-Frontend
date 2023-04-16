import { ReactNode, useEffect, useState } from 'react'
// next
import Head from 'next/head'
import { useRouter } from 'next/router'
// hooks
import useTranslate from 'hooks/useTranslate'
// types
import { Lead } from 'types'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// components
import DataTable, { TableColumn } from 'react-data-table-component'
import { Icon as Iconify } from '@iconify/react'
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs'
import Card from '@/components/Card'
import Checkbox from '@/components/Checkbox'
import TextField from '@/components/TextField'
import Button from '@/components/Button'
import ToggleGroup from '@/components/ToggleGroup'
import IconButton from '@/components/IconButton'

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

export default function index() {
  const { t } = useTranslate()
  const { push, pathname, query } = useRouter()
  const [view, setView] = useState(query?.view ? (query?.view as string) : 'list')

  useEffect(() => {
    push(pathname, { query: { view } })
  }, [pathname, view])

  return (
    <>
      <Head>
        <title>{t('Contact & Lead')} | Pivot Point BMS</title>
      </Head>
      <div className='flex max-w-full flex-col overflow-hidden px-5'>
        <HeaderBreadcrumbs
          heading={t('Contact & Lead')}
          links={[
            { name: t('Dashboard'), href: PATH_DASHBOARD.root },
            { name: t('Customer Relationship'), href: PATH_DASHBOARD.crm.root },
            { name: t('Lead') },
          ]}
          action={
            <div className='flex items-center justify-center gap-5'>
              <ToggleGroup
                type='single'
                settings={[
                  {
                    icon: 'material-symbols:format-list-bulleted',
                    label: 'List',
                    value: 'list',
                  },
                  {
                    icon: 'tabler:layout-kanban',
                    label: 'Kanban',
                    value: 'kanban',
                  },
                ]}
                value={view}
                onValueChange={(value) => {
                  if (value.length > 0) setView(value)
                }}
              />
              <Button startIcon={<Iconify icon='ic:round-add' height={24} />}>
                {t('Create Contact')}
              </Button>
            </div>
          }
        />
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
              sortIcon={<Iconify icon='typcn:arrow-sorted-down' />}
            />
          </div>
        </Card>
      </div>
    </>
  )
}
