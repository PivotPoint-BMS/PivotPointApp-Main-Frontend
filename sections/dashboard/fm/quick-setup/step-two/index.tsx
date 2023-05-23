/* eslint-disable no-plusplus */
/* eslint-disable no-case-declarations */
import { useEffect, useReducer, useState } from 'react'
import clsx from 'clsx'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// api
import { useGetStepTwoQuery, useSetStepTwoMutation } from 'store/api/fm/financeSetupApi'
// components
import { Icon } from '@iconify/react'
import { Button, Checkbox, IconButton, LoadingIndicator } from 'components'
// sections
import Table from './Table'
import makeData from './makeData'
import SaaSTurnoverCalculator from './saas-turnover-calculator'

function reducer(
  state: {
    data: {
      source: string
      [key: string]: string
    }[]
    columns: {
      id: string
      label: string
      accessor: string
      dataType: string
      placeholder: string
      align: string
    }[]
  },
  action: {
    type: string
    rowIndex: number
    columnId: string
    value: string
    newIncome: number[]
    data: {
      source: string
      [key: string]: string
    }[]
  }
) {
  switch (action.type) {
    case 'set_data':
      return {
        ...state,
        data: action.data,
      }
    case 'add_row':
      if (
        state.data.every(
          (cell) =>
            Object.keys(cell).length > 0 && Object.keys(cell).every((key) => cell[key] !== '')
        )
      )
        return {
          ...state,
          data: [...state.data, { source: '' }],
        }

      return {
        ...state,
      }
    case 'update_cell':
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
    case 'update_income':
      const newData: {
        source: string
        [key: string]: string
      }[] = [{ source: 'Subscriptions' }]
      action.newIncome.forEach((income, i) => {
        newData[0][(i + 1).toString()] = income.toString()
      })
      return {
        ...state,
        data: newData,
      }
    case 'delete_last_cell':
      return {
        ...state,
        data: state.data.slice(0, -1),
      }
    default:
      return state
  }
}

function StepTwo({
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
  const [isSaaS, setIsSaaS] = useState(false)
  const [setStepTwo, { isLoading, isSuccess, isError }] = useSetStepTwoMutation()
  const {
    data: stepTwoData,
    isLoading: isGetLoading,
    isSuccess: isGetSuccess,
  } = useGetStepTwoQuery()

  useEffect(() => {
    if (isSuccess) handleNextStep()
    else if (isError)
      open({
        message: t('A probles was accured.'),
        type: 'error',
        autoHideDuration: 6000,
      })
  }, [isLoading])

  useEffect(() => {
    if (isGetSuccess) {
      const data: {
        [key: string]: string
        source: string
      }[] = []
      stepTwoData.data.turnOverSources.forEach(({ source, contributions }) => {
        let years: { [key: string]: string } = {}
        contributions.forEach((value, i) => {
          years = { ...years, [(i + 1).toString()]: value.toString() }
        })
        data.push({
          source,
          ...years,
        })
      })
      dispatch({
        type: 'set_data',
        data,
        rowIndex: 0,
        columnId: '',
        value: '',
        newIncome: [],
      })
    }
  }, [isGetLoading])

  return (
    <div className='container relative mx-auto flex h-full flex-col items-center justify-start gap-5 overflow-scroll py-10 px-4'>
      {isGetLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <h1 className='text-center text-2xl font-semibold'>{t('Business Turnover')}</h1>
          <IconButton
            onClick={handleBack}
            className={clsx('absolute top-5', locale === 'ar' ? 'right-5' : 'left-5')}
          >
            <Icon
              icon={
                locale === 'ar'
                  ? 'material-symbols:arrow-forward-rounded'
                  : 'material-symbols:arrow-back-rounded'
              }
              height={20}
              width={20}
            />
          </IconButton>
          <Checkbox
            label='I have a SaaS solution'
            checked={isSaaS}
            onChange={(e) => setIsSaaS(e.target.checked)}
          />
          {isSaaS && (
            <SaaSTurnoverCalculator
              estimationRange={estimationRange}
              handleIncomeChange={(newIncome) =>
                dispatch({
                  type: 'update_income',
                  newIncome,
                  rowIndex: 0,
                  columnId: '',
                  value: '',
                  data: [],
                })
              }
            />
          )}
          <Table columns={state.columns} data={state.data} dispatch={dispatch} isSaaS={isSaaS} />
          <Button
            onClick={() => {
              if (
                state.data.length > 0 &&
                state.data.every((cell) => Object.keys(cell).every((key) => cell[key] !== ''))
              ) {
                const turnOverSources = state.data.reduce(
                  (
                    acc: {
                      source: string
                      contributions: number[]
                    }[],
                    curr
                  ) => {
                    const newObj: {
                      source: string
                      contributions: number[]
                    } = {
                      source: curr.source,
                      contributions: [],
                    }
                    for (let j = 0; j < estimationRange; j++) {
                      newObj.contributions.push(Number(curr[j + 1]))
                    }
                    acc.push(newObj)
                    return acc
                  },
                  []
                )
                setStepTwo({ turnOverSources })
              } else
                open({
                  autoHideDuration: 10000,
                  message: t('Please fill all fields.'),
                  type: 'warning',
                  closeButton: true,
                })
            }}
            size='large'
            loading={isLoading}
          >
            {t('Next Step')}
          </Button>
        </>
      )}
    </div>
  )
}

export default StepTwo
