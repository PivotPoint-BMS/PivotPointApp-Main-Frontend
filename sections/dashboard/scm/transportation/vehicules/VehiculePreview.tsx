import React, { useState } from 'react'
// redux
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { closePreviewVehicule } from 'store/slices/vehiculePreviewSlice'
// api
import { useDeleteVehiculeMutation } from 'store/api/scm/transportation/vehiculesApis'
// utils
import getVehiculesImage from 'utils/getVehiculeImage'
import { fNumber } from 'utils/formatNumber'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// components
import { AlertDialog, IconButton, Image, Sheet, Tooltip } from 'components'
import { Icon } from '@iconify/react'

export default function VehiculePreview() {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const dispatch = useAppDispatch()
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const { isOpen, vehicule } = useAppSelector((state) => state.vehiculePreview)
  const { PageNumber, PageSize } = useAppSelector((state) => state.paggination)
  const [deleteVehicule, { isLoading: isDeleteLoading }] = useDeleteVehiculeMutation()

  return (
    <>
      <Sheet
        title={t('Vehicule Preview')}
        isOpen={isOpen}
        handleClose={() => dispatch(closePreviewVehicule())}
        actions={
          <Tooltip title={t('Delete')}>
            <IconButton onClick={() => setOpenDeleteDialog(true)}>
              <Icon icon='ic:round-delete' height={20} className='text-red-600 dark:text-red-400' />
            </IconButton>
          </Tooltip>
        }
        className='sm:w-[550px]'
      >
        {vehicule && (
          <div className='space-y-4 overflow-y-auto px-4 py-2'>
            <Image
              src={getVehiculesImage(vehicule.type, vehicule.size).src}
              className='px-6 py-2'
            />
            <div className='grid grid-cols-2 gap-3 sm:grid-cols-6'>
              <div className='col-span-2 space-y-1 rounded-md bg-gray-100 p-2 dark:bg-paper-dark-contrast sm:col-span-3'>
                <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>{t('Model')}</p>
                <p className='font-bold'>{vehicule.model}</p>
              </div>
              <div className='col-span-2 space-y-1 rounded-md bg-gray-100 p-2 dark:bg-paper-dark-contrast sm:col-span-3'>
                <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>{t('Code')}</p>
                <p className='font-bold'>{vehicule.code}</p>
              </div>
              <div className='col-span-2 space-y-1 rounded-md bg-gray-100 p-2 dark:bg-paper-dark-contrast sm:col-span-2'>
                <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                  {t('Weight')}
                </p>
                <p className='font-bold'>{fNumber(vehicule.weight)}</p>
              </div>
              <div className='col-span-2 space-y-1 rounded-md bg-gray-100 p-2 dark:bg-paper-dark-contrast sm:col-span-2'>
                <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                  {t('Volume')}
                </p>
                <p className='font-bold'>{fNumber(vehicule.volumne)}&sup2;</p>
              </div>
              <div className='col-span-2 space-y-1 rounded-md bg-gray-100 p-2 dark:bg-paper-dark-contrast sm:col-span-2'>
                <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                  {t('Max Capacity')}
                </p>
                <p className='font-bold'>
                  {fNumber(vehicule.maxCapacity)} {t('Kg')}
                </p>
              </div>
            </div>
          </div>
        )}
      </Sheet>
      <AlertDialog
        title={t('Confirm Delete')}
        description={
          <p className='py-1 text-sm text-red-500 dark:text-red-400'>
            {t('This action cannot be undone. This will permanently delete this vehicule.')}
          </p>
        }
        cancelText={t('Cancel')}
        confirmText={t('Yes, Delete')}
        onConfirm={() => {
          deleteVehicule({ id: vehicule?.id || '', PageNumber, PageSize })
            .then(() => {
              setOpenDeleteDialog(false)
              dispatch(closePreviewVehicule())
              open({
                message: t('Vehicule Deleted Successfully.'),
                autoHideDuration: 4000,
                type: 'success',
                variant: 'contained',
              })
            })
            .catch(() =>
              open({
                message: t('Sorry, Vehicule not deleted, A problem has occurred.'),
                autoHideDuration: 4000,
                type: 'error',
                variant: 'contained',
              })
            )
        }}
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        buttonProps={{ intent: 'error', loading: isDeleteLoading }}
      />
    </>
  )
}
