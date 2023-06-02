import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
// motion
import { Variant, motion } from 'framer-motion'
// redux
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { closePreviewSupplier } from 'store/slices/supplierPreviewSlice'
// hooks
import useTranslate from 'hooks/useTranslate'
// asset
// components
import { Icon as Iconify } from '@iconify/react'
import IconButton from 'components/IconButton'

export default function SupplierPreview() {
  const { t, locale } = useTranslate()
  const dispatch = useAppDispatch()
  const { isOpen, supplier } = useAppSelector((state) => state.supplierPreview)
  const [opened, setOpened] = useState(false)

  const variants: { [key: string]: Variant } = {
    closed: { x: locale === 'ar' ? '-100%' : '100%' },
    opened: { x: '0%' },
  }

  useEffect(() => {
    setOpened(isOpen)
  }, [isOpen])

  const handleClose = () => {
    setOpened(false)
    setTimeout(() => {
      dispatch(closePreviewSupplier())
    }, 200)
  }

  return (
    <div
      className={clsx(
        'fixed top-0 right-0 z-50 flex h-screen w-screen bg-gray-800/80  backdrop-blur-sm transition-all dark:bg-gray-500/20',
        isOpen ? 'block' : 'hidden'
      )}
    >
      <div className='flex-1' onClick={handleClose}></div>
      <motion.div
        initial='closed'
        animate={opened ? 'opened' : 'closed'}
        variants={variants}
        transition={{ type: 'keyframes' }}
      >
        <div className='z-50 m-0 h-screen w-full bg-white py-4 shadow-2xl shadow-white/80 transition-all delay-100 dark:border-gray-600 dark:bg-paper-dark sm:w-[650px]'>
          <div className='mb-6 flex w-full  items-center gap-4 border-b   px-4 pb-4'>
            <div className='flex flex-1 items-center gap-2'>
              <IconButton onClick={handleClose}>
                <Iconify icon='ic:close' height={20} />
              </IconButton>
              <h6 className='flex-1 text-xl font-semibold'>{t('Supplier Preview')}</h6>
            </div>
          </div>
          <div className='mx-6 grid grid-cols-2 divide-x divide-y   rounded-lg border rtl:divide-x-reverse sm:grid-cols-4'>
            <div className='flex h-full w-full flex-col justify-center gap-1 truncate'>
              <h1 className='flex-1 self-center truncate text-lg font-semibold sm:self-start'>
                {supplier?.name}
              </h1>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
