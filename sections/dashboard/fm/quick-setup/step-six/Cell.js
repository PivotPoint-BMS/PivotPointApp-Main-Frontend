import React from 'react'
import clsx from 'clsx'
// hooks
import useTranslate from 'hooks/useTranslate'
import Select from 'react-select'

export default function Cell({
  value: initialValue,
  row: { index },
  column: { id, dataType, placeholder, disabled, options },
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

  if (disabled)
    return (
      <p className='box-border w-full flex-auto resize-none whitespace-nowrap border-0 bg-transparent p-2 px-5 ltr:text-right rtl:text-left'>
        {value}
      </p>
    )

  switch (dataType) {
    case 'text':
      return (
        <input
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          type={dataType}
          placeholder={t(placeholder)}
          className={clsx(
            'box-border w-full flex-auto resize-none whitespace-nowrap border-0 bg-transparent p-2',
            dataType === 'number' && 'ltr:text-right rtl:text-left'
          )}
        />
      )
    case 'number':
      return (
        <input
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          type={dataType}
          placeholder={t(placeholder)}
          className={clsx(
            'box-border w-full flex-auto resize-none whitespace-nowrap border-0 bg-transparent p-2',
            dataType === 'number' && 'ltr:text-right rtl:text-left'
          )}
        />
      )
    case 'select':
      return (
        <Select
          options={options}
          className='react-select-container'
          classNamePrefix='react-select'
          defaultValue={options.filter((v) => initialValue === v.value)}
          getOptionLabel={(option) => t(option.label)}
          onChange={(val) => {
            dataDispatch({
              type: 'update_cell',
              columnId: id,
              rowIndex: index,
              value: val.value,
            })
          }}
        />
      )
    default:
      return <p>{value}</p>
  }
}
