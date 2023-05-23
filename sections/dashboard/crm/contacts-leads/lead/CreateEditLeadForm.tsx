import { useCallback, useEffect, useMemo, useState } from 'react'
import * as Yup from 'yup'
// next
import { useRouter } from 'next/router'
// form
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, useForm } from 'react-hook-form'
import {
  getLead,
  getRunningQueriesThunk,
  invalidateTags,
  useCreateLeadMutation,
  useEditLeadMutation,
} from 'store/api/crm/contact-leads/leadApis'
import {
  getRunningQueriesThunk as addressGetRunningQueriesThunk,
  getCountries,
  useGetCitiesQuery,
  useGetCountriesQuery,
} from 'store/api/crm/contact-leads/addressApi'
import { wrapper } from 'store'
import { getLeadSources, useGetLeadSourcesQuery } from 'store/api/crm/contact-leads/leadSourceApi'
// config
import { PIVOTPOINT_API } from 'config'
// utils
import { fData } from 'utils/formatNumber'
// types
import Lead from 'types/Lead'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// components
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import {
  Card,
  CardContent,
  Button,
  LoadingIndicator,
  AutoComplete,
  Select as MySelect,
  Slider,
} from 'components'
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
  const { data: sources, isLoading, isSuccess } = useGetLeadSourcesQuery()
  const {
    data: countries,
    isLoading: isCountriesLoading,
    isSuccess: isCountriesSuccess,
  } = useGetCountriesQuery()
  const [
    createLead,
    { isLoading: isCreateLoading, isError: isCreateError, isSuccess: isCreateSuccess },
  ] = useCreateLeadMutation()
  const [editLead, { isLoading: isEditLoading, isError: isEditError, isSuccess: isEditSuccess }] =
    useEditLeadMutation()

  const [sourcesList, setSourcesList] = useState<{ value: string; label: string }[]>([])
  const [coutriesList, setCoutriesList] = useState<{ value: string; label: string }[]>([])
  const [citiesList, setCitiesList] = useState<{ value: string; label: string }[]>([])
  const [income, setIncome] = useState(0)
  const [city, setCity] = useState<{ value: string; label: string } | null>(null)
  const [country, setCountry] = useState<{ value: string; label: string } | null>(null)
  const [source, setSource] = useState<{ value: string; label: string } | null>(null)
  const [priority, setPriority] = useState('0')

  const PRIORITIES = [
    { value: '0', label: t('Unassined') },
    { value: '1', label: t('Low') },
    { value: '2', label: t('Medium') },
    { value: '3', label: t('High') },
  ]

  const LeadSchema = Yup.object().shape({
    picture: Yup.mixed().required(t('Image is required')),
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
    priority: Yup.number().required(t('This field is required')),
    spendingScore: Yup.number(),
    incomeK: Yup.number().required(t('This field is required')),
    LeadSourceId: Yup.string().required(t('This field is required')),
  })

  const defaultValues = useMemo(
    () => ({
      picture:
        currentLead && currentLead?.picture.length > 0
          ? `${PIVOTPOINT_API.crmPicUrl}/${currentLead?.picture}`
          : null,
      fullName: currentLead?.fullName || '',
      email: currentLead?.email || '',
      phoneNumber: currentLead?.phoneNumber || '',
      jobTitle: currentLead?.jobTitle || '',
      LeadSourceId: currentLead?.leadSource?.id || '',
      city: currentLead?.address.city || '',
      priority: currentLead?.priority || 0,
      country: currentLead?.address.country || '',
      incomeK: 0,
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
    if (typeof data.picture !== 'string') formData.append('picture', data.picture)
    formData.append('fullName', data.fullName)
    formData.append('email', data.email)
    formData.append('phoneNumber', data.phoneNumber)
    formData.append('jobTitle', data.jobTitle)
    formData.append('LeadSourceId', data.LeadSourceId)
    formData.append('city', data.city)
    formData.append('country', data.country)
    formData.append('incomeK', String(income))
    formData.append('priority', priority)
    if (isEdit) editLead({ data: formData, id: currentLead?.id || '' })
    else createLead(formData)
    invalidateTags(['Leads', 'Lead'])
  }

  const {
    data: cities,
    isLoading: isCitiesLoading,
    isSuccess: isCitiesSuccess,
    refetch,
  } = useGetCitiesQuery(getValues('country'), { refetchOnMountOrArgChange: true })

  // ImageUpload
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]

      if (file) {
        setValue(
          'picture',
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
      setCity({
        value: currentLead.address.city,
        label: currentLead.address.city,
      })
      setCountry({
        value: currentLead.address.country,
        label: currentLead.address.country,
      })
      setSource({
        value: currentLead.leadSource.id || '',
        label: currentLead.leadSource.source || '',
      })
      setIncome(currentLead.incomeK || 0)
      setPriority(String(currentLead.priority) || '0')
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

  useEffect(() => {
    if (isSuccess)
      setSourcesList(
        sources.data.map((newSource) => ({
          value: newSource.id as string,
          label: newSource.source,
        }))
      )
  }, [isLoading])
  useEffect(() => {
    if (isCountriesSuccess)
      setCoutriesList(
        countries.data.map((newCountry) => ({ value: newCountry, label: newCountry }))
      )
  }, [isCountriesLoading])
  useEffect(() => {
    if (isCitiesSuccess)
      setCitiesList(cities.data.map((newCity) => ({ value: newCity, label: newCity })))
  }, [isCitiesLoading])

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
              name='picture'
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
        <Card fullWidth className='!overflow-visible md:col-span-2'>
          <CardContent className='flex flex-col !overflow-visible'>
            <h6 className='mb-5 text-lg font-semibold'>{t('Lead Informations')}</h6>
            <div className='mb-6 grid gap-6 sm:grid-cols-2'>
              <RHFTextField name='fullName' label={t('Full Name')} />
              <RHFTextField name='email' label={t('Email')} />
              <RHFTextField name='phoneNumber' label={t('Phone Number')} />
              <RHFTextField name='jobTitle' label={t('Job Title')} />
            </div>
            <h6 className='mb-5 text-lg font-semibold'>{t('Source Informations')}</h6>
            <div className='mb-6'>
              <AutoComplete name='LeadSourceId'>
                <Select
                  options={sourcesList}
                  isLoading={isLoading}
                  onChange={(newValue) => {
                    setValue('LeadSourceId', newValue?.value)
                    setSource(newValue)
                  }}
                  value={source}
                  className='react-select-container'
                  classNamePrefix='react-select'
                />
              </AutoComplete>
            </div>
            <h6 className='mb-5 text-lg font-semibold'>{t('Address Informations')}</h6>
            <div className='mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 '>
              <AutoComplete label={t('Country')} name='country'>
                <CreatableSelect
                  options={coutriesList}
                  isLoading={isCountriesLoading}
                  onChange={(newValue) => {
                    setValue('country', newValue?.value)
                    setCountry(newValue)
                    refetch()
                  }}
                  value={country}
                  // TODO: Add country api
                  // onCreateOption={(value) =>
                  //   setCoutriesList((prevState) => {
                  //     prevState.push({ label: value, value })
                  //     return prevState
                  //   })
                  // }
                  className='react-select-container'
                  classNamePrefix='react-select'
                />
              </AutoComplete>
              <AutoComplete label={t('City')} name='city'>
                <CreatableSelect
                  options={citiesList}
                  isLoading={isCitiesLoading}
                  onChange={(newValue) => {
                    setValue('city', newValue?.value)
                    setCity(newValue)
                  }}
                  value={city}
                  className='react-select-container'
                  classNamePrefix='react-select'
                />
              </AutoComplete>
            </div>
            <h6 className='mb-5 text-lg font-semibold'>{t('Finance Informations')}</h6>
            <div className='mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium dark:text-white'>{t('Priority')}</label>
                <MySelect
                  items={PRIORITIES}
                  defaultValue='0'
                  onValueChange={(value) => {
                    setValue('priority', Number(value))
                    setPriority(value)
                  }}
                  value={priority}
                />
              </div>
              <div className='flex flex-col gap-1 md:col-span-2'>
                <label className='text-sm font-medium dark:text-white'>{t('income')}</label>
                <div className='flex items-center justify-between gap-2'>
                  <Slider
                    className='w-full'
                    max={99999}
                    step={1000}
                    onValueChange={(value) => {
                      setValue('incomeK', value[0])
                      setIncome(value[0])
                    }}
                    value={[income]}
                  />
                  <p className='rounded-md bg-gray-200 p-1 text-sm dark:bg-gray-600'>{income}</p>
                </div>
              </div>
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

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const id = context.params?.id
  if (typeof id === 'string') store.dispatch(getLead.initiate(id))
  store.dispatch(getLeadSources.initiate())
  store.dispatch(getCountries.initiate())

  await Promise.all(store.dispatch(getRunningQueriesThunk()))
  await Promise.all(store.dispatch(addressGetRunningQueriesThunk()))

  return {
    props: {},
  }
})
