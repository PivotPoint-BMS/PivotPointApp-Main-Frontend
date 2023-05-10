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
          name: 'Dashboard',
          href: PATH_DASHBOARD.crm.dashboard,
          icon: 'material-symbols:dashboard-rounded',
          badge: {
            label: 'Beta',
          },
        },
        {
          name: 'Contacts & Leads',
          href: PATH_DASHBOARD.crm['contacts-leads'].root,
          icon: 'material-symbols:contact-page',
          badge: {
            label: 'Beta',
          },
        },

        {
          name: 'Sales Pipeline',
          href: PATH_DASHBOARD.crm['sales-pipeline'],
          icon: 'icon-park-solid:sales-report',
          badge: {
            label: 'Beta',
          },
        },
        {
          name: 'Workflow',
          href: PATH_DASHBOARD.crm.workflow,
          icon: 'material-symbols:account-tree-rounded',
          disabled: true,
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
          name: 'Dashboard',
          href: PATH_DASHBOARD.hrm.dashboard,
          icon: 'material-symbols:dashboard-rounded',
          badge: {
            label: 'Beta',
          },
        },
        {
          name: 'Accounts',
          href: PATH_DASHBOARD.crm.accounts,
          icon: 'material-symbols:manage-accounts',
          disabled: true,
          badge: {
            label: 'Soon',
          },
        },
        {
          name: 'Recruitment',
          href: PATH_DASHBOARD.hrm.recruitment,
          icon: 'fa6-solid:users-gear',
          disabled: true,
          badge: {
            label: 'Soon',
          },
        },
        {
          name: 'Payroll',
          href: PATH_DASHBOARD.hrm.payroll,
          icon: 'material-symbols:payments-outline-rounded',
          disabled: true,
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
          name: 'Dashboard',
          href: PATH_DASHBOARD.pm.dashboard,
          icon: 'material-symbols:dashboard-rounded',
          badge: {
            label: 'Beta',
          },
        },
        {
          name: 'Project Planning',
          href: PATH_DASHBOARD.pm.planning,
          icon: 'icon-park-solid:schedule',
          disabled: true,
          badge: {
            label: 'Soon',
          },
        },
        {
          name: 'Tracking',
          href: PATH_DASHBOARD.pm.tracking,
          icon: 'material-symbols:timer-rounded',
          disabled: true,
          badge: {
            label: 'Soon',
          },
        },
        {
          name: 'Product Building Pipelines',
          href: PATH_DASHBOARD.pm.pipelines,
          icon: 'ph:tree-structure-fill',
          disabled: true,
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
          name: 'Dashboard',
          href: PATH_DASHBOARD.im.dashboard,
          icon: 'material-symbols:dashboard-rounded',
          badge: {
            label: 'Beta',
          },
        },
        {
          name: 'Product/Service',
          href: PATH_DASHBOARD.im['product-service'],
          icon: 'fa6-solid:boxes-stacked',
          disabled: true,
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
          name: 'Dashboard',
          href: PATH_DASHBOARD.scm.dashboard,
          icon: 'material-symbols:dashboard-rounded',
          badge: {
            label: 'Beta',
          },
        },
        {
          name: 'Monitoring & Planning',
          href: PATH_DASHBOARD.scm.monitoring,
          icon: 'material-symbols:monitor-heart-rounded',
          disabled: true,
          badge: {
            label: 'Soon',
          },
        },
        {
          name: 'Warehousing',
          href: PATH_DASHBOARD.scm.warehousing,
          icon: 'fa6-solid:warehouse',
          disabled: true,
          badge: {
            label: 'Soon',
          },
        },
        {
          name: 'Transportation',
          href: PATH_DASHBOARD.scm.transportation,
          icon: 'fluent:vehicle-truck-profile-20-filled',
          disabled: true,
          badge: {
            label: 'Soon',
          },
        },
        {
          name: 'Demand Forecasting',
          href: PATH_DASHBOARD.scm['demand-forecasting'],
          icon: 'material-symbols:batch-prediction',
          disabled: true,
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
          name: 'Dashboard',
          href: PATH_DASHBOARD.fm.dashboard,
          icon: 'material-symbols:dashboard-rounded',
          badge: {
            label: 'Beta',
          },
        },
        {
          name: 'Cash',
          href: PATH_DASHBOARD.fm.cash,
          icon: 'ion:cash',
          disabled: true,
          badge: {
            label: 'Soon',
          },
        },
        {
          name: 'Expenses & Incomes',
          href: PATH_DASHBOARD.fm['expences-incomes'],
          icon: 'fa6-solid:money-bill-transfer',
          disabled: true,
          badge: {
            label: 'Soon',
          },
        },
        {
          name: 'Funding',
          href: PATH_DASHBOARD.fm.funding,
          icon: 'icon-park-outline:funds',
          disabled: true,
          badge: {
            label: 'Soon',
          },
        },
        {
          name: 'Asset',
          href: PATH_DASHBOARD.fm.assets,
          icon: 'material-symbols:real-estate-agent-rounded',
          disabled: true,
          badge: {
            label: 'Soon',
          },
        },
        {
          name: 'Risk',
          href: PATH_DASHBOARD.fm.risk,
          icon: 'jam:triangle-danger-f',
          disabled: true,
          badge: {
            label: 'Soon',
          },
        },
        {
          name: 'Tax',
          href: PATH_DASHBOARD.fm.tax,
          icon: 'majesticons:money-hand',
          disabled: true,
          badge: {
            label: 'Soon',
          },
        },
        {
          name: 'Invoice',
          href: PATH_DASHBOARD.fm.invoice,
          icon: 'fa6-solid:file-invoice',
          disabled: true,
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
