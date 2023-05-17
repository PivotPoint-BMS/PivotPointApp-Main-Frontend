/* eslint-disable no-param-reassign */
import React from 'react'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import { Icon } from '@iconify/react'
import { Card, CardContent, TextField } from 'components'

const TRIGGERS: { name: string; icon: string }[] = [
  { name: 'Daily', icon: 'material-symbols:calendar-month-rounded' },
  { name: 'New Lead Created', icon: 'material-symbols:person-add-rounded' },
  { name: 'Lead Status Change', icon: 'tabler:status-change' },
  { name: 'Deal Won', icon: 'material-symbols:check-circle-rounded' },
  { name: 'Deal Lost', icon: 'material-symbols:error-rounded' },
]
const ACTIONS: { name: string; icon: string }[] = [
  { name: 'Send Email', icon: 'mdi:email-send' },
  { name: 'Assign Task', icon: 'material-symbols:assignment-add' },
  { name: 'Create Note', icon: 'material-symbols:note-add-rounded' },
  { name: 'Change Lead Status', icon: 'tabler:status-change' },
]

export default function WorkflowSidebar() {
  const { t } = useTranslate()
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string,
    name: string,
    icon: string,
    extra?: string
  ) => {
    event.dataTransfer.setData('reactflow/nodeType', nodeType)
    event.dataTransfer.setData('reactflow/name', name)
    event.dataTransfer.setData('reactflow/icon', icon)
    if (extra) event.dataTransfer.setData('reactflow/type', extra)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <aside className='bg-paper overflow-scroll border p-2 dark:border-gray-600 dark:bg-paper-dark'>
      <div className='mb-4'>
        <TextField placeholder='Search Node...' startAdornment={<Icon icon='uil:search' />} />
      </div>
      <h1 className='mb-2 font-medium'>{t('Triggers')}</h1>
      <div className='mb-3 flex flex-col items-center gap-2'>
        {TRIGGERS.map((trigger) => (
          <div
            className='w-full cursor-grab'
            onDragStart={(event) => onDragStart(event, 'trigger', trigger.name, trigger.icon)}
            draggable
          >
            <Card variant='outlined' fullWidth>
              <CardContent className='flex w-full items-center gap-1'>
                <div className='flex items-center justify-center rounded-lg border border-primary-500 p-2 text-primary-500'>
                  <Icon icon={trigger.icon} height={18} />
                </div>
                <div className='ml-2'>
                  <div className='text-sm font-medium'>{t(trigger.name)}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <h1 className='mb-2 font-medium'>{t('Actions')}</h1>
      <div className='flex flex-col items-center gap-2'>
        {ACTIONS.map((action) => (
          <div
            className='w-full cursor-grab'
            onDragStart={(event) => onDragStart(event, 'action', action.name, action.icon)}
            draggable
          >
            <Card variant='outlined' fullWidth>
              <CardContent className='flex w-full items-center gap-1'>
                <div className='flex items-center justify-center rounded-lg border border-blue-500 p-2 text-blue-500'>
                  <Icon icon={action.icon} height={18} />
                </div>
                <div className='ml-2'>
                  <div className='text-sm font-medium'>{t(action.name)}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </aside>
  )
}
