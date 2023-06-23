import { useState } from 'react'
import moment from 'moment'
import { clsx } from 'clsx'
import ReactHtmlParser from 'react-html-parser'
// radix
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
// apis
import { useDeleteNoteMutation } from 'store/api/crm/contact-leads/leadApis'
// hooks
import useTranslate from 'hooks/useTranslate'
// types
import { Note } from 'types'
// components
import { Icon as Iconify } from '@iconify/react'
import Card from 'components/Card'
import IconButton from 'components/IconButton'
import DropdownMenu from 'components/DropdownMenu'
import AlertDialog from 'components/AlertDialog'
import { useAppSelector } from 'store/hooks'
import Backdrop from 'components/Backdrop'

export default function NoteCard({
  leadId,
  note,
  setNoteToEdit,
}: {
  leadId: string
  note: Note
  setNoteToEdit: (note: Note) => void
}) {
  const { t } = useTranslate()
  const { PageNumber, PageSize } = useAppSelector((state) => state.paggination)
  const [isOpen, setIsOpen] = useState(true)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  const [deleteNote, { isLoading }] = useDeleteNoteMutation()

  return (
    <>
      <Card variant='elevated' fullWidth className='!h-full border dark:border-gray-500'>
        <CollapsiblePrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
          <div className='flex select-none items-center gap-2 rounded-md px-4 py-2 text-left text-sm font-medium'>
            <CollapsiblePrimitive.Trigger
              className={clsx(
                'group flex select-none items-center rounded-full text-left text-sm font-medium',
                'focus:outline-none focus-visible:ring focus-visible:ring-gray-900 focus-visible:ring-opacity-75'
              )}
            >
              <IconButton>
                <Iconify
                  icon='material-symbols:chevron-right-rounded'
                  height={24}
                  className='transform text-gray-500 duration-300 ease-in-out group-data-[state=open]:rotate-90'
                />
              </IconButton>
            </CollapsiblePrimitive.Trigger>
            <div className='flex-1 space-y-1'>
              <p className='text-lg font-medium'>{note.noteTitle}</p>
              <p className='text-gray-500'>
                {t('By:')} {note.lastEditor}
              </p>
            </div>{' '}
            <Iconify icon='material-symbols:calendar-today' height={20} className='text-gray-600' />
            <p>{moment(note.created).format('LLL')}</p>
            <DropdownMenu
              trigger={
                <IconButton className='border'>
                  <Iconify icon='material-symbols:more-horiz' height={20} />
                </IconButton>
              }
              items={[
                {
                  type: 'button',
                  label: t('Edit'),
                  icon: <Iconify icon='ic:round-edit' height={18} />,
                  onClick: () => setNoteToEdit(note),
                },
                {
                  type: 'button',
                  label: t('Delete'),
                  icon: (
                    <Iconify
                      icon='ic:round-delete'
                      height={18}
                      className='text-red-500 dark:text-red-400'
                    />
                  ),
                  onClick: () => setOpenDeleteDialog(true),
                },
              ]}
            />
          </div>
          <CollapsiblePrimitive.Content className='flex flex-col data-[state=open]:mt-4 data-[state=open]:space-y-4 data-[state=open]:px-4 data-[state=open]:pb-4'>
            <div className='ProseMirror'>{ReactHtmlParser(note.note)}</div>
          </CollapsiblePrimitive.Content>
        </CollapsiblePrimitive.Root>
      </Card>
      <Backdrop open={isLoading} loading={isLoading} />
      <AlertDialog
        title={t('Confirm Delete')}
        description={
          <p className='text-red-600 dark:text-red-400'>
            {t('This action cannot be undone. This will permanently delete this note.')}
          </p>
        }
        cancelText={t('Cancel')}
        confirmText={t('Yes, Delete')}
        onConfirm={() => {
          deleteNote({ id: note.id, PageNumber, PageSize, leadId })
          setOpenDeleteDialog(false)
        }}
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        buttonProps={{ intent: 'error' }}
      />
    </>
  )
}
