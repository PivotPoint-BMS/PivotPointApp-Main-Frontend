/* eslint-disable no-plusplus */
export default function makeData() {
  const data: {
    investement: string
    amount: number | string
    yearsOfUse: number | string
    physical: string
  }[] = []

  const columns: {
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
  }[] = [
    {
      id: 'investement',
      label: 'Investement',
      accessor: 'investement',
      dataType: 'text',
      placeholder: 'Enter investement',
      align: 'left',
    },
    {
      id: 'amount',
      label: 'Amount',
      accessor: 'amount',
      dataType: 'number',
      placeholder: 'Enter amount',
      align: 'right',
    },
    {
      id: 'yearsOfUse',
      label: 'Years Of Use',
      accessor: 'yearsOfUse',
      dataType: 'number',
      placeholder: 'Enter Years Of Use',
      align: 'right',
    },
    {
      id: 'physical',
      label: 'Is Physical?',
      accessor: 'physical',
      dataType: 'select',
      placeholder: '',
      align: 'left',
      options: [
        {
          label: 'Yes',
          value: 'true',
        },
        {
          label: 'No',
          value: 'false',
        },
      ],
    },
  ]

  return { columns, data }
}
