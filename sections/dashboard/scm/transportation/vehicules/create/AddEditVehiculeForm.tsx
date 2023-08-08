import { useEffect } from "react"
import * as Yup from "yup"
// form
import { yupResolver } from "@hookform/resolvers/yup"
import { FieldValues, useForm } from "react-hook-form"
// api
import { useCreateVehicleMutation } from "store/api/scm/transportation/vehiculesApis"
// types
import { Vehicle } from "types"
// config
import { VEHICULES_SIZES, VEHICULES_TYPES } from "config"
// hooks
import { useAppSelector } from "store/hooks"
import useTranslate from "hooks/useTranslate"
import useSnackbar from "hooks/useSnackbar"
// components
import Select from "react-select"
import { RHFField, Button } from "components"
import { FormProvider, RHFTextField } from "components/hook-form"

export default function AddEditVehicleForm({
  onSuccess,
  onFailure,
  isEdit,
  currentVehicle,
}: {
  onSuccess: () => void
  onFailure: () => void
  isEdit?: boolean
  currentVehicle?: Vehicle
}) {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const { PageNumber, PageSize } = useAppSelector((state) => state.pagination)
  const [
    createVehicle,
    { isLoading: isCreateLoading, isSuccess: isCreateSuccess, isError: isCreateError },
  ] = useCreateVehicleMutation()

  const VehicleSchema = Yup.object().shape({
    model: Yup.string().required(t("This field is required")),
    type: Yup.number().nullable().required(t("This field is required")),
    size: Yup.number().nullable().required(t("This field is required")),
    weight: Yup.number().nullable().required(t("This field is required")),
    volumne: Yup.number().nullable().required(t("This field is required")),
    maxCapacity: Yup.number().nullable().required(t("This field is required")),
  })

  const defaultValues = {
    model: currentVehicle?.model || "",
    type: currentVehicle?.type || null,
    size: currentVehicle?.size || null,
    weight: currentVehicle?.weight || null,
    volumne: currentVehicle?.volumne || null,
    maxCapacity: currentVehicle?.maxCapacity || null,
  }

  const methods = useForm<FieldValues>({
    resolver: yupResolver(VehicleSchema),
    defaultValues,
  })

  const { handleSubmit, reset, setValue } = methods

  const onSubmit = async (data: FieldValues) => {
    const vehicule: Omit<Vehicle, "id"> = {
      code: data.code,
      model: data.model,
      type: data.type,
      size: data.size,
      weight: data.weight,
      volumne: data.volumne,
      maxCapacity: data.maxCapacity,
    }
    createVehicle({ ...vehicule, PageNumber, PageSize })
  }

  useEffect(() => {
    if (isCreateError) {
      open({
        message: t("A problem has occurred."),
        autoHideDuration: 4000,
        type: "error",
        variant: "contained",
      })
      onFailure()
    }
    if (isCreateSuccess) {
      reset()
      open({
        message: t("Vehicle Added Successfully."),
        autoHideDuration: 4000,
        type: "success",
        variant: "contained",
      })
      onSuccess()
    }
  }, [isCreateError, isCreateSuccess])

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className='mt-2 grid grid-cols-1 gap-4 md:grid-cols-2'>
        <RHFTextField name='model' label={t("Model")} />
        <RHFTextField name='code' label={t("Code")} />
        <RHFField name='type' label={t("Type")}>
          <Select
            options={VEHICULES_TYPES}
            getOptionLabel={(option) => t(option.label)}
            isSearchable={false}
            onChange={(newValue) => {
              setValue("type", newValue?.value)
            }}
            defaultValue={VEHICULES_TYPES.find((item) => item.value === currentVehicle?.type)}
            className='react-select-container'
            classNamePrefix='react-select'
            placeholder=''
          />
        </RHFField>

        <RHFField name='size' label={t("Size")}>
          <Select
            options={VEHICULES_SIZES}
            getOptionLabel={(option) => t(option.label)}
            isSearchable={false}
            onChange={(newValue) => {
              setValue("size", newValue?.value)
            }}
            defaultValue={VEHICULES_SIZES.find((item) => item.value === currentVehicle?.size)}
            className='react-select-container'
            classNamePrefix='react-select'
            placeholder=''
          />
        </RHFField>
        <div className='col-span-1 sm:col-span-2'>
          <RHFTextField type='number' name='weight' label={t("Weight")} endAdornment={t("Kg")} />
        </div>
        <div className='col-span-1 sm:col-span-2'>
          <RHFTextField
            type='number'
            name='volumne'
            label={t("Volume")}
            endAdornment={<span>{t("m")}²</span>}
          />
        </div>
        <div className='col-span-1 sm:col-span-2'>
          <RHFTextField
            type='number'
            name='maxCapacity'
            label={t("Max Capacity")}
            endAdornment={t("Kg")}
          />
        </div>
      </div>

      <div className='mt-6 flex w-full items-center justify-end gap-3'>
        <Button size='large' variant='outlined' intent='default' onClick={onFailure}>
          {t("Cancel")}
        </Button>
        <Button size='large' type='submit' loading={isCreateLoading}>
          {isEdit ? t("Edit Vehicle") : t("Add Vehicle")}
        </Button>
      </div>
    </FormProvider>
  )
}
