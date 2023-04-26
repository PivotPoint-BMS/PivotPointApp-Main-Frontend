import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
// motion
import { Variant, motion } from 'framer-motion'
// next
import Link from 'next/link'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// redux
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { closePreviewContact } from 'store/slices/contactPreviewSlice'
// hooks
import useTranslate from 'hooks/useTranslate'
import useResponsive from 'hooks/useResponsive'
// asset
import avatarPlaceholder from 'public/avatar_placeholder.png'
// components
import { Icon as Iconify } from '@iconify/react'
import IconButton from 'components/IconButton'
import Button from 'components/Button'
import Image from 'components/Image'

export default function ContactPreview() {
  const isDesktop = useResponsive('sm', 'up')
  const { t, locale } = useTranslate()
  const dispatch = useAppDispatch()
  const { isOpen, contact } = useAppSelector((state) => state.contactPreview)
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
      dispatch(closePreviewContact())
    }, 200)
  }

  return (
    <div
      className={clsx(
        'fixed top-0 right-0 z-50 flex h-screen w-screen bg-gray-600/50 backdrop-blur-sm transition-all dark:bg-gray-500/20',
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
        <div className='z-50 m-0 h-screen w-full bg-white py-4 transition-all delay-100 dark:border-gray-600 dark:bg-paper-dark sm:w-[650px]'>
          <div className='mb-6 flex w-full  items-center gap-4 border-b   px-4 pb-4'>
            <div className='flex flex-1 items-center gap-2'>
              <IconButton onClick={handleClose}>
                <Iconify
                  icon={locale === 'ar' ? 'pajamas:collapse-left' : 'pajamas:collapse-right'}
                  height={20}
                />
              </IconButton>
              <h6 className='flex-1 text-xl font-semibold'>{t('Contact Preview')}</h6>
            </div>
            <Link href={PATH_DASHBOARD.crm['contacts-leads'].contact(contact?.id)}>
              {isDesktop ? (
                <Button
                  variant='outlined'
                  intent='default'
                  endIcon={<Iconify icon='mingcute:external-link-fill' height={18} />}
                >
                  {t('View Full Details')}
                </Button>
              ) : (
                <IconButton>
                  <Iconify icon='mingcute:external-link-fill' height={18} />
                </IconButton>
              )}
            </Link>
          </div>
          <div className='mx-6 grid grid-cols-2 rounded-lg border   sm:grid-cols-4 '>
            <div className=' col-span-2 flex flex-col items-start justify-between gap-4 border-b   p-3 sm:col-span-4 sm:flex-row'>
              <div className='flex w-full flex-col items-center justify-center gap-4 truncate sm:flex-row sm:items-start sm:justify-start'>
                <div>
                  <Image
                    alt='avatar'
                    width={80}
                    height={80}
                    src={avatarPlaceholder.src}
                    className='rounded-full'
                  />
                </div>
                <div className='flex h-full w-full flex-col justify-center gap-1 truncate'>
                  <h1 className='flex-1 self-center truncate text-lg font-semibold sm:self-start'>
                    {contact?.fullName}
                  </h1>
                  <p className='flex  items-center gap-1 truncate text-sm text-gray-500 dark:text-gray-300'>
                    <div>
                      <Iconify icon='material-symbols:mail-rounded' height={18} />{' '}
                    </div>
                    <span className='truncate'>{contact?.email}</span>{' '}
                  </p>
                  <p className='flex items-center gap-1 text-sm text-gray-500 dark:text-gray-300'>
                    <div>
                      <Iconify icon='material-symbols:call' height={18} />
                    </div>
                    <span className='truncate'>{contact?.phoneNumber}</span>
                  </p>
                </div>
              </div>
              <div className='flex w-full items-center justify-evenly gap-6 sm:w-fit sm:justify-end sm:gap-2 '>
                <IconButton className='border'>
                  <Iconify icon='material-symbols:outgoing-mail' height={22} />
                </IconButton>
                <IconButton className='border'>
                  <Iconify icon='material-symbols:call' height={22} />
                </IconButton>
                <IconButton className='border'>
                  <Iconify icon='material-symbols:more-horiz' height={22} />
                </IconButton>
              </div>
            </div>
            <div className='flex flex-col gap-2 border-b border-r   p-3 sm:border-b-0'>
              <h6 className='text-sm font-medium text-gray-500 dark:text-gray-300'>
                {t('Contact Owner')}
              </h6>
              <p className='font-medium'>Full Name</p>
            </div>
            <div className='flex flex-col gap-2 border-b   p-3 sm:border-b-0 sm:border-r'>
              <h6 className='text-sm font-medium text-gray-500 dark:text-gray-300'>
                {t('Contact Source')}
              </h6>
              <p className='font-medium'>
                {contact?.source?.source ? contact?.source?.source : t('No Source')}
              </p>
            </div>
            <div className='flex flex-col gap-2 border-r   p-3'>
              <h6 className='text-sm font-medium text-gray-500 dark:text-gray-300'>
                {t('Job Title')}
              </h6>
              <p className='font-medium'>
                {contact?.jobTitle ? contact?.jobTitle : t('No Job Title')}
              </p>
            </div>
            <div className='flex flex-col gap-2 p-3'>
              <h6 className='text-sm font-medium text-gray-500 dark:text-gray-300'>
                {t('Annual Revenue')}
              </h6>
              <p className='font-medium'>$ 5000</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
