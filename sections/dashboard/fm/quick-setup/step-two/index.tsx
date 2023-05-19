/* eslint-disable no-case-declarations */
import { useEffect, useReducer } from 'react'
import clsx from 'clsx'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// components
import { Icon } from '@iconify/react'
import { Button, IconButton } from 'components'
// sections
import Table from './Table'
import makeData from './makeData'

function reducer(
  state: {
    data: {
      [key: string]: string
      service: string
    }[]
    columns: {
      id: string
      label: string
      accessor: string
      dataType: string
      placeholder: string
    }[]
  },
  action: { type: string; rowIndex: number; columnId: string; value: string }
) {
  switch (action.type) {
    case 'add_row':
      return {
        ...state,
        data: [...state.data, { service: '' }],
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

  useEffect(() => {
    console.log(estimationRange)
  }, [])

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
      <Table columns={state.columns} data={state.data} dispatch={dispatch} />

      <Button
        onClick={() => {
          if (state.data.length > 0) handleNextStep()
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