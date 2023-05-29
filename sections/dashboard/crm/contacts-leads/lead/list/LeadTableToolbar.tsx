import React, { useEffect } from 'react'
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
// components
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
  const [bulkDeleteLead, { isLoading, isSuccess, isError }] = useBulkDeleteLeadMutation()
  const [convertToContact] = useConvertToContactMutation()
  const variants: { [key: string]: Variant } = {
    closed: { y: '200%', x: '-50%' },
    opened: { y: '0%', x: '-50%' },
  }

  const handleBulkDelete = () => {
    bulkDeleteLead(selectedIds)
    setRowSelection({})
  }

  const handleConvertToContact = () => {
    selectedIds.forEach((id) => convertToContact(id))
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
              onClick={handleBulkDelete}
              loading={isLoading}
            >
              {t('Delete')}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
