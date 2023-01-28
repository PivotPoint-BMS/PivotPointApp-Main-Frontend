import { createSlice } from '@reduxjs/toolkit'

export interface NavItemConfig {
  name: string
  href: string
  icon: string
  subItems: {
    name: string
    href: string
    icon: string
    disabled?: boolean
    badge?: {
      label: string
      icon?: string
    }
  }[]
}

const initialState: NavItemConfig[] = [
  {
    name: 'Customer Relationship',
    href: '/crm',
    icon: 'fa6-solid:handshake',
    subItems: [
      {
        name: 'Workflow',
        href: '/crm/workflow',
        icon: 'material-symbols:account-tree-rounded',
        badge: {
          label: 'Soon',
        },
      },
      {
        name: 'Contact & Lead',
        href: '/crm/contact',
        icon: 'fluent:contact-card-20-filled',
        badge: {
          label: 'Soon',
        },
      },
      {
        name: 'Customer Service',
        href: '/crm/customer-service',
        icon: 'ri:customer-service-2-fill',
        badge: {
          label: 'Soon',
        },
      },
    ],
  },
  {
    name: 'Human Resource',
    href: '/hrm',
    icon: 'mdi:account-group',
    subItems: [
      {
        name: 'Recruitment',
        href: '/hrm/recruitment',
        icon: 'fa6-solid:users-gear',
        badge: {
          label: 'Soon',
        },
      },
      {
        name: 'Payroll',
        href: '/hrm/payroll',
        icon: 'material-symbols:payments-outline-rounded',
        badge: {
          label: 'Soon',
        },
      },
      {
        name: 'Benefits & Rewards',
        href: '/hrm/benefits-rewards',
        icon: 'fluent:reward-12-filled',
        badge: {
          label: 'Soon',
        },
      },
      {
        name: 'Performance',
        href: '/hrm/performance',
        icon: 'mingcute:performance-fill',
        badge: {
          label: 'Soon',
        },
      },
    ],
  },
  {
    name: 'Projects',
    href: '/pm',
    icon: 'bi:kanban-fill',
    subItems: [
      {
        name: 'Project Planning',
        href: '/pm/plannig',
        icon: 'icon-park-solid:schedule',
        badge: {
          label: 'Soon',
        },
      },
      {
        name: 'Time tracking',
        href: '/pm/tracking',
        icon: 'material-symbols:timer-rounded',
        badge: {
          label: 'Soon',
        },
      },
      {
        name: 'Product Building Pipelines',
        href: '/pm/pipelines',
        icon: 'ph:tree-structure-fill',
        badge: {
          label: 'Soon',
        },
      },
    ],
  },
  {
    name: 'Inventory',
    href: '/im',
    icon: 'material-symbols:inventory-2-rounded',
    subItems: [
      {
        name: 'Product/Service',
        href: '/im/product-service',
        icon: 'fa6-solid:boxes-stacked',
        badge: {
          label: 'Soon',
        },
      },
    ],
  },
  {
    name: 'Supply Chain',
    href: '/scm',
    icon: 'fa6-solid:truck-ramp-box',
    subItems: [
      {
        name: 'Monitoring & Planning',
        href: '/scm/monitoring',
        icon: 'material-symbols:monitor-heart-rounded',
        badge: {
          label: 'Soon',
        },
      },
      {
        name: 'Warehousing',
        href: '/scm/warehousing',
        icon: 'fa6-solid:warehouse',
        badge: {
          label: 'Soon',
        },
      },
      {
        name: 'Transportation',
        href: '/scm/transportation',
        icon: 'fluent:vehicle-truck-profile-20-filled',
        badge: {
          label: 'Soon',
        },
      },
      {
        name: 'Demand Forecasting',
        href: '/scm/demand-forecasting',
        icon: 'material-symbols:batch-prediction',
        badge: {
          label: 'Soon',
        },
      },
    ],
  },
  {
    name: 'Finance',
    href: '/fm',
    icon: 'fa-solid:money-check-alt',
    subItems: [
      {
        name: 'Cash',
        href: '/fm/cash',
        icon: 'ion:cash',
        badge: {
          label: 'Soon',
        },
      },
      {
        name: 'Expenses & Incomes',
        href: '/fm/expenses-incomes',
        icon: 'fa6-solid:money-bill-transfer',
        badge: {
          label: 'Soon',
        },
      },
      {
        name: 'Funding',
        href: '/fm/funding',
        icon: 'icon-park-outline:funds',
        badge: {
          label: 'Soon',
        },
      },
      {
        name: 'Asset',
        href: '/fm/assets',
        icon: 'material-symbols:real-estate-agent-rounded',
        badge: {
          label: 'Soon',
        },
      },
      {
        name: 'Risk',
        href: '/fm/risk',
        icon: 'jam:triangle-danger-f',
        badge: {
          label: 'Soon',
        },
      },
      {
        name: 'Tax',
        href: '/fm/tax',
        icon: 'majesticons:money-hand',
        badge: {
          label: 'Soon',
        },
      },
      {
        name: 'Invoice',
        href: '/fm/invoice',
        icon: 'fa6-solid:file-invoice',
        badge: {
          label: 'Soon',
        },
      },
    ],
  },
]

export const sideBarSlice = createSlice({
  name: 'sideBar',
  initialState,
  reducers: {},
})

// Action creators are generated for each case reducer function
// export const { } = sideBarSlice.actions

export default sideBarSlice.reducer
