// hooks
import useTranslate from 'hooks/useTranslate'
// components
import { Icon as Iconify } from '@iconify/react'
import Card from 'components/Card'
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'components/Tabs'
// sections
import Notes from './notes'
import Activities from './activities'

const TABS = [
  { name: 'Activity', value: 'activity', icon: 'fluent:clipboard-task-24-filled' },
  { name: 'Notes', value: 'notes', icon: 'material-symbols:note' },
  { name: 'Tasks', value: 'notes', icon: 'fluent:clipboard-task-24-filled' },
  { name: 'Emails', value: 'emails', icon: 'material-symbols:mail' },
  { name: 'Calls', value: 'calls', icon: 'material-symbols:call' },
  { name: 'Meetings', value: 'meetings', icon: 'material-symbols:groups' },
]

export default function Details({ leadId }: { leadId: string }) {
  const { t } = useTranslate()
  return (
    <Card
      fullWidth
      className='mb-5 max-h-full !border-gray-200 ltr:rounded-tr-none rtl:rounded-tl-none dark:!border-gray-700 dark:!bg-gray-900 md:col-span-2'
      variant='outlined'
    >
      <TabsRoot defaultValue='activity' className='h-full'>
        <TabsList>
          {TABS.map((item, i) => (
            <TabsTrigger key={i} value={item.value}>
              <div className='flex w-max cursor-pointer items-center gap-2'>
                {item.icon && <Iconify icon={item.icon} height={20} width={20} />}
                <label className='cursor-pointer font-medium'>{t(item.name)}</label>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
        <div className='max-h-screen overflow-auto'>
          <TabsContent value='activity'>
            <Activities leadId={leadId} />
          </TabsContent>
          <TabsContent value='notes'>
            <Notes leadId={leadId} />
          </TabsContent>
        </div>
      </TabsRoot>
    </Card>
  )
}
