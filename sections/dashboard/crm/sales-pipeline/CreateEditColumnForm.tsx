import { useEffect, useMemo } from "react"
import * as Yup from "yup"
// form
import { yupResolver } from "@hookform/resolvers/yup"
import { FieldValues, useForm } from "react-hook-form"
// api
import {
  invalidateTags,
  useCreateDealBoardColumnMutation,
} from "store/api/crm/sales-pipeline/dealsBoardsApi"
// hooks
import useTranslate from "hooks/useTranslate"
// components
import { Button } from "components"
import { FormProvider, RHFTextField } from "components/hook-form"
import useSnackbar from "hooks/useSnackbar"
import DealBoardColumnProps from "types/DealBoardColumnProps"

export default function CreateEditColumnForm({
  boardId,
  currentColumn,
  isEdit,
  onSuccess,
  onFailure,
}: {
  boardId: string
  currentColumn: DealBoardColumnProps | null
  isEdit: boolean
  onSuccess: () => void
  onFailure: () => void
}) {
  const { t } = useTranslate()
  const { open } = useSnackbar()

  const [
    createColumn,
    { isLoading: isCreateLoading, isSuccess: isCreateSuccess, isError: isCreateError },
  ] = useCreateDealBoardColumnMutation()
  //   const [editColumn, { isLoading: isEditLoading, isSuccess: isEditSuccess, isError: isEditError }] =
  //     useEditColumnMutation()

  const ColumnSchema = Yup.object().shape({
    columnTitle: Yup.string().min(3, t("Too short")).required(t("This field is required")),
  })

  const defaultValues = useMemo(
    () => ({
      columnTitle: currentColumn?.columnTitle || "",
    }),
    [currentColumn]
  )

  const methods = useForm<FieldValues>({
    resolver: yupResolver(ColumnSchema),
    defaultValues,
  })

  const { handleSubmit, reset } = methods

  const onSubmit = async (data: FieldValues) => {
    const column: {
      columnTitle: string
      boardId: string
    } = { columnTitle: data.columnTitle, boardId }
    // if (isEdit) editColumn({ data: board, id: currentColumn?.id || '' })
    createColumn(column)
    invalidateTags(["DealsBoards"])
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
        message:
          // isEditSuccess
          // ? t('Section Updated Successfully.')
          //   :
          t("Section Added Successfully."),
        autoHideDuration: 4000,
        type: "success",
        variant: "contained",
      })
      onSuccess()
    }
  }, [isCreateError, isCreateSuccess])

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className='mt-2 flex flex-col gap-4'>
        <RHFTextField name='columnTitle' label={t("Section Title")} />{" "}
      </div>

      <div className='mt-6 flex w-full items-center justify-end gap-3'>
        <Button size='large' variant='outlined' intent='default' onClick={onFailure}>
          {t("Cancel")}
        </Button>
        <Button size='large' type='submit' loading={isCreateLoading}>
          {isEdit ? t("Edit Section") : t("Add Section")}
        </Button>
      </div>
    </FormProvider>
  )
}
