/* eslint-disable no-plusplus */
import { useEffect, useReducer } from 'react'
import clsx from 'clsx'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// api
import { useGetStepFourQuery, useSetStepFourMutation } from 'store/api/fm/financeSetupApi'
// components
import { Icon } from '@iconify/react'
import { Button, IconButton, LoadingIndicator } from 'components'
// sections
import makeData from './makeData'
import Table from './Table'

function reducer(
  state: {
    data: {
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
    total: number
    data: {
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

    default:
      return state
  }
}

function StepFour({
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
  const [setStepFour, { isLoading, isSuccess, isError }] = useSetStepFourMutation()
  const {
    data: stepFourData,
    isLoading: isGetLoading,
    isSuccess: isGetSuccess,
  } = useGetStepFourQuery()

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
      let years: { [key: string]: string } = {}
      stepFourData.data.peronnelCosts.forEach((value, i) => {
        years = { ...years, [(i + 1).toString()]: value.toString() }
      })
      dispatch({
        type: 'set_data',
        data: [{ ...years }],
        rowIndex: 0,
        columnId: '',
        value: '',
        total: 0,
      })
    }
  }, [isGetLoading])

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
          <h1 className='text-center text-2xl font-semibold'>{t('Expected Personnel Costs')}</h1>
          <Table columns={state.columns} data={state.data} dispatch={dispatch} />
          <Button
            onClick={() => {
              if (
                state.data.length > 0 &&
                state.data.every((cell) => Object.keys(cell).every((key) => cell[key] !== ''))
              ) {
                const peronnelCosts = state.data.reduce((acc: number[], curr) => {
                  for (let j = 0; j < estimationRange; j++) {
                    acc.push(Number(curr[j + 1]))
                  }
                  return acc
                }, [])

                setStepFour({ peronnelCosts })
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

export default StepFour
