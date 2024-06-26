import { useCallback, useEffect, useMemo, useState } from "react"
import * as Yup from "yup"
// next
import { useRouter } from "next/router"
// form
import { yupResolver } from "@hookform/resolvers/yup"
import { FieldValues, useForm } from "react-hook-form"
import {
  getLead,
  getRunningQueriesThunk,
  useCreateLeadMutation,
  useEditLeadMutation,
} from "store/api/crm/contact-leads/leadApis"
import {
  getRunningQueriesThunk as addressGetRunningQueriesThunk,
  getCountries,
  useGetCitiesQuery,
  useGetCountriesQuery,
} from "store/api/crm/contact-leads/addressApi"
import { skipToken } from "@reduxjs/toolkit/dist/query"
import { wrapper } from "store"
import {
  getAllLeadSources,
  useGetAllLeadSourcesQuery,
} from "store/api/crm/contact-leads/leadSourceApi"
// config
import { LEAD_PRIORITIES, PIVOTPOINT_API } from "config"
// utils
import { fData } from "utils/formatNumber"
// types
import Lead from "types/Lead"
// routes
import { PATH_DASHBOARD } from "routes/paths"
// hooks
import useTranslate from "hooks/useTranslate"
import useSnackbar from "hooks/useSnackbar"
// components
import Select from "react-select"
import CreatableSelect from "react-select/creatable"
import { Card, CardContent, Button, LoadingIndicator, RHFField, Slider } from "components"
import { FormProvider, RHFTextField, RHFFieldContainer } from "components/hook-form"
import RHFUploadAvatar from "components/hook-form/RHFUpload"
import { useAppSelector } from "store/hooks"

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

  const { PageNumber, PageSize } = useAppSelector((state) => state.pagination)

  const { data: sources, isLoading, isSuccess } = useGetAllLeadSourcesQuery()
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
  const [countriesList, setCountriesList] = useState<{ value: string; label: string }[]>([])
  const [citiesList, setCitiesList] = useState<{ value: string; label: string }[]>([])
  const [city, setCity] = useState<{ value: string; label: string } | null>(null)
  const [country, setCountry] = useState<{ value: string; label: string } | null>(null)
  const [source, setSource] = useState<{ value: string; label: string } | null>(null)
  const [priority, setPriority] = useState(0)
  const [incomeK, setIncomeK] = useState(50)
  const [spendingScore, setSpendingScore] = useState(50)

  const LeadSchema = Yup.object().shape({
    picture: Yup.mixed(),
    fullName: Yup.string().min(3, t("Too short")).required(t("This field is required")),
    email: Yup.string()
      .email(t("Email must be a valid email address"))
      .required(t("Email is required")),
    phoneNumber: Yup.string().matches(
      /^(\+\d{1,3} \d{9}|0\d{9})$/,
      t("Phone number must be valid")
    ),
    jobTitle: Yup.string().min(3, t("Too short")),
    status: Yup.number(),
    city: Yup.string().required(t("This field is required")),
    country: Yup.string().required(t("This field is required")),
    priority: Yup.number().required(t("This field is required")),
    incomeK: Yup.number().min(1).max(100).required(t("This field is required")),
    spendingScore: Yup.number().min(1).max(100).required(t("This field is required")),
    LeadSourceId: Yup.string().required(t("This field is required")),
  })

  const defaultValues = useMemo(
    () => ({
      picture:
        currentLead && currentLead?.picture.length > 0
          ? `${PIVOTPOINT_API.crmPicUrl}/${currentLead?.picture}`
          : null,
      fullName: currentLead?.fullName || "",
      email: currentLead?.email || "",
      phoneNumber: currentLead?.phoneNumber || "",
      jobTitle: currentLead?.jobTitle || "",
      LeadSourceId: currentLead?.leadSource?.id || "",
      city: currentLead?.address.city || "",
      priority: currentLead?.priority || 0,
      country: currentLead?.address.country || "",
      incomeK: currentLead?.incomeK || 50,
      spendingScore: currentLead?.spendingScore || 50,
    }),
    [currentLead]
  )

  const methods = useForm<FieldValues>({
    resolver: yupResolver(LeadSchema),
    defaultValues,
  })

  const { handleSubmit, setValue, reset } = methods

  const onSubmit = async (data: FieldValues) => {
    const formData = new FormData()

    if (typeof data.picture !== "string") formData.append("picture", data.picture)
    formData.append("fullName", data.fullName)
    formData.append("email", data.email)
    formData.append("phoneNumber", data.phoneNumber)
    formData.append("jobTitle", data.jobTitle)
    formData.append("LeadSourceId", data.LeadSourceId)
    formData.append("city", data.city)
    formData.append("country", data.country)
    formData.append("incomeK", String(incomeK))
    formData.append("spendingScore", String(spendingScore))
    formData.append("priority", String(priority))
    if (isEdit) editLead({ data: formData, id: currentLead?.id || "", PageNumber, PageSize })
    else createLead({ data: formData, PageNumber, PageSize })
  }

  const {
    data: cities,
    isLoading: isCitiesLoading,
    isSuccess: isCitiesSuccess,
    isFetching: isCitiesFetching,
    refetch,
    status,
  } = useGetCitiesQuery(country ? country.value : skipToken, { refetchOnMountOrArgChange: true })

  // ImageUpload
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]

      if (file) {
        setValue(
          "picture",
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
      setIncomeK(currentLead.incomeK)
      setSpendingScore(currentLead.spendingScore)
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
        value: currentLead.leadSource.id || "",
        label: currentLead.leadSource.source || "",
      })
      setPriority(currentLead?.priority || 0)
    }

    if (!isEdit) {
      reset(defaultValues)
    }
  }, [isEdit, currentLead])

  useEffect(() => {
    if (isCreateError || isEditError) {
      open({
        message: t("A problem has occurred."),
        autoHideDuration: 6000,
        type: "error",
        variant: "contained",
      })
    }
    if (isCreateSuccess || isEditSuccess) {
      reset()
      open({
        message: isEdit ? t("Lead Updated Successfully.") : t("Lead Added Successfully."),
        autoHideDuration: 6000,
        type: "success",
        variant: "contained",
      })
      push({
        pathname: PATH_DASHBOARD.crm["contacts-leads"].root,
        query: { tab: "leads" },
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
      setCountriesList(
        countries.data.map((newCountry) => ({ value: newCountry, label: newCountry }))
      )
  }, [isCountriesLoading])
  useEffect(() => {
    if (isCitiesSuccess)
      setCitiesList(cities.data.map((newCity) => ({ value: newCity, label: newCity })))
  }, [isCitiesLoading, isCitiesFetching])

  return isLoading ? (
    <div className='flex h-56 w-full items-center justify-center'>
      <LoadingIndicator />
    </div>
  ) : (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        <Card fullWidth>
          <CardContent>
            <h6 className='mb-3 text-lg font-semibold'>{t("Lead Image")}</h6>
            <RHFUploadAvatar
              name='picture'
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <p className='mx-auto block text-center text-xs text-gray-600 dark:text-gray-400'>
                  {t("Allowed *.jpeg, *.jpg, *.png, *.gif")}
                  <br /> {t("max size of")} {fData(3145728)}
                </p>
              }
            />
          </CardContent>
        </Card>
        <Card fullWidth className='!overflow-visible md:col-span-2'>
          <CardContent className='flex flex-col !overflow-visible'>
            <h6 className='mb-5 text-lg font-semibold'>{t("Lead Informations")}</h6>
            <div className='mb-6 grid gap-6 sm:grid-cols-2'>
              <RHFTextField name='fullName' label={t("Full Name")} />
              <RHFTextField name='email' label={t("Email")} />
              <RHFTextField name='phoneNumber' label={t("Phone Number")} />
              <RHFTextField name='jobTitle' label={t("Job Title")} />
              <RHFFieldContainer name='LeadSourceId' label={t("Source")}>
                <Select
                  options={sourcesList}
                  isLoading={isLoading}
                  onChange={(newValue) => {
                    setValue("LeadSourceId", newValue?.value)
                    setSource(newValue)
                  }}
                  value={source}
                  className='react-select-container'
                  classNamePrefix='react-select'
                  placeholder=''
                />
              </RHFFieldContainer>
              <RHFField name='priority' label={t("Priority")}>
                <Select
                  options={LEAD_PRIORITIES}
                  getOptionLabel={(option) => t(option.label)}
                  onChange={(newValue) => {
                    setValue("priority", newValue?.value)
                    setPriority(newValue?.value || 0)
                  }}
                  value={LEAD_PRIORITIES.find((item) => item.value === priority)}
                  className='react-select-container'
                  classNamePrefix='react-select'
                  placeholder=''
                />
              </RHFField>
            </div>
            <h6 className='mb-5 text-lg font-semibold'>{t("Address Informations")}</h6>
            <div className='mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 '>
              <RHFFieldContainer label={t("Country")} name='country'>
                <CreatableSelect
                  options={countriesList}
                  isLoading={isCountriesLoading}
                  onChange={(newValue) => {
                    setValue("country", newValue?.value)
                    setCountry(newValue)
                    if (status === "fulfilled") refetch()
                  }}
                  value={country}
                  className='react-select-container'
                  classNamePrefix='react-select'
                  placeholder=''
                />
              </RHFFieldContainer>
              <RHFFieldContainer label={t("City")} name='city'>
                <CreatableSelect
                  options={citiesList}
                  isLoading={isCitiesLoading || isCitiesFetching}
                  onChange={(newValue) => {
                    setValue("city", newValue?.value)
                    setCity(newValue)
                  }}
                  value={city}
                  className='react-select-container'
                  classNamePrefix='react-select'
                  placeholder=''
                />
              </RHFFieldContainer>
            </div>
            <h6 className='mb-5 text-lg font-semibold'>{t("Finance Informations")}</h6>
            <div className='mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2'>
              <RHFField name='incomeK' label={t("Income Score")}>
                <Slider
                  max={100}
                  min={1}
                  value={[incomeK]}
                  onValueChange={(value) => {
                    setIncomeK(value[0])
                    setValue("incomeK", value[0])
                  }}
                />
              </RHFField>
              <RHFField name='spendingScore' label={t("Spending Score")}>
                <Slider
                  max={100}
                  min={1}
                  value={[spendingScore]}
                  onValueChange={(value) => {
                    setSpendingScore(value[0])
                    setValue("spendingScore", value[0])
                  }}
                />
              </RHFField>
            </div>
            <div className='mt-6 flex w-full items-center justify-center'>
              <Button size='large' type='submit' loading={isCreateLoading || isEditLoading}>
                {isEdit ? t("Edit Lead") : t("Add Lead")}
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
  if (typeof id === "string") store.dispatch(getLead.initiate(id))
  store.dispatch(getAllLeadSources.initiate())
  store.dispatch(getCountries.initiate())

  await Promise.all(store.dispatch(getRunningQueriesThunk()))
  await Promise.all(store.dispatch(addressGetRunningQueriesThunk()))

  return {
    props: {},
  }
})
