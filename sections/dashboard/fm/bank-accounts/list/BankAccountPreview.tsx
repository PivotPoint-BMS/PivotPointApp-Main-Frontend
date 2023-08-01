import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
// next
import Link from 'next/link'
// motion
import { Variant, motion } from 'framer-motion'
// redux
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { closePreviewSupplier } from 'store/slices/supplierPreviewSlice'
import {
  useDeleteSupplierMutation,
  useEditSupplierMutation,
} from 'store/api/scm/products-service/suppliersApis'
// config
import { PATH_DASHBOARD } from 'routes/paths'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// components
import { Icon as Iconify } from '@iconify/react'
import IconButton from 'components/IconButton'
import Tooltip from 'components/Tooltip'
import AlertDialog from 'components/AlertDialog'

export default function SupplierPreview() {
  const { t, locale } = useTranslate()
  const { open } = useSnackbar()
  const dispatch = useAppDispatch()

  const [editSupplier, { isSuccess: isEditSuccess, isError: isEditError }] =
    useEditSupplierMutation()
  const [deleteSupplier, { isError: isDeleteError, isSuccess: isDeleteSuccess }] =
    useDeleteSupplierMutation()

  const { isOpen, supplier, isEdit } = useAppSelector((state) => state.supplierPreview)
  const { PageNumber, PageSize } = useAppSelector((state) => state.pagination)
  const [opened, setOpened] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [idToDelete, setIdToDelete] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')

  const variants: { [key: string]: Variant } = {
    closed: { x: locale === 'ar' ? '-100%' : '100%' },
    opened: { x: '0%' },
  }

  useEffect(() => {
    setOpened(isOpen)
  }, [isOpen])

  useEffect(() => {
    setIsEditing(isEdit)
  }, [isEdit])

  const handleClose = () => {
    setOpened(false)
    setIsEditing(false)
    setTimeout(() => {
      dispatch(closePreviewSupplier())
    }, 200)
  }

  useEffect(() => {
    if (supplier) {
      setName(supplier.name)
      setEmail(supplier.email)
      setPhoneNumber(supplier.phoneNumber)
      setAddress(supplier.address)
    }
  }, [supplier])

  useEffect(() => {
    if (isEditError) {
      open({
        message: t('Sorry, Supplier not updated, A problem has occurred.'),
        autoHideDuration: 4000,
        type: 'error',
        variant: 'contained',
      })
    }
    if (isEditSuccess) {
      open({
        message: t('Supplier Updated Successfully.'),
        autoHideDuration: 4000,
        type: 'success',
        variant: 'contained',
      })
    }
  }, [isEditError, isEditSuccess])

  useEffect(() => {
    if (isDeleteError) {
      open({
        message: t('A problem has occurred.'),
        autoHideDuration: 4000,
        type: 'error',
        variant: 'contained',
      })
    }
    if (isDeleteSuccess) {
      open({
        message: t('Supplier Deleted Successfully.'),
        autoHideDuration: 4000,
        type: 'success',
        variant: 'contained',
      })
    }
  }, [isDeleteError, isDeleteSuccess])

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
        <div className='z-50 m-0 h-screen w-full bg-white py-4 shadow-2xl shadow-white/80 transition-all delay-100 dark:border-gray-600 dark:bg-paper-dark sm:w-[500px]'>
          <div className='mb-6 flex w-full items-center gap-4 border-b px-4 pb-4'>
            <div className='flex flex-1 items-center gap-2'>
              <IconButton onClick={handleClose}>
                <Iconify icon='ic:close' height={20} />
              </IconButton>
              <h6 className='flex-1 text-xl font-semibold'>{t('Supplier Preview')}</h6>
            </div>
            <div className='flex items-center gap-2'>
              <Tooltip title={t('View Full Details')}>
                <Link href={PATH_DASHBOARD.scm.supplier(supplier?.id || '')}>
                  <IconButton>
                    <Iconify icon='mingcute:external-link-fill' height={18} />
                  </IconButton>
                </Link>
              </Tooltip>
              <Tooltip title={t('Edit')}>
                <IconButton
                  onClick={() => {
                    if (isEditing) {
                      editSupplier({
                        data: {
                          address,
                          email,
                          name,
                          phoneNumber,
                        },
                        id: supplier?.id || '',
                        PageNumber,
                        PageSize,
                      })
                      setIsEditing(false)
                    } else {
                      setIsEditing(true)
                    }
                  }}
                >
                  <Iconify icon={isEditing ? 'ic:round-check' : 'ic:round-edit'} height={20} />
                </IconButton>
              </Tooltip>
              <Tooltip title={t('Delete')}>
                <IconButton onClick={() => setIdToDelete(supplier?.id || null)}>
                  <Iconify
                    icon='ic:round-delete'
                    className='text-red-500 dark:text-red-400'
                    height={20}
                  />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <div className='flex flex-col gap-4 px-6'>
            <div className='flex items-center gap-2'>
              <p className='w-36 text-sm text-gray-500 dark:text-gray-400'>{t('Name')}</p>
              <input
                type='text'
                disabled={!isEditing}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={(e) => {
                  if (e.target.value === '' || e.target.value === supplier?.name) {
                    setName(supplier?.name || name)
                  }
                }}
                className={clsx(
                  'w-full bg-transparent text-lg',
                  isEditing &&
                    'rounded-md py-1 px-1 ring-1 ring-black transition-all dark:ring-white'
                )}
              />
            </div>
            <div className='flex items-center gap-2'>
              <p className='w-36 text-sm text-gray-500 dark:text-gray-400'>{t('Email')}</p>
              <input
                type='text'
                disabled={!isEditing}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={(e) => {
                  if (e.target.value === '' || e.target.value === supplier?.email) {
                    setEmail(supplier?.email || email)
                  }
                }}
                className={clsx(
                  'w-full bg-transparent text-lg',
                  isEditing &&
                    'rounded-md py-1 px-1 ring-1 ring-black transition-all dark:ring-white'
                )}
              />
            </div>
            <div className='flex items-center gap-2'>
              <p className='w-36 text-sm text-gray-500 dark:text-gray-400'>{t('Phone Number')}</p>
              <input
                type='text'
                disabled={!isEditing}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onBlur={(e) => {
                  if (e.target.value === '' || e.target.value === supplier?.phoneNumber) {
                    setPhoneNumber(supplier?.phoneNumber || phoneNumber)
                  }
                }}
                className={clsx(
                  'w-full bg-transparent text-lg',
                  isEditing &&
                    'rounded-md py-1 px-1 ring-1 ring-black transition-all dark:ring-white'
                )}
              />
            </div>
            <div className='flex items-center gap-2'>
              <p className='w-36 text-sm text-gray-500 dark:text-gray-400'>{t('Address')}</p>
              <input
                type='text'
                disabled={!isEditing}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onBlur={(e) => {
                  if (e.target.value === '' || e.target.value === supplier?.address) {
                    setAddress(supplier?.address || address)
                  }
                }}
                className={clsx(
                  'w-full bg-transparent text-lg',
                  isEditing &&
                    'rounded-md py-1 px-1 ring-1 ring-black transition-all dark:ring-white'
                )}
              />
            </div>
          </div>
        </div>
      </motion.div>
      <AlertDialog
        title={t('Confirm Delete')}
        description={t('This action cannot be undone. This will permanently delete this supplier.')}
        cancelText={t('Cancel')}
        confirmText={t('Yes, Delete')}
        onConfirm={() => {
          deleteSupplier({ id: idToDelete || '', PageNumber, PageSize })
          setIdToDelete(null)
          handleClose()
        }}
        open={idToDelete !== null}
        onClose={() => setIdToDelete(null)}
        buttonProps={{ intent: 'error' }}
      />
    </div>
  )
}
