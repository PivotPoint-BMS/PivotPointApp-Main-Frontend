/* eslint-disable no-case-declarations */
import { useReducer, useState } from 'react'
import clsx from 'clsx'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// components
import { Icon } from '@iconify/react'
import { Button, Checkbox, IconButton } from 'components'
// sections
import Table from './Table'
import makeData from './makeData'
import SaaSTurnoverCalculator from './saas-turnover-calculator'

function reducer(
  state: {
    data: {
      service: string
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
  action: { type: string; rowIndex: number; columnId: string; value: string; newIncome: number[] }
) {
  switch (action.type) {
    case 'add_row':
      if (
        state.data.every(
          (cell) =>
            Object.keys(cell).length > 0 && Object.keys(cell).every((key) => cell[key] !== '')
        )
      )
        return {
          ...state,
          data: [...state.data, { service: '' }],
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
        service: string
        [key: string]: string
      }[] = [{ service: 'Subscriptions' }]
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

  return (
    <div className='container relative mx-auto flex h-full flex-col items-center justify-start gap-5 overflow-scroll py-10 px-4'>
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
            })
          }
        />
      )}
      <Table columns={state.columns} data={state.data} dispatch={dispatch} isSaaS={isSaaS} />
      <Button
        onClick={() => {
          if (
            state.data.length > 0 &&
            state.data.every((cell) => Object.keys(cell).every((key) => cell[key] === ''))
          )
            handleNextStep()
          else
            open({
              autoHideDuration: 10000,
              message: t('Please fill all fields.'),
              type: 'warning',
              closeButton: true,
            })
        }}
        size='large'
      >
        {t('Next Step')}
      </Button>
    </div>
  )
}

export default StepTwo
