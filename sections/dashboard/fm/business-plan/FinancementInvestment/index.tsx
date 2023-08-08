import { useMemo } from "react"
// hooks
import useTranslate from "hooks/useTranslate"
// utils
import { fCurrency } from "utils/formatNumber"
// types
import { BusinessPlan } from "types"
// components
import { Card, CardContent, CardHeader } from "components"
// sections
import Table from "./Table"

const financementsColumns = [
  {
    id: "source",
    label: "Source",
    accessor: "source",
    align: "left",
  },
  {
    id: "amount",
    label: "Amount",
    accessor: "amount",
    align: "right",
  },
]

const investementsColumns = [
  {
    id: "investement",
    label: "Investment",
    accessor: "investement",
    align: "left",
  },
  {
    id: "amount",
    label: "Amount",
    accessor: "amount",
    align: "right",
  },
]

export default function index({ data }: { data: BusinessPlan["financialPlan"] }) {
  const { t } = useTranslate()
  const totalFinancements = useMemo(
    () => data.financements.reduce((partialSum, a) => partialSum + a.amount, 0),
    [data]
  )
  const totalInvestements = useMemo(
    () => data.investements.reduce((partialSum, a) => partialSum + a.amount, 0),
    [data]
  )
  return (
    <Card fullWidth className='overflow-hidden'>
      <CardHeader
        title={t("Financial Plan")}
        className='!pb-2'
        subheader={t(
          "A financial plan table that shows investments and financing provides a structured overview of the allocated resources and funding sources for various investments"
        )}
      />

      <CardContent>
        <div className='grid grid-cols-1 sm:grid-cols-2'>
          <Table isFinancement={false} columns={investementsColumns} data={data.investements} />
          <Table isFinancement columns={financementsColumns} data={data.financements} />
          <p className='flex-1 p-2 px-5 font-medium ltr:text-left rtl:text-right'>
            {t("Funding surplus")}: {fCurrency(totalFinancements - totalInvestements)} {t("Da")}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
