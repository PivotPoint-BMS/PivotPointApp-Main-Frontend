import clsx from 'clsx'
import React from 'react'

export default function Cell({
  value: initialValue,
  row: { index },
  column: { id, dataType, placeholder },
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

  return (
    <input
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      type={dataType}
      placeholder={placeholder}
      className={clsx(
        'box-border w-full flex-auto resize-none whitespace-nowrap border-0 p-2',
        dataType === 'number' && 'text-right'
      )}
    />
  )
}
