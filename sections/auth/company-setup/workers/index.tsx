import React, { useReducer } from "react"
import { useAppSelector } from "store/hooks"
// hooks
import useTranslate from "hooks/useTranslate"
import useSnackbar from "hooks/useSnackbar"
// apis
import { useCreationStepFourMutation } from "store/api/auth/companyApi"
// components
import Button from "components/Button"
import makeData from "./makeData"
import Table from "./Table"

interface WorkersProps {
  handleNext: () => void
  plan: number
}

export default function index({ handleNext, plan }: WorkersProps) {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const { user } = useAppSelector((state) => state.session)

  // Mutation
  const [creationStepFour, { isLoading }] = useCreationStepFourMutation()

  function reducer(
    state: {
      data: {
        firstName: string
        lastName: string
        email: string
        position: string
      }[]
      columns: {
        id: string
        label: string
        accessor: string
        minWidth: number
        dataType: string
        placeholder: string
        align: string
        options?: {
          label: string
          value: string
        }[]
      }[]
    },
    action: {
      type: string
      rowIndex: number
      columnId: string
      value: string
      data: {
        firstName: string
        lastName: string
        email: string
        position: string
      }[]
    }
  ) {
    switch (action.type) {
      case "set_data":
        return {
          ...state,
          data: action.data,
        }
      case "add_row":
        if (
          state.data.every(
            (cell) =>
              cell.email !== "" &&
              cell.firstName !== "" &&
              cell.lastName !== "" &&
              cell.position !== ""
          )
        ) {
          if ((plan === 0 || user?.tier === 0) && state.data.length < 3) {
            return {
              ...state,
              data: [...state.data, { email: "", firstName: "", lastName: "", position: "" }],
            }
          }
          if ((plan === 1 || user?.tier === 1) && state.data.length < 10) {
            return {
              ...state,
              data: [...state.data, { email: "", firstName: "", lastName: "", position: "" }],
            }
          }
          if ((plan === 2 || user?.tier === 2) && state.data.length < 20) {
            return {
              ...state,
              data: [...state.data, { email: "", firstName: "", lastName: "", position: "" }],
            }
          }
          if ((plan === 3 || user?.tier === 3) && state.data.length < 50) {
            return {
              ...state,
              data: [...state.data, { email: "", firstName: "", lastName: "", position: "" }],
            }
          }
          open({
            message: t("You can't add more workers"),
            autoHideDuration: 6000,
            type: "error",
            variant: "contained",
          })
        }

        return {
          ...state,
        }
      case "update_cell":
        return {
          ...state,
          data: state.data.map((row, i) => {
            if (i === action.rowIndex) {
              return {
                ...state.data[action.rowIndex],
                [action.columnId]: action.value,
              }
            }
            return row
          }),
        }
      case "delete_row":
        return {
          ...state,
          data: state.data.filter((_, i) => i !== action.rowIndex),
          rowIndex: action.rowIndex,
        }
      case "delete_last_cell":
        return {
          ...state,
          data: state.data.slice(0, -1),
        }

      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, makeData())

  const onSubmit = () => {
    creationStepFour({ companyWorkers: state.data })
      .unwrap()
      .then(() => handleNext())
      .catch(() =>
        open({
          message: t("A problem has occurred."),
          autoHideDuration: 6000,
          type: "error",
          variant: "contained",
        })
      )
  }

  return (
    <div className='relative mx-auto flex h-full w-full min-w-fit flex-col items-center justify-start gap-5 py-10 px-4'>
      <h1 className='text-3xl font-semibold'>{t("Add personnel")}</h1>
      <p className='text-center text-gray-600 dark:text-gray-300'>
        {t("Add your personnel and their affectations")}
      </p>
      <Table columns={state.columns} data={state.data} dispatch={dispatch} />
      <Button onClick={onSubmit} size='large' loading={isLoading}>
        {t("Next Step")}
      </Button>
    </div>
  )
}
