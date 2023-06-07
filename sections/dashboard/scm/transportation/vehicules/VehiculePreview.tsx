import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
// motion
import { Variant, motion } from 'framer-motion'
// redux
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { closePreviewVehicule } from 'store/slices/vehiculePreviewSlice'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import { IconButton, Tooltip } from 'components'
import { Icon } from '@iconify/react'

export default function VehiculePreview() {
  const { t, locale } = useTranslate()
  const dispatch = useAppDispatch()
  const { isOpen, vehicule } = useAppSelector((state) => state.vehiculePreview)
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
      dispatch(closePreviewVehicule())
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
        <div className='z-50 m-0 flex h-screen w-full flex-col bg-white py-4 shadow-2xl shadow-white/80 transition-all delay-100 dark:border-gray-600 dark:bg-paper-dark dark:shadow-black/80'>
          <div className='flex w-full items-center gap-4 border-b px-4 pb-4'>
            <div className='flex w-full items-center gap-2 '>
              <IconButton onClick={handleClose}>
                <Icon icon='ic:round-close' height={22} />
              </IconButton>
              <h6 className='flex-1 text-xl font-semibold'>{t('Deal Preview')}</h6>
              <Tooltip title={t('Delete')}>
                <IconButton>
                  <Icon
                    icon='ic:round-delete'
                    height={20}
                    className='text-red-600 dark:text-red-400'
                  />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <div className='flex flex-1 flex-col gap-5 overflow-y-scroll px-4 py-2'>
            <div className='flex items-center gap-2'>
              <p className='w-36 text-sm text-gray-500 dark:text-gray-400'>{t('Model')}</p>
              <p>{vehicule?.model}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
