import { useEffect, useMemo } from "react"
import * as Yup from "yup"
// form
import { yupResolver } from "@hookform/resolvers/yup"
import { FieldValues, useForm } from "react-hook-form"
// api
// types
import { DealBoard } from "types/DealBoardProps"
// hooks
import useTranslate from "hooks/useTranslate"
// components
import { Button } from "components"
import { FormProvider, RHFTextField } from "components/hook-form"
import useSnackbar from "hooks/useSnackbar"
import {
  useCreateDealBoardMutation,
  useEditDealBoardTitleMutation,
} from "store/api/crm/sales-pipeline/dealsBoardsApi"

export default function CreateEditBoardForm({
  currentBoard,
  isEdit,
  onSuccess,
  onFailure,
}: {
  currentBoard: DealBoard | null
  isEdit: boolean
  onSuccess: () => void
  onFailure: () => void
}) {
  const { t } = useTranslate()
  const { open } = useSnackbar()

  const [
    createBoard,
    { isLoading: isCreateLoading, isSuccess: isCreateSuccess, isError: isCreateError },
  ] = useCreateDealBoardMutation()
  const [
    editBoardTitle,
    { isLoading: isEditLoading, isSuccess: isEditSuccess, isError: isEditError },
  ] = useEditDealBoardTitleMutation()

  const BoardSchema = Yup.object().shape({
    title: Yup.string().min(3, t("Too short")).required(t("This field is required")),
    defColumnTitle: isEdit
      ? Yup.string().min(3, t("Too short"))
      : Yup.string().min(3, t("Too short")).required(t("This field is required")),
  })

  const defaultValues = useMemo(
    () => ({
      title: currentBoard?.title,
    }),
    [currentBoard]
  )

  const methods = useForm<FieldValues>({
    resolver: yupResolver(BoardSchema),
    defaultValues,
  })

  const { handleSubmit, reset } = methods

  const onSubmit = async (data: FieldValues) => {
    const board: {
      title: string
      defColumnTitle: string
    } = { title: data.title, defColumnTitle: data.defColumnTitle }
    if (isEdit) editBoardTitle({ title: board.title, id: currentBoard?.id || "" })
    else createBoard(board)
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
          ? t("Pipeline Updated Successfully.")
          : t("Pipeline Added Successfully."),
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
        <RHFTextField name='title' label={t("Pipeline Title")} />{" "}
        {!isEdit && <RHFTextField name='defColumnTitle' label={t("Default Column Title")} />}
      </div>

      <div className='mt-6 flex w-full items-center justify-end gap-3'>
        <Button size='large' variant='outlined' intent='default' onClick={onFailure}>
          {t("Cancel")}
        </Button>
        <Button size='large' type='submit' loading={isCreateLoading || isEditLoading}>
          {isEdit ? t("Edit Pipeline") : t("Add Pipeline")}
        </Button>
      </div>
    </FormProvider>
  )
}
