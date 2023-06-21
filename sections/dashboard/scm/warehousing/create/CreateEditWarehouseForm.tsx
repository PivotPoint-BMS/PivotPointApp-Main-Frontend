import { useEffect, useMemo } from 'react'
import * as Yup from 'yup'
// form
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, useForm } from 'react-hook-form'
// api
import {
  useCreateWarehouseMutation,
  useEditWarehouseMutation,
} from 'store/api/scm/warehousing/warehousingApis'
// types
import { Warehouse } from 'types'
// hooks
import { useAppSelector } from 'store/hooks'
import useTranslate from 'hooks/useTranslate'
// components
import { Button } from 'components'
import { FormProvider, RHFTextField } from 'components/hook-form'
import useSnackbar from 'hooks/useSnackbar'

export default function CreateEditWarehouseForm({
  onSuccess,
  onFailure,
  currentWarehouse,
  isEdit,
}: {
  onSuccess: () => void
  onFailure: () => void
  isEdit: boolean
  currentWarehouse: Warehouse | null
}) {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const { PageNumber, PageSize } = useAppSelector((state) => state.paggination)
  const [
    createWarehouse,
    { isLoading: isCreateLoading, isSuccess: isCreateSuccess, isError: isCreateError },
  ] = useCreateWarehouseMutation()
  const [
    editWarehouse,
    { isLoading: isEditLoading, isSuccess: isEditSuccess, isError: isEditError },
  ] = useEditWarehouseMutation()

  const LeadSchema = Yup.object().shape({
    name: Yup.string().min(3, t('Too short')).required(t('This field is required')),
    location: Yup.string().min(3, t('Too short')).required(t('This field is required')),
  })

  const defaultValues = useMemo(
    () => ({
      name: currentWarehouse?.name || '',
      location: currentWarehouse?.location || '',
    }),
    [currentWarehouse]
  )

  const methods = useForm<FieldValues>({
    resolver: yupResolver(LeadSchema),
    defaultValues,
  })

  const { handleSubmit, reset } = methods

  const onSubmit = async (data: FieldValues) => {
    const warehouse: Omit<Warehouse, 'id'> = {
      name: data.name,
      location: data.location,
    }
    if (isEdit)
      editWarehouse({
        id: currentWarehouse?.id || '',
        data: warehouse,
        PageNumber,
        PageSize,
      })
    else createWarehouse({ ...warehouse, PageNumber, PageSize })
  }

  useEffect(() => {
    if (isCreateError) {
      open({
        message: t('A problem has occurred.'),
        autoHideDuration: 4000,
        type: 'error',
        variant: 'contained',
      })
      onFailure()
    }
    if (isCreateSuccess) {
      reset()
      open({
        message: t('Warehouse Added Successfully.'),
        autoHideDuration: 4000,
        type: 'success',
        variant: 'contained',
      })
      onSuccess()
    }
  }, [isCreateError, isCreateSuccess])

  useEffect(() => {
    if (isEditError) {
      open({
        message: t('A problem has occurred.'),
        autoHideDuration: 4000,
        type: 'error',
        variant: 'contained',
      })
      onFailure()
    }
    if (isEditSuccess) {
      reset()
      open({
        message: t('Warehouse Updated Successfully.'),
        autoHideDuration: 4000,
        type: 'success',
        variant: 'contained',
      })
      onSuccess()
    }
  }, [isEditError, isEditSuccess])

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className='mt-2 flex flex-col gap-4'>
        <RHFTextField name='name' label={t('Name')} />
        <RHFTextField name='location' label={t('Location')} />
      </div>

      <div className='mt-6 flex w-full items-center justify-end gap-3'>
        <Button size='large' variant='outlined' intent='default' onClick={onFailure}>
          {t('Cancel')}
        </Button>
        <Button size='large' type='submit' loading={isCreateLoading || isEditLoading}>
          {t('Add Warehouse')}
        </Button>
      </div>
    </FormProvider>
  )
}
