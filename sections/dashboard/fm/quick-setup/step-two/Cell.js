import clsx from 'clsx'
import React from 'react'

export default function Cell({
  value: initialValue,
  row: { index },
  column: { id, dataType, placeholder, disabled },
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

  return disabled ? (
    <p>{initialValue}</p>
  ) : (
    <input
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      type={dataType}
      placeholder={placeholder}
      className={clsx(
        'box-border w-full flex-auto resize-none whitespace-nowrap border-0 bg-transparent p-2',
        dataType === 'number' && 'text-right'
      )}
    />
  )
}
