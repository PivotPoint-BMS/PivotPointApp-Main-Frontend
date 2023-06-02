import React, { useEffect, useState } from 'react'
// motion
import { Variant, motion } from 'framer-motion'
// api
import {
  useBulkDeleteLeadMutation,
  useConvertToContactMutation,
} from 'store/api/crm/contact-leads/leadApis'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
import { useAppSelector } from 'store/hooks'
// components
import AlertDialog from 'components/AlertDialog'
import { Icon as Iconify } from '@iconify/react'
import Button from 'components/Button'
import { RowSelectionState } from '@tanstack/react-table'

interface LeadTableToolbarProps {
  selectedCount: number
  selectedIds: string[]
  setRowSelection: (value: RowSelectionState) => void
}

export default function LeadTableToolbar({
  selectedCount,
  selectedIds,
  setRowSelection,
}: LeadTableToolbarProps) {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const { PageNumber, PageSize } = useAppSelector((state) => state.paggination)
  const [openBulkDeleteDialog, setOpenBulkDeleteDialog] = useState(false)
  const [bulkDeleteLead, { isLoading, isSuccess, isError }] = useBulkDeleteLeadMutation()
  const [convertToContact] = useConvertToContactMutation()
  const variants: { [key: string]: Variant } = {
    closed: { y: '200%', x: '-50%' },
    opened: { y: '0%', x: '-50%' },
  }

  const handleBulkDelete = () => {
    bulkDeleteLead({ toDelete: selectedIds, PageNumber, PageSize })
    setRowSelection({})
    setOpenBulkDeleteDialog(false)
  }

  const handleConvertToContact = () => {
    selectedIds.forEach((id) => convertToContact({ id, PageNumber, PageSize }))
    setRowSelection({})
  }

  useEffect(() => {
    if (isError) {
      open({
        message: t('A problem has occured.'),
        autoHideDuration: 4000,
        type: 'error',
        variant: 'contained',
      })
    }
    if (isSuccess) {
      open({
        message: t('Leads Deleted Successfully.'),
        autoHideDuration: 4000,
        type: 'success',
        variant: 'contained',
      })
    }
  }, [isError, isSuccess])

  return (
    <>
      <motion.div
        initial='closed'
        animate={selectedCount > 0 ? 'opened' : 'closed'}
        variants={variants}
        transition={{ type: 'spring', duration: 0.6 }}
        className='fixed bottom-10 left-1/2 z-50 h-fit max-w-full px-4'
      >
        <div className='overflow-x-scroll'>
          <div className='flex h-full w-max flex-wrap items-center justify-center divide-x whitespace-pre-wrap rounded-lg border border-r bg-white py-1 px-4 drop-shadow-xl rtl:divide-x-reverse dark:divide-gray-600 dark:border-gray-600 dark:bg-paper-dark'>
            <p className='font-medium ltr:mr-10 rtl:ml-10'>
              {selectedCount} {t('Items Selected')}
            </p>
            <div className='flex items-center gap-2 px-1'>
              <Button
                variant='text'
                intent='default'
                startIcon={<Iconify icon='material-symbols:library-add-rounded' height={20} />}
              >
                {t('Create Deal')}
              </Button>
              <Button
                variant='text'
                intent='default'
                startIcon={<Iconify icon='material-symbols:group-add-rounded' height={20} />}
                onClick={handleConvertToContact}
              >
                {t('Convert to Contact')}
              </Button>
            </div>
            <div className='px-1'>
              <Button
                variant='text'
                intent='error'
                startIcon={<Iconify icon='material-symbols:delete-rounded' height={20} />}
                onClick={() => setOpenBulkDeleteDialog(true)}
                loading={isLoading}
              >
                {t('Delete')}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
      <AlertDialog
        title={t('Confirm Delete')}
        description={
          <p className='py-1 text-sm text-red-500 dark:text-red-400'>
            {t('This action cannot be undone. This will permanently delete these leads.')}
          </p>
        }
        cancelText={t('Cancel')}
        confirmText={t('Yes, Delete')}
        onConfirm={handleBulkDelete}
        open={openBulkDeleteDialog}
        onClose={() => setOpenBulkDeleteDialog(false)}
        buttonProps={{ intent: 'error' }}
      />
    </>
  )
}
