/* eslint-disable no-plusplus */
import { useEffect, useReducer } from "react"
import clsx from "clsx"
// hooks
import useTranslate from "hooks/useTranslate"
import useSnackbar from "hooks/useSnackbar"
// api
import { useGetStepThreeQuery, useSetStepThreeMutation } from "store/api/fm/financeSetupApi"
// components
import { Icon } from "@iconify/react"
import { Button, IconButton, LoadingIndicator } from "components"
// sections
import Table from "./Table"
import makeData from "./makeData"

function reducer(
  state: {
    data: {
      inventory: string
      isRawMaterials: string
      [key: string]: string
    }[]
    columns: {
      id: string
      label: string
      accessor: string
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
    total: number
    data: {
      inventory: string
      isRawMaterials: string
      [key: string]: string
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
            Object.keys(cell).length > 0 && Object.keys(cell).every((key) => cell[key] !== "")
        )
      )
        return {
          ...state,
          data: [...state.data, { inventory: "", isRawMaterials: "false" }],
        }

      return {
        ...state,
      }
    case "update_cell":
      return {
        ...state,
        data: state.data.map((row, index) => {
          if (index === action.rowIndex) {
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

function StepThree({
  handleNextStep,
  handleBack,
  estimationRange,
}: {
  handleNextStep: () => void
  handleBack: () => void
  estimationRange: number
}) {
  const { t, locale } = useTranslate()
  const { open } = useSnackbar()
  const [state, dispatch] = useReducer(reducer, makeData(estimationRange))
  const [setStepThree, { isLoading, isSuccess, isError }] = useSetStepThreeMutation()
  const {
    data: stepThreeData,
    isLoading: isGetLoading,
    isSuccess: isGetSuccess,
  } = useGetStepThreeQuery()

  useEffect(() => {
    if (isSuccess) handleNextStep()
    else if (isError)
      open({
        message: t("A probles was accured."),
        type: "error",
        autoHideDuration: 6000,
      })
  }, [isLoading])

  useEffect(() => {
    if (isGetSuccess) {
      const data: {
        inventory: string
        isRawMaterials: string
        [key: string]: string
      }[] = []
      stepThreeData.data.inventorySources.forEach(({ inventory, costs, isRawMaterials }) => {
        let years: { [key: string]: string } = {}
        costs.forEach((value, i) => {
          years = { ...years, [(i + 1).toString()]: value.toString() }
        })
        data.push({
          inventory,
          isRawMaterials: String(isRawMaterials),
          ...years,
        })
      })
      dispatch({
        type: "set_data",
        data,
        rowIndex: 0,
        columnId: "",
        value: "",
        total: 0,
      })
    }
  }, [isGetLoading])

  return (
    <div className='relative mx-auto flex h-full w-full min-w-fit flex-col items-center justify-start gap-5 py-10 px-4'>
      {" "}
      {isGetLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <IconButton
            onClick={handleBack}
            className={clsx("absolute top-5", locale === "ar" ? "right-5" : "left-5")}
          >
            <Icon
              icon={
                locale === "ar"
                  ? "material-symbols:arrow-forward-rounded"
                  : "material-symbols:arrow-back-rounded"
              }
              height={20}
              width={20}
            />
          </IconButton>
          <h1 className='text-center text-2xl font-semibold'>{t("Inventory Sources")}</h1>
          <Table columns={state.columns} data={state.data} dispatch={dispatch} />
          <Button
            onClick={() => {
              if (
                state.data.length > 0 &&
                state.data.every((cell) => Object.keys(cell).every((key) => cell[key] !== ""))
              ) {
                const inventorySources = state.data.reduce(
                  (
                    acc: {
                      inventory: string
                      costs: number[]
                      isRawMaterials: boolean
                    }[],
                    curr
                  ) => {
                    const newObj: {
                      inventory: string
                      isRawMaterials: boolean
                      costs: number[]
                    } = {
                      inventory: curr.inventory,
                      isRawMaterials: Boolean(curr.isRawMaterials),
                      costs: [],
                    }
                    for (let j = 0; j < estimationRange; j++) {
                      newObj.costs.push(Number(curr[j + 1]))
                    }
                    acc.push(newObj)
                    return acc
                  },
                  []
                )

                setStepThree({ inventorySources })
              } else
                open({
                  autoHideDuration: 10000,
                  message: t("Please fill all fields."),
                  type: "warning",
                  closeButton: true,
                })
            }}
            size='large'
            loading={isLoading}
          >
            {t("Next Step")}
          </Button>
        </>
      )}
    </div>
  )
}

export default StepThree
