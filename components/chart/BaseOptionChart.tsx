import { useTheme } from 'next-themes'

export default function BaseOptionChart(): ApexCharts.ApexOptions {
  const theme = useTheme()

  const LABEL_TOTAL = {
    show: true,
    label: 'Total',
    color: theme.theme === 'light' ? '#161c24' : '#ffffff',
    fontSize: '12px',
    fontWeight: 600,
    lineHeight: 18,
  }

  const LABEL_VALUE = {
    offsetY: 8,
    color: theme.theme === 'light' ? '#161c24' : '#ffffff',
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: 18,
  }

  return {
    // Colors
    colors: ['#1FAA69', '#FFBF00', '#0070BB', '#8A2BE2', '#568203', '#FF0800'],

    // Chart
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      // animations: { enabled: false },
      foreColor: '#4B5563',
      fontFamily: 'Poppins',
    },

    // States
    states: {
      hover: {
        filter: {
          type: 'lighten',
          value: 0.04,
        },
      },
      active: {
        filter: {
          type: 'darken',
          value: 0.88,
        },
      },
    },

    // Fill
    fill: {
      opacity: 1,
      gradient: {
        type: 'vertical',
        shadeIntensity: 0,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
      },
    },

    // Datalabels
    dataLabels: { enabled: false },

    // Stroke
    stroke: {
      width: 3,
      curve: 'smooth',
      lineCap: 'round',
    },

    // Grid
    grid: {
      strokeDashArray: 3,
      borderColor: '#9ca3af',
    },

    // Xaxis
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
    },

    // Markers
    markers: {
      size: 0,
      strokeColors: '#FFFFFF',
    },

    // Tooltip
    tooltip: {
      x: {
        show: false,
      },
    },

    // Legend
    legend: {
      show: true,
      fontSize: String(13),
      position: 'bottom',
      horizontalAlign: 'right',
      markers: {
        radius: 12,
      },
      fontWeight: 500,
      itemMargin: { horizontal: 12 },
      labels: {
        colors: '#161c24',
      },
    },

    // plotOptions
    plotOptions: {
      // Bar
      bar: {
        columnWidth: '28%',
        borderRadius: 4,
      },
      // Pie + Donut
      pie: {
        donut: {
          labels: {
            show: true,
            value: LABEL_VALUE,
            total: LABEL_TOTAL,
          },
        },
      },
      // Radialbar
      radialBar: {
        track: {
          strokeWidth: '100%',
          background: '#6b728029',
        },
        dataLabels: {
          value: LABEL_VALUE,
          total: LABEL_TOTAL,
        },
      },
      // Radar
      radar: {
        polygons: {
          fill: { colors: ['transparent'] },
          strokeColors: '#9ca3af',
          connectorColors: '#9ca3af',
        },
      },
      // polarArea
      polarArea: {
        rings: {
          strokeColor: '#9ca3af',
        },
        spokes: {
          connectorColors: '#9ca3af',
        },
      },
    },

    // Responsive
    responsive: [
      {
        // sm
        breakpoint: 639,
        options: {
          plotOptions: { bar: { columnWidth: '40%' } },
        },
      },
      {
        // md
        breakpoint: 767,
        options: {
          plotOptions: { bar: { columnWidth: '32%' } },
        },
      },
    ],
  }
}
