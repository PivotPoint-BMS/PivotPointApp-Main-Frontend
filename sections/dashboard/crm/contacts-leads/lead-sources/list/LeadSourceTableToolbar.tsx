import React, { useEffect } from 'react'
// motion
import { Variant, motion } from 'framer-motion'
// api
import { useBulkDeleteLeadSourcesMutation } from 'store/api/crm/contact-leads/leadSourceApi'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// components
import { Icon as Iconify } from '@iconify/react'
import Button from 'components/Button'

interface LeadTableToolbarProps {
  selectedCount: number
  selectedIds: string[]
}

export default function LeadSourceTableToolbar({
  selectedCount,
  selectedIds,
}: LeadTableToolbarProps) {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const [bulkDeleteLeadSources, { isLoading, isSuccess, isError }] =
    useBulkDeleteLeadSourcesMutation()
  const variants: { [key: string]: Variant } = {
    closed: { y: '200%', x: '-50%' },
    opened: { y: '0%', x: '-50%' },
  }

  const handleBulkDelete = () => {
    bulkDeleteLeadSources(selectedIds)
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
        message: t('Lead Sources Deleted Successfully.'),
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
      className='fixed bottom-10 left-1/2 h-14 max-w-full px-4'
    >
      <div className='flex h-full items-center gap-4 rounded-lg border   bg-white py-1 px-4  drop-shadow-xl dark:bg-paper-dark'>
        <div className='flex h-full w-max  items-center gap-4 border-r   py-1 pr-4'>
          <p className='font-medium ltr:mr-10 rtl:ml-10'>
            {selectedCount} {t('Items Selected')}
          </p>
        </div>
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
    </motion.div>
  )
}
