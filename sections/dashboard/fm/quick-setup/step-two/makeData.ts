export default function makeData(count: number) {
  const data: { service: string; [key: string]: string }[] = []
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < count; i++) {
    const row = {
      service: '',
      1: '',
    }

    data.push(row)
  }

  const columns = [
    {
      id: 'service',
      label: 'Service',
      accessor: 'service',
      dataType: 'text',
      placeholder: 'Enter the service',
    },
    {
      id: '1',
      label: 'Year 1',
      accessor: '1',
      dataType: 'number',
      placeholder: 'Enter the amount',
    },
  ]
  return { columns, data }
}
