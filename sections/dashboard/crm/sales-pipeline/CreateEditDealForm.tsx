import { useEffect, useMemo, useState } from 'react'
import * as Yup from 'yup'
// form
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, useForm } from 'react-hook-form'
// api
import { useCreateDealMutation } from 'store/api/crm/sales-pipeline/dealsBoardsApi'
// types
import { Deal } from 'types'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import Select from 'react-select'
import { Button } from 'components'
import { FormProvider, RHFTextField } from 'components/hook-form'
import useSnackbar from 'hooks/useSnackbar'
import RHFTextArea from 'components/hook-form/RHFTextArea'
import { useGetLeadsQuery } from 'store/api/crm/contact-leads/leadApis'

export default function CreateEditDealForm({
  columnId,
  currentDeal,
  isEdit,
  onSuccess,
  onFailure,
}: {
  columnId: string
  currentDeal: Deal | null
  isEdit: boolean
  onSuccess: () => void
  onFailure: () => void
}) {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const {
    data: leadsResponse,
    isSuccess,
    isLoading,
  } = useGetLeadsQuery({ IsContact: false, IsLead: true })
  const [
    createDeal,
    { isLoading: isCreateLoading, isSuccess: isCreateSuccess, isError: isCreateError },
  ] = useCreateDealMutation()
  const [leads, setLeads] = useState<{ value: string; label: string }[]>(
    isSuccess ? leadsResponse?.data.map((lead) => ({ value: lead.id, label: lead.fullName })) : []
  )
  //   const [edit, { isLoading: isEditLoading, isSuccess: isEditSuccess, isError: isEditError }] =
  //     useEditMutation()

  useEffect(() => {
    if (isSuccess)
      setLeads(leadsResponse?.data.map((lead) => ({ value: lead.id, label: lead.fullName })))
  }, [isLoading])

  const Schema = Yup.object().shape({
    title: Yup.string().min(3, t('Too short')).required(t('This field is required')),
    type: Yup.number().required(t('This field is required')),
    tags: Yup.string().min(3, t('Too short')).required(t('This field is required')),
    leadIds: Yup.array().required(t('This field is required')),
  })

  const defaultValues = useMemo(
    () => ({
      title: currentDeal?.title || '',
      potentialDealValue: currentDeal?.potentialDealValue || '',
      type: currentDeal?.type || '',
      tags: currentDeal?.tags || '',
      leadIds: currentDeal?.tags || [],
      columnId,
    }),
    [currentDeal]
  )

  const methods = useForm<FieldValues>({
    resolver: yupResolver(Schema),
    defaultValues,
  })

  const { handleSubmit, reset } = methods

  const onSubmit = async (data: FieldValues) => {
    const deal: Omit<Deal, 'id'> & { columnId: string } = {
      description: data.description,
      columnId,
      leadIds: data.leadIds,
      potentialDealValue: 0,
      successProbability: 0,
      tags: data.tags,
      title: data.title,
      type: data.type,
    }
    // if (isEdit) edit({ data: deal, id: currentDeal?.id || '' })
    createDeal(deal)
  }

  useEffect(() => {
    if (isCreateError) {
      open({
        message: t('A problem has occured.'),
        autoHideDuration: 4000,
        type: 'error',
        variant: 'contained',
      })
      onFailure()
    }
    if (isCreateSuccess) {
      reset()
      open({
        message:
          // isEditSuccess
          // ? t(' Updated Successfully.')
          //   :
          t('Deal Added Successfully.'),
        autoHideDuration: 4000,
        type: 'success',
        variant: 'contained',
      })
      onSuccess()
    }
  }, [isCreateError, isCreateSuccess])

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className='mt-2 grid grid-cols-1 gap-4 md:grid-cols-2'>
        <RHFTextField name='title' label={t('Title')} />
        <RHFTextField name='type' label={t('Type')} type='number' />
        <div className='md:col-span-2'>
          <RHFTextField name='tags' label={t('Tags (Comma Separated)')} />{' '}
        </div>
        <div className='md:col-span-2'>
          <RHFTextArea name='description' label={t('Description')} />
        </div>
        <div className='md:col-span-2'>
          <Select
            options={leads}
            isMulti
            isLoading={isLoading}
            className='react-select-container'
            classNamePrefix='react-select'
          />
        </div>{' '}
      </div>

      <div className='mt-6 flex w-full items-center justify-end gap-3'>
        <Button size='large' variant='outlined' intent='default' onClick={onFailure}>
          {t('Cancel')}
        </Button>
        <Button size='large' type='submit' loading={isCreateLoading}>
          {isEdit ? t('Edit Deal') : t('Add Deal')}
        </Button>
      </div>
    </FormProvider>
  )
}
