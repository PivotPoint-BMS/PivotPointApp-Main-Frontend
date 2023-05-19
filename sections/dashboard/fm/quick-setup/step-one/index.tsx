import { useReducer } from 'react'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// components
import { Button, Radiobox } from 'components'
// sections
import Table from './Table'
import makeData from './makeData'

function reducer(
  state: {
    data: { NOFC: string; Prc: string; Am: string }[]
    columns: {
      id: string
      label: string
      accessor: string
      minWidth: number
      dataType: string
      placeholder: string
    }[]
  },
  action: { type: string; rowIndex: number; columnId: string; value: string }
) {
  switch (action.type) {
    case 'add_row':
      if (
        state.data[state.data.length - 1].Am !== '' &&
        state.data[state.data.length - 1].NOFC !== '' &&
        state.data[state.data.length - 1].Prc !== ''
      )
        return {
          ...state,
          data: [...state.data, { NOFC: '', Prc: '', Am: '' }],
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

    default:
      return state
  }
}

function StepOne({ handleNextStep }: { handleNextStep: () => void }) {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const [state, dispatch] = useReducer(reducer, makeData(1))
  return (
    <div className='container mx-auto flex h-full flex-col items-center justify-start gap-5 overflow-scroll py-10 px-4'>
      <h1 className='text-center text-2xl font-semibold'>{t('Financial Contributions')}</h1>
      <Table columns={state.columns} data={state.data} dispatch={dispatch} />
      <h1 className='text-center text-2xl font-semibold'>{t('Estimation Range')}</h1>
      <div className='flex flex-1 flex-col items-center gap-5'>
        <Radiobox name='range' value={2} label={t('2 years')} defaultChecked />
        <Radiobox name='range' value={3} label={t('3 years')} />
        <Radiobox name='range' value={4} label={t('4 years')} />
        <Radiobox name='range' value={5} label={t('5 years')} />
      </div>
      <Button
        onClick={() => {
          if (
            state.data.length > 0 &&
            state.data.every((d) => d.Am !== '' && d.NOFC !== '' && d.Prc !== '')
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

export default StepOne
