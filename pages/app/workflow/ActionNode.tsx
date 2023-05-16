import clsx from 'clsx'
// reactflow
import { Handle, Node, NodeProps, Position } from 'reactflow'
// radix
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
// components
import { Icon } from '@iconify/react'
import { Button, Card, CardHeader, DropdownMenu, IconButton } from 'components'
import { buttonText } from 'components/Button'

export type ActionNodeData = { name: string; type: string; icon: string }

export type ActionNodeType = Node<ActionNodeData>

export default function ActionNode({ data }: NodeProps<ActionNodeData>) {
  return (
    <ContextMenuPrimitive.Root>
      <ContextMenuPrimitive.Trigger>
        <Card variant='outlined'>
          <CardHeader
            className='!pb-3'
            title={
              <div className='flex min-w-[250px] items-center gap-1'>
                <div className='flex items-center justify-center rounded-xl border border-blue-500 p-3 text-blue-500'>
                  <Icon icon={data.icon} height={24} />
                </div>
                <div className='ml-2'>
                  <div className='font-medium'>{data.name}</div>
                  <div className='text-xs text-gray-500'>{data.type}</div>
                </div>
              </div>
            }
            actions={
              <DropdownMenu
                trigger={
                  <IconButton>
                    <Icon icon='material-symbols:more-horiz' />
                  </IconButton>
                }
                items={[
                  { label: 'Edit', icon: <Icon icon='material-symbols:edit' />, type: 'button' },
                  {
                    label: 'Delete',
                    icon: <Icon icon='material-symbols:delete-rounded' />,
                    type: 'button',
                    className: buttonText({
                      intent: 'error',
                      disabled: false,
                      className:
                        'font-normal hover:!bg-red-600/10 dark:hover:!bg-red-400/10 !text-xs',
                    }),
                  },
                ]}
              />
            }
          />

          <Handle type='source' position={Position.Bottom} className='!bg-blue-600' />
          <Handle type='target' position={Position.Top} className='!bg-blue-600' />
        </Card>
      </ContextMenuPrimitive.Trigger>
      <ContextMenuPrimitive.Portal>
        <ContextMenuPrimitive.Content
          className={clsx(
            'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
            'w-48 rounded-lg px-1.5 py-1 shadow-md ',
            'bg-white dark:bg-gray-800'
          )}
        >
          <ContextMenuPrimitive.Item className='w-full'>
            <Button
              variant='text'
              intent='default'
              className='w-full !justify-start !text-xs font-normal'
              startIcon={<Icon icon='material-symbols:edit' />}
            >
              Edit
            </Button>
          </ContextMenuPrimitive.Item>
          <ContextMenuPrimitive.Item>
            <Button
              variant='text'
              intent='error'
              className='w-full !justify-start !text-xs font-normal'
              startIcon={<Icon icon='material-symbols:delete-rounded' />}
            >
              Delete
            </Button>
          </ContextMenuPrimitive.Item>
        </ContextMenuPrimitive.Content>
      </ContextMenuPrimitive.Portal>
    </ContextMenuPrimitive.Root>
  )
}
