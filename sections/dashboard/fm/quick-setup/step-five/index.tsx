/* eslint-disable no-plusplus */
import { useEffect, useMemo, useReducer } from 'react'
import clsx from 'clsx'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// api
import { useGetStepFiveQuery, useSetStepFiveMutation } from 'store/api/fm/financeSetupApi'
// components
import { Icon } from '@iconify/react'
import { Button, IconButton, LoadingIndicator } from 'components'
// sections
import Table from './Table'
import makeData from './makeData'

function reducer(
  state: {
    data: {
      investement: string
      amount: number | string
      yearsOfUse: number | string
      physical: string
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
      investement: string
      amount: number
      yearsOfUse: number
      physical: string
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
          (cell) => cell.amount !== '' && cell.investement !== '' && cell.yearsOfUse !== ''
        )
      )
        return {
          ...state,
          data: [...state.data, { investement: '', amount: '', yearsOfUse: '', physical: 'false' }],
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
    case 'delete_row':
      return {
        ...state,
        data: state.data.filter((_, i) => i !== action.rowIndex),
        rowIndex: action.rowIndex,
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

function StepFive({
  handleNextStep,
  handleBack,
  investementTotal,
}: {
  handleNextStep: () => void
  handleBack: () => void
  investementTotal: number
}) {
  const { t, locale } = useTranslate()
  const { open } = useSnackbar()
  const [state, dispatch] = useReducer(reducer, makeData())
  const total = useMemo(
    () => state.data.reduce((partialSum, a) => partialSum + Number(a.amount), 0),
    [state.data]
  )
  const [setStepFive, { isLoading, isSuccess, isError }] = useSetStepFiveMutation()
  const {
    data: stepFiveData,
    isLoading: isGetLoading,
    isSuccess: isGetSuccess,
  } = useGetStepFiveQuery()

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
        investement: string
        amount: number
        yearsOfUse: number
        physical: string
      }[] = []
      stepFiveData.data.investements.forEach((investement) =>
        data.push({
          investement: investement.investement,
          amount: investement.amount,
          yearsOfUse: investement.yearsOfUse,
          physical: investement.physical ? 'true' : 'false',
        })
      )
      dispatch({
        type: 'set_data',
        data,
        rowIndex: 0,
        columnId: '',
        value: '',
        total: 0,
      })
    }
  }, [isGetLoading])

  useEffect(() => {
    if (total > investementTotal)
      open({
        autoHideDuration: 10000,
        closeButton: true,
        type: 'warning',
        message: t('Total must be smaller or equal to invetement total'),
      })
  }, [total])

  return (
    <div className='relative mx-auto flex h-full w-full min-w-fit flex-col items-center justify-start gap-5 py-10 px-4'>
      {' '}
      {isGetLoading ? (
        <LoadingIndicator />
      ) : (
        <>
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
          <h1 className='text-center text-2xl font-semibold'>{t('Investement Sources')}</h1>
          <Table columns={state.columns} data={state.data} dispatch={dispatch} total={total} />
          <Button
            onClick={() => {
              if (total > investementTotal) {
                open({
                  autoHideDuration: 10000,
                  closeButton: true,
                  type: 'warning',
                  message: t('Total must be smaller or equal to invetement total'),
                })
                return
              }
              if (
                state.data.length > 0 &&
                state.data.every(
                  (cell) => cell.amount !== '' && cell.investement !== '' && cell.yearsOfUse !== ''
                )
              ) {
                const investements = state.data.map((d) => ({
                  investement: d.investement,
                  amount: Number(d.amount),
                  yearsOfUse: Number(d.yearsOfUse),
                  physical: Boolean(d.physical),
                }))
                setStepFive({ investements })
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

export default StepFive
