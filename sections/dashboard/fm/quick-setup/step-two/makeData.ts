/* eslint-disable no-plusplus */
export default function makeData(range: number) {
  const data: { source: string; [key: string]: string }[] = []
  // eslint-disable-next-line no-plusplus
  let row = { source: '' }
  for (let i = 1; i <= range; i++) {
    row = { ...row, [i]: '' }
  }

  data.push(row)

  const columns = [
    {
      id: 'source',
      label: 'Source',
      accessor: 'source',
      dataType: 'text',
      placeholder: 'Enter the source',
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
