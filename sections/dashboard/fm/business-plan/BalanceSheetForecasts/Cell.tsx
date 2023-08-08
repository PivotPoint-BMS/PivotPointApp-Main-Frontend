import { isString, round } from "lodash"
import React from "react"
import { fCurrency } from "utils/formatNumber"
import { sentenceCase } from "text-case"
import clsx from "clsx"

export default function Cell({
  value,
  column: { align },
}: {
  value: string | number
  column: { align: string }
}) {
  return (
    <p
      className={clsx(
        "box-border w-full flex-auto resize-none border-0 bg-transparent p-2 px-5",
        align === "right" && "ltr:text-right rtl:text-left",
        align === "left" && "ltr:text-left rtl:text-right"
      )}
    >
      {isString(value) ? sentenceCase(value) : fCurrency(round(value, 2))}
    </p>
  )
}
