/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
// routes
import { PATH_DASHBOARD } from 'routes/paths'

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

interface SideBarConfig {
  items: NavItemConfig[]
  isOpen: boolean
  isCollapsed: boolean
}

const initialState: SideBarConfig = {
  items: [
    {
      name: 'Customer Relationship',
      href: PATH_DASHBOARD.crm.root,
      icon: 'fa6-solid:handshake',
      subItems: [
        {
          name: 'Workflow',
          href: PATH_DASHBOARD.crm.workflow,
          icon: 'material-symbols:account-tree-rounded',
          badge: {
            label: 'Soon',
          },
        },
        {
          name: 'Contact & Lead',
          href: PATH_DASHBOARD.crm.contact,
          icon: 'fluent:contact-card-20-filled',
          badge: {
            label: 'Soon',
          },
        },
        {
          name: 'Customer Service',
          href: PATH_DASHBOARD.crm['customer-service'],
          icon: 'ri:customer-service-2-fill',
          badge: {
            label: 'Soon',
          },
        },
      ],
    },
    {
      name: 'Human Resource',
      href: PATH_DASHBOARD.hrm.root,
      icon: 'mdi:account-group',
      subItems: [
        {
          name: 'Recruitment',
          href: PATH_DASHBOARD.hrm.recruitment,
          icon: 'fa6-solid:users-gear',
          badge: {
            label: 'Soon',
          },
        },
        {
          name: 'Payroll',
          href: PATH_DASHBOARD.hrm.payroll,
          icon: 'material-symbols:payments-outline-rounded',
          badge: {
            label: 'Soon',
          },
        },
        {
          name: 'Benefits & Rewards',
          href: PATH_DASHBOARD.hrm.benefits,
          icon: 'fluent:reward-12-filled',
          badge: {
            label: 'Soon',
          },
        },
        {
          name: 'Performance',
          href: PATH_DASHBOARD.hrm.performance,
          icon: 'mingcute:performance-fill',
          badge: {
            label: 'Soon',
          },
        },
      ],
    },
    {
      name: 'Projects',
      href: PATH_DASHBOARD.pm.root,
      icon: 'bi:kanban-fill',
      subItems: [
        {
          name: 'Project Planning',
          href: PATH_DASHBOARD.pm.planning,
          icon: 'icon-park-solid:schedule',
          badge: {
            label: 'Soon',
          },
        },
        {
          name: 'Tracking',
          href: PATH_DASHBOARD.pm.tracking,
          icon: 'material-symbols:timer-rounded',
          badge: {
            label: 'Soon',
          },
        },
        {
          name: 'Product Building Pipelines',
          href: PATH_DASHBOARD.pm.pipelines,
          icon: 'ph:tree-structure-fill',
          badge: {
            label: 'Soon',
          },
        },
      ],
    },
    {
      name: 'Inventory',
      href: PATH_DASHBOARD.im.root,
      icon: 'material-symbols:inventory-2-rounded',
      subItems: [
        {
          name: 'Product/Service',
          href: PATH_DASHBOARD.im['product-service'],
          icon: 'fa6-solid:boxes-stacked',
          badge: {
            label: 'Soon',
          },
        },
      ],
    },
    {
      name: 'Supply Chain',
      href: PATH_DASHBOARD.scm.root,
      icon: 'fa6-solid:truck-ramp-box',
      subItems: [
        {
          name: 'Monitoring & Planning',
          href: PATH_DASHBOARD.scm.monitoring,
          icon: 'material-symbols:monitor-heart-rounded',
          badge: {
            label: 'Soon',
          },
        },
        {
          name: 'Warehousing',
          href: PATH_DASHBOARD.scm.warehousing,
          icon: 'fa6-solid:warehouse',
          badge: {
            label: 'Soon',
          },
        },
        {
          name: 'Transportation',
          href: PATH_DASHBOARD.scm.transportation,
          icon: 'fluent:vehicle-truck-profile-20-filled',
          badge: {
            label: 'Soon',
          },
        },
        {
          name: 'Demand Forecasting',
          href: PATH_DASHBOARD.scm['demand-forecasting'],
          icon: 'material-symbols:batch-prediction',
          badge: {
            label: 'Soon',
          },
        },
      ],
    },
    {
      name: 'Finance',
      href: PATH_DASHBOARD.fm.root,
      icon: 'fa-solid:money-check-alt',
      subItems: [
        {
          name: 'Cash',
          href: PATH_DASHBOARD.fm.cash,
          icon: 'ion:cash',
          badge: {
            label: 'Soon',
          },
        },
        {
          name: 'Expenses & Incomes',
          href: PATH_DASHBOARD.fm['expences-incomes'],
          icon: 'fa6-solid:money-bill-transfer',
          badge: {
            label: 'Soon',
          },
        },
        {
          name: 'Funding',
          href: PATH_DASHBOARD.fm.funding,
          icon: 'icon-park-outline:funds',
          badge: {
            label: 'Soon',
          },
        },
        {
          name: 'Asset',
          href: PATH_DASHBOARD.fm.assets,
          icon: 'material-symbols:real-estate-agent-rounded',
          badge: {
            label: 'Soon',
          },
        },
        {
          name: 'Risk',
          href: PATH_DASHBOARD.fm.risk,
          icon: 'jam:triangle-danger-f',
          badge: {
            label: 'Soon',
          },
        },
        {
          name: 'Tax',
          href: PATH_DASHBOARD.fm.tax,
          icon: 'majesticons:money-hand',
          badge: {
            label: 'Soon',
          },
        },
        {
          name: 'Invoice',
          href: PATH_DASHBOARD.fm.invoice,
          icon: 'fa6-solid:file-invoice',
          badge: {
            label: 'Soon',
          },
        },
      ],
    },
  ],
  isOpen: false,
  isCollapsed: false,
}

const sideBarSlice = createSlice({
  name: 'sideBar',
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true
    },
    close: (state) => {
      state.isOpen = false
    },
    collapse: (state) => {
      state.isCollapsed = true
    },
    extend: (state) => {
      state.isCollapsed = false
    },
  },
})

export const { close, open, collapse, extend } = sideBarSlice.actions

export default sideBarSlice
