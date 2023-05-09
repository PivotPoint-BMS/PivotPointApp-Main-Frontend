import { useCallback, useEffect, useMemo, useState } from 'react'
import * as Yup from 'yup'
import Autosuggest from 'react-autosuggest'
// next
import { useRouter } from 'next/router'
// form
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, useForm } from 'react-hook-form'
import { useCreateLeadMutation, useEditLeadMutation } from 'store/api/crm/contact-leads/leadApis'
import { useGetLeadSourcesQuery } from 'store/api/crm/contact-leads/leadSourceApi'
// config
import { PIVOTPOINT_API } from 'config'
// utils
import { fData } from 'utils/formatNumber'
// types
import Lead, { LeadSource } from 'types/Lead'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// components
import { Card, CardContent, Button, LoadingIndicator } from 'components'
import { FormProvider, RHFTextField } from 'components/hook-form'
import RHFUploadAvatar from 'components/hook-form/RHFUpload'
import { PATH_DASHBOARD } from 'routes/paths'

export default function CreateEditLeadForm({
  isEdit,
  currentLead,
}: {
  isEdit?: boolean
  currentLead?: Lead
}) {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const { push } = useRouter()
  const { data: sources, isLoading } = useGetLeadSourcesQuery()
  const [
    createLead,
    { isLoading: isCreateLoading, isError: isCreateError, isSuccess: isCreateSuccess },
  ] = useCreateLeadMutation()
  const [editLead, { isLoading: isEditLoading, isError: isEditError, isSuccess: isEditSuccess }] =
    useEditLeadMutation()
  const [suggestions, setSuggestions] = useState<LeadSource[]>([])

  const LeadSchema = Yup.object().shape({
    Image: Yup.mixed().required(t('Image is required')),
    fullName: Yup.string().min(3, t('Too short')).required(t('This field is required')),
    email: Yup.string()
      .email(t('Email must be a valid email address'))
      .required(t('Email is required')),
    phoneNumber: Yup.string().matches(
      /^(\+\d{1,3} \d{9}|0\d{9})$/,
      t('Phone number must be valid')
    ),
    jobTitle: Yup.string().min(3, t('Too short')),
    status: Yup.number(),
    city: Yup.string().required(t('This field is required')),
    country: Yup.string().required(t('This field is required')),
    LeadSourceId: Yup.string().required(t('This field is required')),
  })

  const defaultValues = useMemo(
    () => ({
      Image:
        currentLead && currentLead?.Image.length > 0
          ? `${PIVOTPOINT_API.crmPicUrl}/${currentLead?.Image}`
          : null,
      fullName: currentLead?.fullName || '',
      email: currentLead?.email || '',
      phoneNumber: currentLead?.phoneNumber || '',
      jobTitle: currentLead?.jobTitle || '',
      LeadSourceId: currentLead?.leadSource?.id || '',
      city: currentLead?.address.city || '',
      country: currentLead?.address.country || '',
    }),
    [currentLead]
  )

  const methods = useForm<FieldValues>({
    resolver: yupResolver(LeadSchema),
    defaultValues,
  })

  const { handleSubmit, setValue, getValues, reset } = methods

  const onSubmit = async (data: FieldValues) => {
    const formData = new FormData()
    if (typeof data.Image !== 'string') formData.append('Image', data.Image)
    formData.append('fullName', data.fullName)
    formData.append('email', data.email)
    formData.append('phoneNumber', data.phoneNumber)
    formData.append('jobTitle', data.jobTitle)
    formData.append('LeadSourceId', data.LeadSourceId)
    formData.append('city', data.city)
    formData.append('country', data.country)

    if (isEdit) editLead({ data: formData, id: currentLead?.id || '' })
    else createLead(formData)
  }

  // AutoSuggest
  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    return inputLength === 0
      ? []
      : sources?.data.filter(
          (source) =>
            source.source.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 ||
            source.sourceLink.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
        ) || []
  }

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSuggestions(getSuggestions(value))
  }

  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  }

  const getSuggestionValue = (suggestion: LeadSource) => suggestion.id || ''

  const renderSuggestion = (suggestion: LeadSource) => (
    <div className='flex flex-col gap-1 p-1'>
      <p>
        <span className='font-medium'>{t('Source:')}</span> {suggestion.source}
      </p>
      <p>
        <span className='font-medium'>{t('Source Link:')}</span> {suggestion.sourceLink}
      </p>
    </div>
  )

  //

  // ImageUpload
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]

      if (file) {
        setValue(
          'Image',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      }
    },
    [setValue]
  )
  //

  useEffect(() => {
    if (isEdit && currentLead) {
      reset(defaultValues)
    }
    if (!isEdit) {
      reset(defaultValues)
    }
  }, [isEdit, currentLead])

  useEffect(() => {
    if (isEdit && currentLead) {
      reset(defaultValues)
    }
    if (!isEdit) {
      reset(defaultValues)
    }
  }, [isEdit, currentLead])

  useEffect(() => {
    if (isCreateError || isEditError) {
      open({
        message: t('A problem has occured.'),
        autoHideDuration: 4000,
        type: 'error',
        variant: 'contained',
      })
    }
    if (isCreateSuccess || isEditSuccess) {
      reset()
      open({
        message: isEdit ? t('Lead Updated Successfully.') : t('Lead Added Successfully.'),
        autoHideDuration: 4000,
        type: 'success',
        variant: 'contained',
      })
      push({
        pathname: PATH_DASHBOARD.crm['contacts-leads'].root,
        query: { tab: 'leads' },
      })
    }
  }, [isCreateError, isEditError, isCreateSuccess, isEditSuccess])

  return isLoading ? (
    <div className='flex h-56 w-full items-center justify-center'>
      <LoadingIndicator />
    </div>
  ) : (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        <Card fullWidth>
          <CardContent>
            <h6 className='mb-3 text-lg font-semibold'>{t('Lead Image')}</h6>
            <RHFUploadAvatar
              name='Image'
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <p className='mx-auto block text-center text-xs text-gray-600 dark:text-gray-400'>
                  {t('Allowed *.jpeg, *.jpg, *.png, *.gif')}
                  <br /> {t('max size of')} {fData(3145728)}
                </p>
              }
            />
          </CardContent>
        </Card>
        <Card fullWidth className='md:col-span-2'>
          <CardContent className='flex flex-col'>
            <h6 className='mb-5 text-lg font-semibold'>{t('Lead Informations')}</h6>
            <div className='mb-6 grid gap-6 sm:grid-cols-2'>
              <RHFTextField name='fullName' label={t('Full Name')} />
              <RHFTextField name='email' label={t('Email')} />
              <RHFTextField name='phoneNumber' label={t('Phone Number')} />
              <RHFTextField name='jobTitle' label={t('Job Title')} />
            </div>
            <h6 className='mb-5 text-lg font-semibold'>{t('Source Informations')}</h6>
            <div className='mb-6'>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                alwaysRenderSuggestions
                highlightFirstSuggestion
                inputProps={{
                  value: getValues('LeadSourceId'),
                  onChange: (e, { newValue }) => {
                    setValue('LeadSourceId', newValue)
                  },
                }}
              />
            </div>
            <h6 className='mb-5 text-lg font-semibold'>{t('Address Informations')}</h6>
            <div className='md: grid grid-cols-1 gap-6 sm:grid-cols-2 '>
              <RHFTextField name='country' label={t('Country')} />
              <RHFTextField name='city' label={t('City')} />
            </div>
            <div className='mt-6 flex w-full items-center justify-center'>
              <Button size='large' type='submit' loading={isCreateLoading || isEditLoading}>
                {isEdit ? t('Edit Lead') : t('Add Lead')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </FormProvider>
  )
}
