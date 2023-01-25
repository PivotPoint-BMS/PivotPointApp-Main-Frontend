import { createSlice } from '@reduxjs/toolkit'

export interface NavItemConfig {
  name: string
  href: string
  icon: string
  subItems: {
    name: string
    href: string
    icon: string
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
        href: '/crm/workflow-automation',
        icon: 'material-symbols:account-tree-rounded',
      },
      {
        name: 'Contact & Lead',
        href: '/crm/contact',
        icon: 'fluent:contact-card-20-filled',
      },
      {
        name: 'Customer Service',
        href: '/crm/customer-service',
        icon: 'ri:customer-service-2-fill',
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
      },
      { name: 'Payroll', href: '/hrm/payroll', icon: 'material-symbols:payments-outline-rounded' },
      {
        name: 'Benefits & Rewards',
        href: '/hrm/rewards',
        icon: 'fluent:reward-12-filled',
      },
      {
        name: 'Performance Management',
        href: '/hrm/performance',
        icon: 'mingcute:performance-fill',
      },
    ],
  },
  {
    name: 'Projects',
    href: '/pm',
    icon: 'bi:kanban-fill',
    subItems: [
      { name: 'Project Planning', href: '/pm/plannig', icon: 'icon-park-solid:schedule' },
      { name: 'Time tracking', href: '/pm/tracking', icon: 'material-symbols:timer-rounded' },
      { name: 'Product Building Pipelines', href: '/pm/pipelines', icon: 'ph:tree-structure-fill' },
    ],
  },
  {
    name: 'Inventory',
    href: '/im',
    icon: 'material-symbols:inventory-2-rounded',
    subItems: [
      {
        name: 'Product/Service Management',
        href: '/im/products-service',
        icon: 'fa6-solid:boxes-stacked',
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
      },
      { name: 'Warehousing', href: '/scm', icon: 'fa6-solid:warehouse' },
      {
        name: 'Transportation Management',
        href: '/scm/transportation',
        icon: 'fluent:vehicle-truck-profile-20-filled',
      },
      {
        name: 'Demand Forecasting',
        href: '/scm/demand-forecasting',
        icon: 'material-symbols:batch-prediction',
      },
    ],
  },
  {
    name: 'Finance',
    href: '/fm',
    icon: 'fa-solid:money-check-alt',
    subItems: [
      { name: 'Cash Management', href: '/fm', icon: 'ion:cash' },
      {
        name: 'Expenses & Incomes',
        href: '/fm/expenses-incomes',
        icon: 'fa6-solid:money-bill-transfer',
      },
      {
        name: 'Funding Management',
        href: '/fm/funding',
        icon: 'icon-park-outline:funds',
      },
      {
        name: 'Asset Management',
        href: '/fm/assets',
        icon: 'material-symbols:real-estate-agent-rounded',
      },
      {
        name: 'Risk Management',
        href: '/fm/risk',
        icon: 'jam:triangle-danger-f',
      },
      { name: 'Tax Management', href: '/fm/tax', icon: 'majesticons:money-hand' },
      {
        name: 'Invoice Management',
        href: '/fm/invoice',
        icon: 'fa6-solid:file-invoice',
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
