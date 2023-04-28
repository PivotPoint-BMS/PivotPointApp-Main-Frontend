import { useEffect } from 'react'
import * as Yup from 'yup'
// form
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, useForm } from 'react-hook-form'
// api
import { useCreateLeadSourceMutation } from 'store/api/crm/crmApis'
// types
import { LeadSource } from 'types/Lead'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import { Card, CardContent, Button } from 'components'
import { FormProvider, RHFTextField } from 'components/hook-form'
import useSnackbar from 'hooks/useSnackbar'

export default function CreateLeadSourceForm() {
  const { t } = useTranslate()
  const { open } = useSnackbar()

  const [createLeadSource, { isLoading, isSuccess, isError }] = useCreateLeadSourceMutation()

  const LeadSchema = Yup.object().shape({
    source: Yup.string().min(3, t('Too short')).required(t('This field is required')),
    sourceLink: Yup.string().min(3, t('Too short')).required(t('This field is required')),
  })

  const defaultValues = {
    source: '',
    sourceLink: '',
  }

  const methods = useForm<FieldValues>({
    resolver: yupResolver(LeadSchema),
    defaultValues,
  })

  const { handleSubmit, reset } = methods

  const onSubmit = async (data: FieldValues) => {
    const leadSource: LeadSource = { source: data.source, sourceLink: data.sourceLink }
    createLeadSource(leadSource)
  }

  useEffect(() => {
    if (isError) {
      open({
        message: t('A problem has occured.'),
        autoHideDuration: 4000,
        type: 'error',
        variant: 'contained',
      })
    }
    if (isSuccess) {
      reset()
      open({
        message: t('Lead Source Added Successfully.'),
        autoHideDuration: 4000,
        type: 'success',
        variant: 'contained',
      })
    }
  }, [isError, isSuccess])

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card fullWidth>
        <CardContent className='flex flex-col'>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <RHFTextField name='source' label={t('Source')} />
            <RHFTextField name='sourceLink' label={t('Source Link')} />
          </div>

          <div className='mt-6 flex w-full items-center justify-center'>
            <Button size='large' type='submit' loading={isLoading}>
              {t('Add Lead Source')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </FormProvider>
  )
}
