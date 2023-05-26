/* eslint-disable no-plusplus */
export default function makeData(range: number) {
  const data: {
    expense: string
    isFixedCharge: string
    [key: string]: string
  }[] = []
  // eslint-disable-next-line no-plusplus
  let row = {
    expense: '',
    isFixedCharge: 'true',
  }
  for (let i = 1; i <= range; i++) {
    row = { ...row, [i]: '' }
  }

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
      id: 'expense',
      label: 'Expense',
      accessor: 'expense',
      dataType: 'text',
      placeholder: 'Enter Expense',
      align: 'left',
    },
  ]

  for (let i = 1; i <= range; i++) {
    const column = {
      id: i.toString(),
      label: `Year ${i.toString()}`,
      accessor: i.toString(),
      dataType: 'number',
      placeholder: 'Enter the amount',
      align: 'right',
    }

    columns.push(column)
  }

  columns.push({
    id: 'isFixedCharge',
    label: 'Is Fixed Charge?',
    accessor: 'isFixedCharge',
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
  })

  return { columns, data }
}
