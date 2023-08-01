import React, { useEffect, useState } from 'react'
// motion
import { Variant, motion } from 'framer-motion'
// api
import { useBulkDeleteLeadSourcesMutation } from 'store/api/crm/contact-leads/leadSourceApi'
// hooks
import { useAppSelector } from 'store/hooks'
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// components
import { RowSelectionState } from '@tanstack/react-table'
import { Icon as Iconify } from '@iconify/react'
import { Button, AlertDialog } from 'components'

interface LeadTableToolbarProps {
  selectedCount: number
  selectedIds: string[]
  setRowSelection: (value: RowSelectionState) => void
}

export default function LeadSourceTableToolbar({
  selectedCount,
  selectedIds,
  setRowSelection,
}: LeadTableToolbarProps) {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const { PageNumber, PageSize } = useAppSelector((state) => state.pagination)
  const [openBulkDeleteDialog, setOpenBulkDeleteDialog] = useState(false)
  const [bulkDeleteLeadSources, { isLoading, isSuccess, isError }] =
    useBulkDeleteLeadSourcesMutation()
  const variants: { [key: string]: Variant } = {
    closed: { y: '200%', x: '-50%' },
    opened: { y: '0%', x: '-50%' },
  }

  const handleBulkDelete = () => {
    bulkDeleteLeadSources({ toDelete: selectedIds, PageNumber, PageSize })
    setRowSelection({})
    setOpenBulkDeleteDialog(false)
  }

  useEffect(() => {
    if (isError) {
      open({
        message: t('A problem has occurred.'),
        autoHideDuration: 4000,
        type: 'error',
        variant: 'contained',
      })
    }
    if (isSuccess) {
      open({
        message: t('Lead Sources Deleted Successfully.'),
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
        className='fixed bottom-10 left-1/2 h-14 max-w-full px-4'
      >
        <div className='flex h-full w-max flex-wrap items-center justify-center divide-x whitespace-pre-wrap rounded-lg border border-r bg-white py-1 px-4 drop-shadow-xl rtl:divide-x-reverse dark:divide-gray-600 dark:border-gray-600 dark:bg-paper-dark'>
          <p className='font-medium ltr:mr-10 rtl:ml-10'>
            {selectedCount} {t('Items Selected')}
          </p>
          <div className='px-1'>
            <Button
              variant='text'
              intent='error'
              startIcon={<Iconify icon='ic:round-delete' height={20} />}
              onClick={() => setOpenBulkDeleteDialog(true)}
              loading={isLoading}
            >
              {t('Delete')}
            </Button>
          </div>
        </div>
      </motion.div>
      <AlertDialog
        title={t('Confirm Delete')}
        description={
          <p className='py-1 text-sm text-red-500 dark:text-red-400'>
            {t('This action cannot be undone. This will permanently delete these lead sources.')}
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
