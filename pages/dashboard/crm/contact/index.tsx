import { ReactNode } from 'react'
import clsx from 'clsx'
// next
import Head from 'next/head'
// hooks
import useTranslate from 'hooks/useTranslate'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// radix
import * as TabsPrimitive from '@radix-ui/react-tabs'
// components
import DataTable, { TableColumn } from 'react-data-table-component'
import { Icon as Iconify } from '@iconify/react'
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs'
import Card from '@/components/Card'
import Checkbox from '@/components/Checkbox'
import TextField from '@/components/TextField'
import Button from '@/components/Button'

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

const TABS = [
  { name: 'Contact', value: '1' },
  { name: 'Lead', value: '2' },
  { name: 'Company', value: '3' },
]

export default function index() {
  const { t } = useTranslate()

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
            <Button startIcon={<Iconify icon='ic:round-add' height={24} />}>
              {t('Create Lead')}
            </Button>
          }
        />
        <Card fullWidth className='overflow-hidden'>
          <TabsPrimitive.Root
            defaultValue='1'
            // dir={locale === 'ar' ? 'rtl' : 'ltr'}
            className='overflow-hidden'
          >
            <TabsPrimitive.List className='flex w-full items-center gap-8 bg-gray-100 px-5'>
              {TABS.map((item, i) => (
                <TabsPrimitive.Trigger
                  key={i}
                  value={item.value}
                  className={clsx(
                    'relative flex cursor-pointer items-center justify-start gap-3 px-1 pt-3 pb-3 transition-all',
                    'before:absolute before:bottom-0 before:h-[4px] before:w-full before:rounded-t-full before:bg-primary-600 before:transition-all ltr:before:left-0 rtl:before:right-0',
                    'before:duration-500 data-[state=inactive]:before:w-0',
                    'data-[state=inactive]:text-gray-600 dark:data-[state=inactive]:text-gray-400'
                  )}
                >
                  <div className='flex w-max cursor-pointer items-center gap-2'>
                    <label className='cursor-pointer text-sm font-medium'>{t(item.name)}</label>
                  </div>
                </TabsPrimitive.Trigger>
              ))}
            </TabsPrimitive.List>
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
              <TabsPrimitive.Content value='1' className='w-full'>
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
              </TabsPrimitive.Content>
              <TabsPrimitive.Content value='2' className='w-full'>
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
              </TabsPrimitive.Content>
            </div>
          </TabsPrimitive.Root>
        </Card>
      </div>
    </>
  )
}
