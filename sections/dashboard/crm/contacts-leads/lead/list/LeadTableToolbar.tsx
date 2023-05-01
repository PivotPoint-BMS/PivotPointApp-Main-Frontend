import React from 'react'
// motion
import { Variant, motion } from 'framer-motion'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import { Icon as Iconify } from '@iconify/react'
import Button from 'components/Button'

interface LeadTableToolbarProps {
  selectedCount: number
}

export default function LeadTableToolbar({ selectedCount }: LeadTableToolbarProps) {
  const { t } = useTranslate()

  const variants: { [key: string]: Variant } = {
    closed: { y: '200%', x: '-50%' },
    opened: { y: '0%', x: '-50%' },
  }
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
          <Button
            variant='text'
            intent='default'
            startIcon={<Iconify icon='material-symbols:library-add-rounded' height={20} />}
          >
            {t('Create task')}
          </Button>

          <Button
            variant='text'
            intent='default'
            startIcon={<Iconify icon='material-symbols:group-add-rounded' height={20} />}
          >
            {t('Convert to Contact')}
          </Button>
        </div>
        <Button
          variant='text'
          intent='error'
          startIcon={<Iconify icon='material-symbols:delete-rounded' height={20} />}
        >
          {t('Delete')}
        </Button>
      </div>
    </motion.div>
  )
}
