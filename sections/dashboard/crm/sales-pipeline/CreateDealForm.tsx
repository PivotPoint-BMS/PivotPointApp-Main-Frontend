import { useEffect, useState } from 'react'
import * as Yup from 'yup'
// form
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, useForm } from 'react-hook-form'
// api
import { useCreateDealMutation } from 'store/api/crm/sales-pipeline/dealsBoardsApi'
// config
import { DEALTYPES } from 'config'
// types
import { Deal } from 'types'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import Select from 'react-select'
import { RHFField, Button } from 'components'
import { FormProvider, RHFTextField } from 'components/hook-form'
import useSnackbar from 'hooks/useSnackbar'
import RHFTextArea from 'components/hook-form/RHFTextArea'
import { useGetContactsQuery, useGetLeadsQuery } from 'store/api/crm/contact-leads/leadApis'

export default function CreateDealForm({
  columnId,
  boardId,
  isEdit,
  onSuccess,
  onFailure,
}: {
  columnId: string
  boardId: string
  isEdit: boolean
  onSuccess: () => void
  onFailure: () => void
}) {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const [type, setType] = useState<{ value: number; label: string } | null>(null)
  // Query
  const {
    data: leadsResponse,
    isSuccess,
    isLoading,
  } = useGetLeadsQuery({ PageNumber: 1, PageSize: 50 })
  const {
    data: contactsResponse,
    isSuccess: isContactsSuccess,
    isLoading: isContactsLoading,
  } = useGetContactsQuery({ PageNumber: 1, PageSize: 50 })
  // Mutation
  const [
    createDeal,
    { isLoading: isCreateLoading, isSuccess: isCreateSuccess, isError: isCreateError },
  ] = useCreateDealMutation()
  const [leads, setLeads] = useState<{ value: string; label: string }[]>(
    isSuccess ? leadsResponse?.data.map((lead) => ({ value: lead.id, label: lead.fullName })) : []
  )
  const [contacts, setContacts] = useState<{ value: string; label: string }[]>(
    isContactsSuccess
      ? contactsResponse?.data.map((contact) => ({ value: contact.id, label: contact.fullName }))
      : []
  )

  useEffect(() => {
    if (isSuccess)
      setLeads(leadsResponse?.data.map((lead) => ({ value: lead.id, label: lead.fullName })))
  }, [isLoading])

  useEffect(() => {
    if (isContactsSuccess)
      setContacts(
        contactsResponse?.data.map((contact) => ({ value: contact.id, label: contact.fullName }))
      )
  }, [isContactsLoading])

  const Schema = Yup.object().shape({
    title: Yup.string().min(3, t('Too short')).required(t('This field is required')),
    type: Yup.number().required(t('This field is required')),
    tags: Yup.string().min(3, t('Too short')).required(t('This field is required')),
    leads: Yup.array(),
  })

  const defaultValues = {
    title: '',
    type: '',
    tags: '',
    leadIds: [],
    leads: [],
    columnId,
    potentialDealValue: '',
    successProbability: '',
  }

  const methods = useForm<FieldValues>({
    resolver: yupResolver(Schema),
    defaultValues,
  })

  const { handleSubmit, reset, setValue } = methods

  const onSubmit = async (data: FieldValues) => {
    const deal: Partial<Deal> & { columnId: string; boardId: string } = {
      description: data.description,
      columnId,
      boardId,
      leadIds: data.leads.map((item: { value: string; label: string }) => item.value),
      potentialDealValue: data.potentialDealValue !== '' ? data.potentialDealValue : 0,
      successProbability: data.successProbability !== '' ? data.successProbability : 0,
      tags: data.tags,
      title: data.title,
      type: data.type,
    }
    createDeal(deal)
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
        message: t('Deal Added Successfully.'),
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
        <RHFField name='type' label={t('Type')}>
          <Select
            options={DEALTYPES.map((item) => ({ value: item.value, label: t(item.label) }))}
            getOptionLabel={(option) => t(option.label)}
            isLoading={isLoading}
            onChange={(newValue) => {
              setValue('type', newValue?.value)
              setType(newValue)
            }}
            value={type}
            isSearchable={false}
            className='react-select-container'
            classNamePrefix='react-select'
            placeholder=''
          />
        </RHFField>
        <RHFTextField
          type='number'
          name='potentialDealValue'
          label={t('Potential Deal Value')}
          endAdornment={t('Da')}
        />
        <RHFTextField
          type='number'
          name='successProbability'
          label={t('Success Probability')}
          endAdornment={t('%')}
        />
        <div className='md:col-span-2'>
          <RHFTextField name='tags' label={t('Tags (Comma Separated)')} />{' '}
        </div>
        <div className='md:col-span-2'>
          <RHFTextArea name='description' label={t('Description')} />
        </div>
        <div className='md:col-span-2'>
          {type && type.value === 1 && (
            <RHFField name='leads' label={t('Leads')}>
              <Select
                options={leads}
                isMulti
                isLoading={isLoading}
                onChange={(newValue) => {
                  setValue(
                    'leads',
                    newValue?.map((id) => id)
                  )
                }}
                placeholder=''
                className='react-select-container'
                classNamePrefix='react-select'
              />
            </RHFField>
          )}
          {type && type.value === 2 && (
            <RHFField name='leadIds' label={t('Contacts')}>
              <Select
                options={contacts}
                isMulti
                isLoading={isLoading}
                onChange={(newValue) => {
                  setValue(
                    'leadIds',
                    newValue?.map((id) => id)
                  )
                }}
                placeholder=''
                className='react-select-container'
                classNamePrefix='react-select'
              />
            </RHFField>
          )}
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
