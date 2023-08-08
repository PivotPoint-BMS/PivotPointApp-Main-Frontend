/* eslint-disable no-plusplus */
export default function makeData(range: number) {
  const data: {
    [key: string]: string
  }[] = []
  // eslint-disable-next-line no-plusplus
  let row = {}
  for (let i = 1; i <= range; i++) {
    row = { ...row, [i]: "" }
  }
  data.push(row)

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
  }[] = []

  for (let i = 1; i <= range; i++) {
    const column = {
      id: i.toString(),
      label: `Year ${i.toString()}`,
      accessor: i.toString(),
      dataType: "number",
      placeholder: "Enter the amount",
      align: "right",
    }

    columns.push(column)
  }

  return { columns, data }
}
