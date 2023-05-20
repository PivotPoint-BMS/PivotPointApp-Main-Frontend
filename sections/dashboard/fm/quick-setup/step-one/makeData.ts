export default function makeData(count: number) {
  const data: { NOFC: string; Prc: string; Am: string }[] = []
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < count; i++) {
    const row = {
      NOFC: '',
      Prc: '',
      Am: '',
    }

    data.push(row)
  }

  const columns = [
    {
      id: 'NOFC',
      label: 'Nature of financial contributions',
      accessor: 'NOFC',
      minWidth: 100,
      dataType: 'text',
      placeholder: 'Enter Nature of financial contributions',
      disabled: false,
    },
    {
      id: 'Prc',
      label: 'Percentage',
      accessor: 'Prc',
      minWidth: 100,
      dataType: 'number',
      placeholder: '',
      disabled: true,
    },
    {
      id: 'Am',
      label: 'Amount',
      accessor: 'Am',
      minWidth: 100,
      dataType: 'number',
      placeholder: 'Enter the Amount',
      disabled: false,
    },
    {
      id: 'interestRate',
      label: 'Interest Rate',
      accessor: 'interestRate',
      minWidth: 100,
      dataType: 'number',
      placeholder: 'Enter the interest rate',
      disabled: false,
    },
  ]
  return { columns, data }
}
