import clsx from "clsx"
// reactflow
import { Handle, NodeProps, Position, Node } from "reactflow"
// radix
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
// hooks
import useTranslate from "hooks/useTranslate"
// components
import { Icon } from "@iconify/react"
import { Button, Card, CardHeader, DropdownMenu, IconButton } from "components"
import { buttonText } from "components/Button"

export type TriggerNodeData = { name: string; icon: string }

export type TriggerNodeType = Node<TriggerNodeData>

export default function TriggerNode({ data }: NodeProps<TriggerNodeData>) {
  const { t } = useTranslate()
  return (
    <ContextMenuPrimitive.Root>
      <ContextMenuPrimitive.Trigger>
        <Card variant='outlined'>
          <CardHeader
            className='!pb-3'
            title={
              <div className='flex min-w-[250px] items-center gap-1'>
                <div className='flex items-center justify-center rounded-xl border border-primary-500 p-3 text-primary-500'>
                  <Icon icon={data.icon} height={24} />
                </div>
                <div className='ml-2'>
                  <div className='font-semibold'>{data.name}</div>
                  <div className='text-xs font-normal text-gray-500'>{t("Trigger")}</div>
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
                  { label: "Edit", icon: <Icon icon='ic:round-edit' />, type: "button" },
                  {
                    label: "Delete",
                    icon: <Icon icon='ic:round-delete' />,
                    type: "button",
                    className: buttonText({
                      intent: "error",
                      disabled: false,
                      className:
                        "font-normal hover:!bg-red-600/10 dark:hover:!bg-red-400/10 !text-xs",
                    }),
                  },
                ]}
              />
            }
          />

          <Handle type='source' position={Position.Bottom} className='!bg-primary-600' />
        </Card>
      </ContextMenuPrimitive.Trigger>
      <ContextMenuPrimitive.Portal>
        <ContextMenuPrimitive.Content
          className={clsx(
            "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
            "w-48 rounded-lg px-1.5 py-1 shadow-md ",
            "bg-white dark:bg-gray-800"
          )}
        >
          <ContextMenuPrimitive.Item className='w-full'>
            <Button
              variant='text'
              intent='default'
              className='w-full !justify-start !text-xs font-normal'
              startIcon={<Icon icon='ic:round-edit' />}
            >
              Edit
            </Button>
          </ContextMenuPrimitive.Item>
          <ContextMenuPrimitive.Item>
            <Button
              variant='text'
              intent='error'
              className='w-full !justify-start !text-xs font-normal'
              startIcon={<Icon icon='ic:round-delete' />}
            >
              Delete
            </Button>
          </ContextMenuPrimitive.Item>
        </ContextMenuPrimitive.Content>
      </ContextMenuPrimitive.Portal>
    </ContextMenuPrimitive.Root>
  )
}
