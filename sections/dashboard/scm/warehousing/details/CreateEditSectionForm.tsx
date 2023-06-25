import { useEffect, useMemo } from 'react'
import * as Yup from 'yup'
// form
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, useForm } from 'react-hook-form'
// api
import {
  useCreateWarehouseSectionMutation,
  useEditWarehouseSectionMutation,
} from 'store/api/scm/warehousing/warehouseSectionApis'
// types
import { WarehouseSection } from 'types'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// components
import { Button } from 'components'
import { FormProvider, RHFTextField } from 'components/hook-form'

export default function CreateEditSectionForm({
  onSuccess,
  onFailure,
  currentSection,
  isEdit,
  warehouseId,
}: {
  onSuccess: () => void
  onFailure: () => void
  isEdit: boolean
  currentSection: WarehouseSection | null
  warehouseId: string
}) {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const [
    createSection,
    { isLoading: isCreateLoading, isSuccess: isCreateSuccess, isError: isCreateError },
  ] = useCreateWarehouseSectionMutation()
  const [
    editSection,
    { isLoading: isEditLoading, isSuccess: isEditSuccess, isError: isEditError },
  ] = useEditWarehouseSectionMutation()

  const LeadSchema = Yup.object().shape({
    name: Yup.string()
      .max(2, t('Too long'))
      .min(2, t('Too short'))
      .required(t('This field is required')),
    maxCapacity: Yup.number().required(t('This field is required')),
  })

  const defaultValues = useMemo(
    () => ({
      name: currentSection?.name || '',
      maxCapacity: currentSection?.maxCapacity || '',
    }),
    [currentSection]
  )

  const methods = useForm<FieldValues>({
    resolver: yupResolver(LeadSchema),
    defaultValues,
  })

  const { handleSubmit, reset } = methods

  const onSubmit = async (data: FieldValues) => {
    const section: Omit<WarehouseSection, 'id'> & { warehouseId: string } = {
      name: data.name,
      maxCapacity: data.maxCapacity,
      h: 1,
      w: 1,
      x: 1,
      y: 1,
      warehouseId,
      sectionItems: currentSection?.sectionItems || [],
      currentCapacity: 0,
    }
    if (isEdit)
      editSection({
        id: currentSection?.id || '',
        data: section,
        warehouseId,
      })
    else createSection({ ...section, warehouseId })
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
        message: t('Section Added Successfully.'),
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
        message: t('Section Updated Successfully.'),
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
        <RHFTextField name='name' label={t('Code')} />
        <RHFTextField type='number' name='maxCapacity' label={t('Maximum Capacity')} />
      </div>

      <div className='mt-6 flex w-full items-center justify-end gap-3'>
        <Button size='large' variant='outlined' intent='default' onClick={onFailure}>
          {t('Cancel')}
        </Button>
        <Button size='large' type='submit' loading={isCreateLoading || isEditLoading}>
          {t('Add Section')}
        </Button>
      </div>
    </FormProvider>
  )
}
