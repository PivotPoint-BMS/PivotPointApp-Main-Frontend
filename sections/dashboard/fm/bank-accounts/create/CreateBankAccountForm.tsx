import { useEffect } from 'react'
import * as Yup from 'yup'
// form
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, useForm } from 'react-hook-form'
// api
import { useCreateBankAccountMutation } from 'store/api/fm/bankAccountsApis'
// types
import { BankAccount } from 'types'
// config
import { BANK_ACCOUNT_TYPES } from 'config'
// hooks
import { useAppSelector } from 'store/hooks'
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// components
import Select from 'react-select'
import { Button } from 'components'
import { FormProvider, RHFFieldContainer, RHFTextField } from 'components/hook-form'

export default function CreateBankAccountForm({
  onSuccess,
  onFailure,
}: {
  onSuccess: () => void
  onFailure: () => void
}) {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const { PageNumber, PageSize } = useAppSelector((state) => state.pagination)
  const [
    createBankAccount,
    { isLoading: isCreateLoading, isSuccess: isCreateSuccess, isError: isCreateError },
  ] = useCreateBankAccountMutation()

  const LeadSchema = Yup.object().shape({
    title: Yup.string().min(3, t('Too short')).required(t('This field is required')),
    type: Yup.number().nullable().required(t('This field is required')),
    total: Yup.number().nullable().required(t('This field is required')),
  })

  const defaultValues = {
    title: '',
    type: '',
    total: '',
  }

  const methods = useForm<FieldValues>({
    resolver: yupResolver(LeadSchema),
    defaultValues,
  })

  const { handleSubmit, reset, setValue } = methods

  const onSubmit = async (data: FieldValues) => {
    const bankAccount: Omit<BankAccount, 'id'> = {
      title: data.title,
      type: data.type,
      total: data.total,
    }
    createBankAccount({ ...bankAccount, PageNumber, PageSize })
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
        message: t('Bank Account Added Successfully.'),
        autoHideDuration: 4000,
        type: 'success',
        variant: 'contained',
      })
      onSuccess()
    }
  }, [isCreateError, isCreateSuccess])

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className='mt-2 flex flex-col gap-4'>
        <RHFTextField name='title' label={t('Title')} />
        <RHFFieldContainer name='type' label={t('Type')}>
          <Select
            options={BANK_ACCOUNT_TYPES}
            getOptionLabel={(option) => option.label}
            onChange={(newValue) => {
              setValue('type', newValue?.value)
            }}
            className='react-select-container'
            classNamePrefix='react-select'
            placeholder=''
          />
        </RHFFieldContainer>
        <RHFTextField type='number' name='total' label={t('Total')} endAdornment={t('Da')} />
      </div>

      <div className='mt-6 flex w-full items-center justify-end gap-3'>
        <Button size='large' variant='outlined' intent='default' onClick={onFailure}>
          {t('Cancel')}
        </Button>
        <Button size='large' type='submit' loading={isCreateLoading}>
          {t('Add Bank Account')}
        </Button>
      </div>
    </FormProvider>
  )
}
