import { useEffect, useMemo } from 'react'
import * as Yup from 'yup'
// form
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, useForm } from 'react-hook-form'
// api
import {
  useCreateCategoryMutation,
  useEditCategoryMutation,
} from 'store/api/scm/products-service/productsApi'
// types
import { Category } from 'types'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import { Button } from 'components'
import { FormProvider, RHFTextField } from 'components/hook-form'
import useSnackbar from 'hooks/useSnackbar'

export default function CreateEditCategoryForm({
  currentCategory,
  isEdit,
  onSuccess,
  onFailure,
}: {
  currentCategory: Category | null
  isEdit: boolean
  onSuccess: () => void
  onFailure: () => void
}) {
  const { t } = useTranslate()
  const { open } = useSnackbar()

  const [
    createCategory,
    { isLoading: isCreateLoading, isSuccess: isCreateSuccess, isError: isCreateError },
  ] = useCreateCategoryMutation()
  const [
    editCategory,
    { isLoading: isEditLoading, isSuccess: isEditSuccess, isError: isEditError },
  ] = useEditCategoryMutation()

  const LeadSchema = Yup.object().shape({
    name: Yup.string().min(3, t('Too short')).required(t('This field is required')),
  })

  const defaultValues = useMemo(
    () => ({
      name: currentCategory?.name || '',
    }),
    [currentCategory]
  )

  const methods = useForm<FieldValues>({
    resolver: yupResolver(LeadSchema),
    defaultValues,
  })

  const { handleSubmit, reset } = methods

  const onSubmit = async (data: FieldValues) => {
    const category: Omit<Category, 'id'> = { name: data.name }
    if (isEdit) editCategory({ name: data.name, id: currentCategory?.id || '' })
    else createCategory(category)
  }

  useEffect(() => {
    if (isCreateError || isEditError) {
      open({
        message: t('A problem has occured.'),
        autoHideDuration: 4000,
        type: 'error',
        variant: 'contained',
      })
      onFailure()
    }
    if (isCreateSuccess || isEditSuccess) {
      reset()
      open({
        message: isEditSuccess
          ? t('Category Updated Successfully.')
          : t('Category Added Successfully.'),
        autoHideDuration: 4000,
        type: 'success',
        variant: 'contained',
      })
      onSuccess()
    }
  }, [isCreateError, isEditError, isCreateSuccess, isEditSuccess])

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className='mt-2 flex flex-col gap-4'>
        <RHFTextField name='name' label={t('Name')} />
      </div>

      <div className='mt-6 flex w-full items-center justify-end gap-3'>
        <Button size='large' variant='outlined' intent='default' onClick={onFailure}>
          {t('Cancel')}
        </Button>
        <Button size='large' type='submit' loading={isEditLoading || isCreateLoading}>
          {isEdit ? t('Edit Category') : t('Add Category')}
        </Button>
      </div>
    </FormProvider>
  )
}
