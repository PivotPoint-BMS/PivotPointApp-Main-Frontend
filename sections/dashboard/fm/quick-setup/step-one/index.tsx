import { useEffect, useReducer, useState } from "react"
// utils
import { round } from "lodash"
// hooks
import useTranslate from "hooks/useTranslate"
import useSnackbar from "hooks/useSnackbar"
// api
import { useGetStepOneQuery, useSetStepOneMutation } from "store/api/fm/financeSetupApi"
// components
import { Button, LoadingIndicator, Radiobox } from "components"
// sections
import Table from "./Table"
import makeData from "./makeData"

function reducer(
  state: {
    data: {
      source: string
      amount: number | string
      interestRate: number | string
      percentage: string
    }[]
    columns: {
      id: string
      label: string
      accessor: string
      minWidth: number
      dataType: string
      placeholder: string
      disabled: boolean
      align: string
    }[]
  },
  action: {
    type: string
    rowIndex: number
    columnId: string
    value: string
    total: number
    data: {
      source: string
      amount: number | string
      interestRate: number | string
      percentage: string
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
            cell.amount.toString() !== "" &&
            cell.interestRate.toString() !== "" &&
            cell.source !== ""
        )
      )
        return {
          ...state,
          data: [...state.data, { amount: "", interestRate: "", source: "", percentage: "" }],
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
    case "update_percentage":
      return {
        ...state,
        data: state.data.map(({ amount, ...rest }) => ({
          ...rest,
          amount,
          percentage: `${round((Number(amount) * 100) / action.total, 2) || "0"}%`,
        })),
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

function StepOne({
  handleNextStep,
  setInvestementTotal,
}: {
  handleNextStep: (range: number) => void
  setInvestementTotal: (total: number) => void
}) {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const [state, dispatch] = useReducer(reducer, makeData())
  const [range, setRange] = useState(2)
  const [setStepOne, { isLoading, isSuccess, isError }] = useSetStepOneMutation()
  const {
    data: stepOneData,
    isLoading: isGetLoading,
    isSuccess: isGetSuccess,
  } = useGetStepOneQuery()

  useEffect(() => {
    if (isSuccess) handleNextStep(range)
    else if (isError)
      open({
        message: t("A probles was accured."),
        type: "error",
        autoHideDuration: 6000,
      })
  }, [isLoading])

  useEffect(() => {
    if (isGetSuccess) {
      dispatch({
        type: "set_data",
        data: stepOneData.data.financements.map((financement) => ({
          amount: financement.amount,
          interestRate: financement.interestRate,
          source: financement.source,
          percentage: "0%",
        })),
        rowIndex: 0,
        columnId: "",
        value: "",
        total: 0,
      })
      setRange(stepOneData.data.years)
    }
  }, [isGetLoading])

  return (
    <div className='relative mx-auto flex h-full w-full min-w-fit flex-col items-center justify-start gap-5 py-10 px-4'>
      {isGetLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <h1 className='text-center text-2xl font-semibold'>{t("Financial Contributions")}</h1>
          <Table columns={state.columns} data={state.data} dispatch={dispatch} />
          <h1 className='text-center text-2xl font-semibold'>{t("Estimation Range")}</h1>
          <div className='flex flex-1 items-start gap-5'>
            <Radiobox
              name='range'
              label={t("2 years")}
              onChange={() => setRange(2)}
              checked={range === 2}
            />
            <Radiobox
              checked={range === 3}
              name='range'
              label={t("3 years")}
              onChange={() => setRange(3)}
            />
            <Radiobox
              checked={range === 4}
              name='range'
              label={t("4 years")}
              onChange={() => setRange(4)}
            />
            <Radiobox
              checked={range === 5}
              name='range'
              label={t("5 years")}
              onChange={() => setRange(5)}
            />
          </div>
          <Button
            onClick={() => {
              if (
                state.data.length > 0 &&
                state.data.every((d) => d.amount !== "" && d.source !== "" && d.interestRate !== "")
              ) {
                setStepOne({
                  financements: state.data.map(({ amount, interestRate, source }) => ({
                    amount,
                    interestRate,
                    source,
                  })),
                  years: range,
                })
                setInvestementTotal(
                  state.data.reduce((partialSum, a) => partialSum + Number(a.amount), 0)
                )
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

export default StepOne
