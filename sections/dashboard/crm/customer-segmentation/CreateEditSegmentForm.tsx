import { useEffect, useMemo } from "react"
import * as Yup from "yup"
// form
import { yupResolver } from "@hookform/resolvers/yup"
import { FieldValues, useForm } from "react-hook-form"
// api
import {
  useCreateSegmentMutation,
  useEditSegmentMutation,
} from "store/api/crm/customer-segmentation/customerSegmentationApi"
// types
import { Segment } from "types"
// hooks
import useTranslate from "hooks/useTranslate"
// components
import { Button } from "components"
import { FormProvider, RHFTextField } from "components/hook-form"
import useSnackbar from "hooks/useSnackbar"

export default function CreateEditSegmentForm({
  currentSegment,
  isEdit,
  onSuccess,
  onFailure,
}: {
  currentSegment: Segment | null
  isEdit: boolean
  onSuccess: () => void
  onFailure: () => void
}) {
  const { t } = useTranslate()
  const { open } = useSnackbar()

  const [
    createSegment,
    { isLoading: isCreateLoading, isSuccess: isCreateSuccess, isError: isCreateError },
  ] = useCreateSegmentMutation()
  const [
    editSegmentTitle,
    { isLoading: isEditLoading, isSuccess: isEditSuccess, isError: isEditError },
  ] = useEditSegmentMutation()

  const SegmentSchema = Yup.object().shape({
    segmentName: Yup.string().min(3, t("Too short")).required(t("This field is required")),
    segmentDescription: Yup.string().min(3, t("Too short")),
  })

  const defaultValues = useMemo(
    () => ({
      segmentName: currentSegment?.segmentName,
      segmentDescription: currentSegment?.segmentDescription,
    }),
    [currentSegment]
  )

  const methods = useForm<FieldValues>({
    resolver: yupResolver(SegmentSchema),
    defaultValues,
  })

  const { handleSubmit, reset } = methods

  const onSubmit = async (data: FieldValues) => {
    const segment: {
      segmentName: string
      segmentDescription: string
    } = {
      segmentName: data.segmentName,
      segmentDescription: data.segmentDescription,
    }
    if (isEdit)
      editSegmentTitle({
        id: currentSegment?.id || "",
        segmentName: segment.segmentName,
        segmentDescription: segment.segmentDescription,
      })
    else createSegment(segment)
  }

  useEffect(() => {
    if (isCreateError || isEditError) {
      open({
        message: t("A problem has occurred."),
        autoHideDuration: 4000,
        type: "error",
        variant: "contained",
      })
      onFailure()
    }
    if (isCreateSuccess || isEditSuccess) {
      reset()
      open({
        message: isEditSuccess
          ? t("Segment Updated Successfully.")
          : t("Segment Added Successfully."),
        autoHideDuration: 4000,
        type: "success",
        variant: "contained",
      })
      onSuccess()
    }
  }, [isEditError, isEditSuccess, isCreateError, isCreateSuccess])

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className='mt-2 flex flex-col gap-4'>
        <RHFTextField name='segmentName' label={t("Name")} />{" "}
        <RHFTextField name='segmentDescription' label={t("Description")} />
      </div>

      <div className='mt-6 flex w-full items-center justify-end gap-3'>
        <Button size='large' variant='outlined' intent='default' onClick={onFailure}>
          {t("Cancel")}
        </Button>
        <Button size='large' type='submit' loading={isCreateLoading || isEditLoading}>
          {isEdit ? t("Edit Segment") : t("Add Segment")}
        </Button>
      </div>
    </FormProvider>
  )
}
