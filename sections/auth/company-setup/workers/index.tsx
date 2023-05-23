import React, { useEffect, useReducer } from 'react'
import clsx from 'clsx'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// components
import { Icon as Iconify } from '@iconify/react'
import Button from 'components/Button'
import IconButton from 'components/IconButton'
import makeData from './makeData'
import Table from './Table'

interface WorkersProps {
  handleBack: () => void
  handleNext: () => void
  setFormWorkers: (
    newWorkers: {
      firstName: string
      lastName: string
      email: string
      position: string
    }[]
  ) => void
  formWorkers: {
    firstName: string
    lastName: string
    email: string
    position: string
  }[]
}

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
    case 'set_data':
      return {
        ...state,
        data: action.data,
      }
    case 'add_row':
      if (
        state.data.every(
          (cell) =>
            cell.email !== '' &&
            cell.firstName !== '' &&
            cell.lastName !== '' &&
            cell.position !== ''
        )
      )
        return {
          ...state,
          data: [...state.data, { email: '', firstName: '', lastName: '', position: '' }],
        }

      return {
        ...state,
      }
    case 'update_cell':
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
    case 'delete_last_cell':
      return {
        ...state,
        data: state.data.slice(0, -1),
      }

    default:
      return state
  }
}

export default function index({
  handleBack,
  handleNext,
  setFormWorkers,
  formWorkers,
}: WorkersProps) {
  const { t, locale } = useTranslate()
  const { open } = useSnackbar()
  const [state, dispatch] = useReducer(reducer, makeData())

  useEffect(() => {
    dispatch({
      type: 'set_data',
      data: formWorkers,
      rowIndex: 0,
      columnId: '',
      value: '',
    })
  }, [])

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  return (
    <div className='container relative mx-auto flex h-full flex-col items-center justify-start gap-5 overflow-scroll py-10 px-4'>
      <IconButton
        onClick={handleBack}
        className={clsx('absolute top-5', locale === 'ar' ? 'right-5' : 'left-5')}
      >
        <Iconify
          icon={
            locale === 'ar'
              ? 'material-symbols:arrow-forward-rounded'
              : 'material-symbols:arrow-back-rounded'
          }
          height={20}
          width={20}
        />
      </IconButton>
      <h1 className='text-3xl font-semibold'>{t('Add personnels')}</h1>
      <p className='text-center text-gray-600 dark:text-gray-300'>
        {t('Add your personnels and their affectations')}
      </p>
      <Table columns={state.columns} data={state.data} dispatch={dispatch} />
      <Button
        onClick={() => {
          if (
            state.data.length > 0 &&
            state.data.every(
              (d) =>
                emailRegex.test(d.email) &&
                d.firstName !== '' &&
                d.lastName !== '' &&
                d.position !== ''
            )
          ) {
            handleNext()
            setFormWorkers(state.data)
          } else
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
