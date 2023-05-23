import React from 'react'
import clsx from 'clsx'
import Select from 'components/Select'

export default function Cell({
  value: initialValue,
  row: { index },
  column: { id, dataType, placeholder, options },
  dataDispatch,
}) {
  const [value, setValue] = React.useState(initialValue)

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const onBlur = () => {
    dataDispatch({ type: 'update_cell', columnId: id, rowIndex: index, value })
  }

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])
  switch (dataType) {
    case 'email':
      return (
        <input
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          type={dataType}
          placeholder={placeholder}
          className={clsx(
            'box-border h-full w-full flex-auto resize-none truncate whitespace-nowrap border-0 bg-transparent p-2',
            dataType === 'number' && 'text-right'
          )}
        />
      )
    case 'text':
      return (
        <input
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          type={dataType}
          placeholder={placeholder}
          className={clsx(
            'box-border h-full w-full flex-auto resize-none whitespace-nowrap border-0 bg-transparent p-2',
            dataType === 'number' && 'text-right'
          )}
        />
      )
    case 'select':
      return (
        <Select
          value={value}
          items={options}
          onValueChange={(newValue) => {
            setValue(newValue)
            dataDispatch({ type: 'update_cell', columnId: id, rowIndex: index, value: newValue })
          }}
          buttonProps={{
            className: 'w-full text-base h-full font-normal !justify-end',
            intent: 'default',
          }}
        />
      )
    default:
      return <p>{value}</p>
  }
}
