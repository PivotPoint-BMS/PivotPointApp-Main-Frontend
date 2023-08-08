import Head from "next/head"
// utils
import { merge } from "lodash"
import clsx from "clsx"
// hooks
import useTranslate from "hooks/useTranslate"
// components
import { Card, CardHeader, CardContent } from "components"
import ReactApexChart, { BaseOptionChart } from "components/chart"
// layout
import Layout from "layout/Index"

const CHART_DATA = [
  {
    name: "Task Completed",
    type: "column",
    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
  },
  {
    name: "Expences",
    type: "area",
    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
  },
  {
    name: "Converted Leads",
    type: "line",
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
  },
]
function Home() {
  const { t } = useTranslate()

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: "14%" } },
    fill: { type: ["solid", "gradient", "solid"] },
    labels: [
      "01/01/2003",
      "02/01/2003",
      "03/01/2003",
      "04/01/2003",
      "05/01/2003",
      "06/01/2003",
      "07/01/2003",
      "08/01/2003",
      "09/01/2003",
      "10/01/2003",
      "11/01/2003",
    ],
    xaxis: { type: "datetime" },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y: number) => {
          if (typeof y !== "undefined") {
            return `${y.toFixed(0)}`
          }
          return y
        },
      },
    },
  })
  return (
    <>
      <Head>
        <title>Pivot Point BMS | {t("Dashboard")}</title>
      </Head>
      <div className={clsx("grid gap-6 p-4 pt-24", "grid-cols-6")}>
        {/* Col 1 */}
        <Card
          fullWidth
          className='col-span-6 overflow-clip sm:col-span-3 md:col-span-2 lg:col-span-1'
        >
          <CardHeader title='Contacts (Leads)' className='pb-2 [&>*]:text-lg' />
          <CardContent className=''>
            <h3 className='text-2xl'>10</h3>
          </CardContent>
        </Card>{" "}
        <Card
          fullWidth
          className='col-span-6 overflow-clip sm:col-span-3 md:col-span-2 lg:col-span-1'
        >
          <CardHeader title='Users' className='pb-2 [&>*]:text-lg' />
          <CardContent>
            <h3 className='text-2xl'>10</h3>
          </CardContent>
        </Card>{" "}
        <Card
          fullWidth
          className='col-span-6 overflow-clip sm:col-span-3 md:col-span-2 lg:col-span-1'
        >
          <CardHeader title='Workers' className='pb-2 [&>*]:text-lg' />
          <CardContent>
            <h3 className='text-2xl'>10</h3>
          </CardContent>
        </Card>{" "}
        <Card
          fullWidth
          className='col-span-6 overflow-clip sm:col-span-3 md:col-span-2 lg:col-span-1'
        >
          <CardHeader title='Products' className='pb-2 [&>*]:text-lg' />
          <CardContent>
            <h3 className='text-2xl'>10</h3>
          </CardContent>
        </Card>{" "}
        <Card
          fullWidth
          className='col-span-6 overflow-clip sm:col-span-3 md:col-span-2 lg:col-span-1'
        >
          <CardHeader title='AI Usage' className='pb-2 [&>*]:text-lg' />
          <CardContent>
            <h3 className='text-2xl'>10</h3>
          </CardContent>
        </Card>
        <Card
          fullWidth
          className='col-span-6 overflow-clip sm:col-span-3 md:col-span-2 lg:col-span-1'
        >
          <CardHeader title='Contacts' className='pb-2 [&>*]:text-lg' />
          <CardContent>
            <h3 className='text-2xl'>10</h3>
          </CardContent>
        </Card>
        {/* Col 2 */}
        <Card fullWidth className='col-span-6 md:col-span-4'>
          <CardHeader title='Title' />
          <CardContent>
            <ReactApexChart
              type='bar'
              series={CHART_DATA}
              options={chartOptions}
              height={364}
              width='100%'
            />
          </CardContent>
        </Card>
        <Card fullWidth className='col-span-6 md:col-span-2'>
          <CardHeader title='Title' />
        </Card>
        {/* Col 3 */}
        <Card fullWidth className='col-span-6 md:col-span-4'>
          <CardHeader title='Title' />
        </Card>
        <Card fullWidth className='col-span-6 md:col-span-2'>
          <CardHeader title='Title' />
        </Card>
      </div>
    </>
  )
}

Home.getLayout = function getLayout(page: JSX.Element) {
  return <Layout variant='dashboard'>{page}</Layout>
}

export default Home
