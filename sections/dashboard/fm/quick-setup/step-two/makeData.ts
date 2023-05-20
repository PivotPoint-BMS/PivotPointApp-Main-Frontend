/* eslint-disable no-plusplus */
export default function makeData(range: number) {
  const data: { service: string; [key: string]: string }[] = []
  // eslint-disable-next-line no-plusplus
  let row = { service: '' }
  for (let i = 1; i <= range; i++) {
    row = { ...row, [i]: '' }
  }

  data.push(row)

  const columns = [
    {
      id: 'service',
      label: 'Service',
      accessor: 'service',
      dataType: 'text',
      placeholder: 'Enter the service',
      align: 'center',
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
  return { columns, data }
}
