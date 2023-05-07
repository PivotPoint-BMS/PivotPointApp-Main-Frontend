import { useEffect, useMemo } from 'react'
import * as Yup from 'yup'
// form
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, useForm } from 'react-hook-form'
// api
import { useCreateLeadSourceMutation, useEditLeadSourceMutation } from 'store/api/crm/leadSourceApi'
// types
import { LeadSource } from 'types/Lead'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import { Button } from 'components'
import { FormProvider, RHFTextField } from 'components/hook-form'
import useSnackbar from 'hooks/useSnackbar'

export default function CreateEditLeadSourceForm({
  currentLeadSource,
  isEdit,
  onSuccess,
  onFailure,
}: {
  currentLeadSource: LeadSource | null
  isEdit: boolean
  onSuccess: () => void
  onFailure: () => void
}) {
  const { t } = useTranslate()
  const { open } = useSnackbar()

  const [
    createLeadSource,
    { isLoading: isCreateLoading, isSuccess: isCreateSuccess, isError: isCreateError },
  ] = useCreateLeadSourceMutation()
  const [
    editLeadSource,
    { isLoading: isEditLoading, isSuccess: isEditSuccess, isError: isEditError },
  ] = useEditLeadSourceMutation()

  const LeadSchema = Yup.object().shape({
    source: Yup.string().min(3, t('Too short')).required(t('This field is required')),
    sourceLink: Yup.string().min(3, t('Too short')).required(t('This field is required')),
  })

  const defaultValues = useMemo(
    () => ({
      source: currentLeadSource?.source || '',
      sourceLink: currentLeadSource?.sourceLink || '',
    }),
    [currentLeadSource]
  )

  const methods = useForm<FieldValues>({
    resolver: yupResolver(LeadSchema),
    defaultValues,
  })

  const { handleSubmit, reset } = methods

  const onSubmit = async (data: FieldValues) => {
    const leadSource: LeadSource = { source: data.source, sourceLink: data.sourceLink }
    if (isEdit) editLeadSource({ data: leadSource, id: currentLeadSource?.id || '' })
    else createLeadSource(leadSource)
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
          ? t('Lead Source Updated Successfully.')
          : t('Lead Source Added Successfully.'),
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
        <RHFTextField name='source' label={t('Source')} />
        <RHFTextField name='sourceLink' label={t('Source Link')} />
      </div>

      <div className='mt-6 flex w-full items-center justify-end gap-3'>
        <Button size='large' variant='outlined' intent='default' onClick={onFailure}>
          {t('Cancel')}
        </Button>
        <Button size='large' type='submit' loading={isEditLoading || isCreateLoading}>
          {isEdit ? t('Edit Lead Source') : t('Add Lead Source')}
        </Button>
      </div>
    </FormProvider>
  )
}
