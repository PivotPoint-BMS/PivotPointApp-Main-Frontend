import { StepOneState } from 'store/api/fm/financeSetupApi'

export default function makeData() {
  const data: StepOneState['financements'] = [
    { amount: '', interestRate: '', source: '', percentage: '' },
  ]
  // eslint-disable-next-line no-plusplus

  const columns = [
    {
      id: 'source',
      label: 'Nature of financial contributions',
      accessor: 'source',
      minWidth: 100,
      dataType: 'text',
      placeholder: 'Enter Nature of financial contributions',
      disabled: false,
      align: 'left',
    },
    {
      id: 'percentage',
      label: 'Percentage',
      accessor: 'percentage',
      minWidth: 100,
      dataType: 'number',
      placeholder: '',
      disabled: true,
      align: 'right',
    },
    {
      id: 'amount',
      label: 'Amount',
      accessor: 'amount',
      minWidth: 100,
      dataType: 'number',
      placeholder: 'Enter the Amount',
      disabled: false,
      align: 'right',
    },
    {
      id: 'interestRate',
      label: 'Interest Rate',
      accessor: 'interestRate',
      minWidth: 100,
      dataType: 'number',
      placeholder: 'Ex: 10%',
      disabled: false,
      align: 'right',
    },
  ]
  return { columns, data }
}
