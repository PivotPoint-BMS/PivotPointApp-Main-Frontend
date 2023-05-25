import React from 'react'
import clsx from 'clsx'
// hooks
import useTranslate from 'hooks/useTranslate'

export default function Cell({
  value: initialValue,
  row: { index },
  column: { id, dataType, placeholder, disabled },
  dataDispatch,
}) {
  const { t } = useTranslate()
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
      placeholder={t(placeholder)}
      className={clsx(
        'box-border w-full flex-auto resize-none whitespace-nowrap border-0 bg-transparent p-2 px-5',
        dataType === 'number' && 'ltr:text-right rtl:text-left'
      )}
    />
  )
}
