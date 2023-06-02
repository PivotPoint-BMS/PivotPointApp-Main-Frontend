import { useEffect } from 'react'
import * as Yup from 'yup'
// form
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, useForm } from 'react-hook-form'
// api
import { useCreateSupplierMutation } from 'store/api/scm/products-service/suppliersApis'
// types
import { Supplier } from 'types'
// hooks
import { useAppSelector } from 'store/hooks'
import useTranslate from 'hooks/useTranslate'
// components
import { Button } from 'components'
import { FormProvider, RHFTextField } from 'components/hook-form'
import useSnackbar from 'hooks/useSnackbar'

export default function CreateSupplierForm({
  onSuccess,
  onFailure,
}: {
  onSuccess: () => void
  onFailure: () => void
}) {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const { PageNumber, PageSize } = useAppSelector((state) => state.paggination)
  const [
    createSupplier,
    { isLoading: isCreateLoading, isSuccess: isCreateSuccess, isError: isCreateError },
  ] = useCreateSupplierMutation()

  const LeadSchema = Yup.object().shape({
    name: Yup.string().min(3, t('Too short')).required(t('This field is required')),
    address: Yup.string().min(3, t('Too short')).required(t('This field is required')),
    email: Yup.string()
      .email(t('Email must be a valid email address'))
      .required(t('Email is required')),
    phoneNumber: Yup.string().matches(
      /^(\+\d{1,3} \d{9}|0\d{9})$/,
      t('Phone number must be valid')
    ),
  })

  const defaultValues = {
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
  }

  const methods = useForm<FieldValues>({
    resolver: yupResolver(LeadSchema),
    defaultValues,
  })

  const { handleSubmit, reset } = methods

  const onSubmit = async (data: FieldValues) => {
    const supplier: Omit<Supplier, 'id'> = {
      name: data.name,
      address: data.address,
      email: data.email,
      phoneNumber: data.phoneNumber,
    }
    createSupplier({ ...supplier, PageNumber, PageSize })
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
        message: t('Supplier Added Successfully.'),
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
        <RHFTextField name='name' label={t('Full Name')} />
        <RHFTextField type='email' name='email' label={t('Email')} />
        <RHFTextField type='number' name='phoneNumber' label={t('Phone Number')} />
        <RHFTextField name='address' label={t('Address')} />
      </div>

      <div className='mt-6 flex w-full items-center justify-end gap-3'>
        <Button size='large' variant='outlined' intent='default' onClick={onFailure}>
          {t('Cancel')}
        </Button>
        <Button size='large' type='submit' loading={isCreateLoading}>
          {t('Add Supplier')}
        </Button>
      </div>
    </FormProvider>
  )
}
