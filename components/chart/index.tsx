import dynamic from 'next/dynamic'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

// ----------------------------------------------------------------------

export { default as BaseOptionChart } from './BaseOptionChart'

export default ReactApexChart
