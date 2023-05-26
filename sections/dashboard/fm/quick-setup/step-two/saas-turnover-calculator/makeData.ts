export default function makeData() {
  const data: { name: string; price: string; userPercentage: string }[] = [
    {
      name: '',
      price: '',
      userPercentage: '',
    },
  ]

  const columns: {
    id: string
    label: string
    accessor: string
    dataType: string
    placeholder: string
    align:string
  }[] = [
    {
      id: 'name',
      label: 'Subscription name',
      accessor: 'name',
      dataType: 'text',
      placeholder: 'Enter Subscription name',
      align: 'left',
    },
    {
      id: 'price',
      label: 'Price',
      accessor: 'price',
      dataType: 'number',
      placeholder: 'Enter Price',
      align: 'right',
    },
    {
      id: 'userPercentage',
      label: 'User Percentage',
      accessor: 'userPercentage',
      dataType: 'number',
      placeholder: 'Enter User Percentage',
      align: 'right',
    },
  ]
  return { columns, data }
}
