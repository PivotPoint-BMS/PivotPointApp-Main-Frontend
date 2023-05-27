import React, { useEffect, useReducer, useState } from 'react'
import * as Yup from 'yup'
import { merge, round } from 'lodash'
// form
import { FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// components
import { FormProvider, RHFTextField } from 'components/hook-form'
import ReactApexChart, { BaseOptionChart } from 'components/chart'
import { Button } from 'components'
import makeData from './makeData'
import Table from './Table'

function reducer(
  state: {
    data: { name: string; price: string; userPercentage: string }[]
    columns: {
      id: string
      label: string
      accessor: string
      dataType: string
      placeholder: string
      align: string
    }[]
  },
  action: { type: string; rowIndex?: number; columnId?: string; value?: string; profit?: number[] }
) {
  switch (action.type) {
    case 'add_row':
      if (
        state.data.every(
          (cell) =>
            Object.keys(cell).length > 0 &&
            cell.name !== '' &&
            cell.price !== '' &&
            cell.userPercentage !== ''
        )
      )
        return {
          ...state,
          data: [...state.data, { name: '', price: '', userPercentage: '' }],
        }
      return state
    case 'update_cell':
      return {
        ...state,
        data: state.data.map((row, i) => {
          if (i === action.rowIndex) {
            return {
              ...state.data[action.rowIndex],
              [action.columnId || '']: action.value,
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

function index({
  estimationRange,
  handleIncomeChange,
}: {
  estimationRange: number
  handleIncomeChange: (newIncome: number[]) => void
}) {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const [state, dispatch] = useReducer(reducer, makeData())
  const [expence, setExpence] = useState<number[]>([])
  const [income, setIncome] = useState<number[]>([])

  const calculatorSchema = Yup.object().shape({
    growthPercentage: Yup.string().required(t('This field is required')),
    acquisationCost: Yup.string().required(t('This field is required')),
    startingUsers: Yup.string().required(t('This field is required')),
    costDeploy: Yup.string().required(t('This field is required')),
  })

  const defaultValues = {
    growthPercentage: '',
    acquisationCost: '',
    startingUsers: '',
    costDeploy: '',
  }

  const methods = useForm<FieldValues>({
    resolver: yupResolver(calculatorSchema),
    defaultValues,
  })

  const { handleSubmit } = methods

  const onSubmit = async (data: FieldValues) => {
    if (
      state.data.every(
        (cell) => Object.keys(cell).length > 0 && cell.name !== '' && cell.price !== ''
      )
    ) {
      const { growthPercentage, acquisationCost, startingUsers, costDeploy } = data
      const subscriptions = state.data
      const usersList = [Number(startingUsers)]
      const startExpence =
        startingUsers * Number(acquisationCost) + startingUsers * Number(costDeploy) * 12
      const expencesList = [startExpence]
      const startIncome =
        subscriptions
          .map((sub) => Number(sub.price) * (Number(sub.userPercentage) / 100))
          .reduce((a, b) => a + b, 0) *
        startingUsers *
        12

      const incomesList = [startIncome]
      const profitList = [startIncome - startExpence]
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < estimationRange - 1; i++) {
        const newUsers = usersList[i] * (1 + Number(growthPercentage) / 100)
        usersList.push(round(newUsers))

        const newExpence =
          (newUsers - usersList[i]) * Number(acquisationCost) + newUsers * Number(costDeploy) * 12
        expencesList.push(round(newExpence, 2))

        const newIncome =
          subscriptions
            .map((sub) => Number(sub.price) * (Number(sub.userPercentage) / 100))
            .reduce((a, b) => a + b, 0) *
          newUsers *
          12
        incomesList.push(round(newIncome, 2))

        const newProfit = newIncome - newExpence
        profitList.push(round(newProfit, 2))
      }
      setExpence(expencesList)
      setIncome(incomesList)
    } else {
      open({
        autoHideDuration: 1000,
        closeButton: true,
        message: t('Please fill all the fields'),
        type: 'error',
      })
    }
  }
  useEffect(() => {
    handleIncomeChange(income)
  }, [income])

  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: 'top', horizontalAlign: 'right' },
    colors: ['#1FAA69', '#FF0800'],
    xaxis: {
      categories: Array(estimationRange)
        .fill(0)
        .map((_, i) => t(`Year ${i + 1}`)),
    },
  })

  return (
    <div className='w-full'>
      <div>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col items-center justify-center gap-4'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
              <RHFTextField
                name='growthPercentage'
                label={t('Growth Percentage')}
                placeholder={`${t('Ex: ')}150`}
              />

              <RHFTextField
                name='acquisationCost'
                label={t('Customer Acquisition Cost')}
                placeholder={`${t('Ex: ')}3`}
              />
              <RHFTextField
                name='startingUsers'
                label={t('Starting Users')}
                placeholder={`${t('Ex: ')}100`}
              />
              <RHFTextField
                name='costDeploy'
                label={t('Cost Deploy/Month/User')}
                placeholder={`${t('Ex: ')}5`}
              />
            </div>
            <Table columns={state.columns} data={state.data} dispatch={dispatch} />
            <Button type='submit' size='large' variant='outlined'>
              {t('Calculate')}
            </Button>
          </div>
        </FormProvider>
      </div>

      {income.length === estimationRange && expence.length === estimationRange && (
        <ReactApexChart
          type='area'
          series={[
            { name: t('Income'), data: income },
            { name: t('Expense'), data: expence },
          ]}
          options={chartOptions}
          height={364}
          width='100%'
        />
      )}
    </div>
  )
}

export default index
