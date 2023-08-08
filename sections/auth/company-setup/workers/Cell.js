import React from "react"
import clsx from "clsx"
import Select from "react-select"

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
    dataDispatch({ type: "update_cell", columnId: id, rowIndex: index, value })
  }

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  switch (dataType) {
    case "email":
      return (
        <input
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          type={dataType}
          placeholder={placeholder}
          className={clsx(
            "box-border h-full w-full flex-auto resize-none truncate whitespace-nowrap border-0 bg-transparent p-2",
            dataType === "number" && "text-right"
          )}
        />
      )
    case "text":
      return (
        <input
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          type={dataType}
          placeholder={placeholder}
          className={clsx(
            "box-border h-full w-full flex-auto resize-none whitespace-nowrap border-0 bg-transparent p-2",
            dataType === "number" && "text-right"
          )}
        />
      )
    case "select":
      return (
        <Select
          options={options}
          isMulti
          className='react-select-container'
          classNamePrefix='react-select'
          defaultValue={options.filter((v) => initialValue.split(",").includes(v.value))}
          onChange={(val) => {
            if (val.map((v) => v.value).includes("Owner"))
              dataDispatch({
                type: "update_cell",
                columnId: id,
                rowIndex: index,
                value: "Owner",
              })
            else
              dataDispatch({
                type: "update_cell",
                columnId: id,
                rowIndex: index,
                value: val.map((v) => v.value).join(","),
              })
          }}
        />
      )
    default:
      return <p>{value}</p>
  }
}
