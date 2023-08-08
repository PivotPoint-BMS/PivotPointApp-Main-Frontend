import React from "react"
import { merge } from "lodash"
import moment from "moment"
import Link from "next/link"
// hooks
import useTranslate from "hooks/useTranslate"
import useSnackbar from "hooks/useSnackbar"
import { useCopyToClipboard } from "usehooks-ts"
// components
import ReactApexChart, { BaseOptionChart } from "components/chart"
import Card from "components/Card"
import CardContent from "components/CardContent"
import CardHeader from "components/CardHeader"
import Button from "components/Button"
import { Icon } from "@iconify/react"
import { PATH_DASHBOARD } from "routes/paths"
import { useGetCompanyDetailsQuery } from "store/api/settings/settingsAPIs"

export default function CustomerSatisfaction({
  dataNegative,
  dataPositive,
  dataNeutral,
  days,
}: {
  dataNegative: number[]
  dataPositive: number[]
  dataNeutral: number[]
  days: string[]
}) {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention
  const [_, copy] = useCopyToClipboard()
  const { data, isLoading, isSuccess } = useGetCompanyDetailsQuery()

  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: "top", horizontalAlign: "right" },
    colors: ["#1FAA69", "#FF0800", "#0070BB"],
    xaxis: {
      categories: days.map((day) => moment(day).format("DD MMM")),
    },
  })
  return (
    <Card fullWidth className='sm:col-span-2 md:col-span-3'>
      <CardHeader
        title={t("Customer Satisfaction (last 30 days)")}
        subheader={t("Customer feedback analysis based on reviews sent through external API")}
        actions={
          <div className='flex items-center'>
            <Link href={PATH_DASHBOARD.crm["sentiment-analysis"]}>
              <Button
                variant='text'
                intent='secondary'
                endIcon={<Icon icon='mingcute:external-link-fill' />}
              >
                {t("More Info")}
              </Button>
            </Link>
            <Button
              variant='text'
              intent='primary'
              endIcon={<Icon icon='majesticons:link-line' height={18} />}
              loading={isLoading}
              onClick={() => {
                if (isSuccess)
                  copy(`https://app.pivotpointbms.com/feedback?companyId=${data.data.id}`).then(
                    () => open({ message: t("Feedback link copied to clipboard.") })
                  )
              }}
            >
              {t("Generate Feedback Link")}
            </Button>
          </div>
        }
      />
      <CardContent>
        <ReactApexChart
          type='bar'
          series={[
            { name: t("Positive"), data: dataPositive },
            { name: t("Negative"), data: dataNegative },
            { name: t("Neutral"), data: dataNeutral },
          ]}
          options={chartOptions}
          height={364}
          width='100%'
        />
      </CardContent>
    </Card>
  )
}
