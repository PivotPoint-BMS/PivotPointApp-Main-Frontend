/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
// routes
import { PATH_DASHBOARD } from 'routes/paths'

export interface NavItemConfig {
  name: string
  root: string
  href: string
  icon: string
  disabled?: boolean
  badge?: {
    label: string
    color?: 'primary' | 'secondary' | 'info' | 'warning' | 'error' | 'success' | 'default'
  }
  subItems?: {
    name: string
    href: string
    icon: string
    disabled?: boolean
    badge?: {
      label: string
      color?: 'primary' | 'secondary' | 'info' | 'warning' | 'error' | 'success' | 'default'
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
      root: PATH_DASHBOARD.crm.root,
      href: PATH_DASHBOARD.crm.dashboard,
      icon: 'fa6-solid:handshake',
      subItems: [
        {
          name: 'Monitoring',
          href: PATH_DASHBOARD.crm.dashboard,
          icon: 'solar:graph-bold',
          badge: {
            label: 'Beta',
            color: 'warning',
          },
        },
        {
          name: 'Contacts & Leads',
          href: PATH_DASHBOARD.crm['contacts-leads'].root,
          icon: 'material-symbols:contact-page',
          badge: {
            label: 'Beta',
            color: 'warning',
          },
        },

        {
          name: 'Sales Pipeline',
          href: PATH_DASHBOARD.crm['sales-pipeline'],
          icon: 'icon-park-solid:sales-report',
          badge: {
            label: 'Beta',
            color: 'warning',
          },
        },
        {
          name: 'Customer Service',
          href: PATH_DASHBOARD.crm['customer-service'],
          icon: 'ri:customer-service-2-fill',
          disabled: true,
          badge: {
            label: 'In Dev',
            color: 'default',
          },
        },
      ],
    },
    {
      name: 'Supply Chain & Inventory',
      root: PATH_DASHBOARD.scm.root,
      href: PATH_DASHBOARD.scm.dashboard,
      icon: 'fa6-solid:truck-ramp-box',
      subItems: [
        {
          name: 'Monitoring',
          href: PATH_DASHBOARD.scm.dashboard,
          icon: 'solar:graph-bold',
          badge: {
            label: 'New',
            color: 'success',
          },
        },
        {
          name: 'Product/Service',
          href: PATH_DASHBOARD.scm['product-service'].list,
          icon: 'fa6-solid:boxes-stacked',
          badge: {
            label: 'New',
            color: 'success',
          },
        },
        {
          name: 'Transportation',
          href: PATH_DASHBOARD.scm.transportation,
          icon: 'fluent:vehicle-truck-profile-20-filled',
          badge: {
            label: 'New',
            color: 'success',
          },
        },
        // {
        //   name: 'Demand Forecasting',
        //   href: PATH_DASHBOARD.scm['demand-forecasting'],
        //   icon: 'material-symbols:batch-prediction',
        //   disabled: true,
        //   badge: {
        //     label: 'In Dev',
        //     color: 'default',
        //   },
        // },
        // {
        //   name: 'Invoice',
        //   href: PATH_DASHBOARD.scm.invoice,
        //   icon: 'fa6-solid:file-invoice',
        //   disabled: true,
        //   badge: {
        //     label: 'In Dev',
        //     color: 'default',
        //   },
        // },
        // {
        //   name: 'Monitoring & Planning',
        //   href: PATH_DASHBOARD.scm.monitoring,
        //   icon: 'material-symbols:monitor-heart-rounded',
        //   disabled: true,
        //   badge: {
        //     label: 'In Dev',
        //     color: 'default',
        //   },
        // },
        // {
        //   name: 'Warehousing',
        //   href: PATH_DASHBOARD.scm.warehousing,
        //   icon: 'fa6-solid:warehouse',
        //   disabled: true,
        //   badge: {
        //     label: 'In Dev',
        //     color: 'default',
        //   },
        // },
      ],
    },
    {
      name: 'Finance',
      root: PATH_DASHBOARD.fm.root,
      href: PATH_DASHBOARD.fm.dashboard,
      icon: 'fa-solid:money-check-alt',
      subItems: [
        {
          name: 'Monitoring',
          href: PATH_DASHBOARD.fm.dashboard,
          icon: 'solar:graph-bold',
          badge: {
            label: 'Beta',
            color: 'warning',
          },
        },
        {
          name: 'Cash',
          href: PATH_DASHBOARD.fm.cash,
          icon: 'ion:cash',
          disabled: true,
          badge: {
            label: 'In Dev',
            color: 'default',
          },
        },
        {
          name: 'Expenses & Incomes',
          href: PATH_DASHBOARD.fm['expences-incomes'],
          icon: 'fa6-solid:money-bill-transfer',
          disabled: true,
          badge: {
            label: 'In Dev',
            color: 'default',
          },
        },
        {
          name: 'Funding',
          href: PATH_DASHBOARD.fm.funding,
          icon: 'icon-park-outline:funds',
          disabled: true,
          badge: {
            label: 'In Dev',
            color: 'default',
          },
        },
        {
          name: 'Asset',
          href: PATH_DASHBOARD.fm.assets,
          icon: 'material-symbols:real-estate-agent-rounded',
          disabled: true,
          badge: {
            label: 'In Dev',
            color: 'default',
          },
        },
        {
          name: 'Risk',
          href: PATH_DASHBOARD.fm.risk,
          icon: 'jam:triangle-danger-f',
          disabled: true,
          badge: {
            label: 'In Dev',
            color: 'default',
          },
        },
        {
          name: 'Tax',
          href: PATH_DASHBOARD.fm.tax,
          icon: 'majesticons:money-hand',
          disabled: true,
          badge: {
            label: 'In Dev',
            color: 'default',
          },
        },
      ],
    },
    {
      name: 'Workflow',
      root: PATH_DASHBOARD.workflow.root,
      href: PATH_DASHBOARD.workflow.root,
      icon: 'ph:tree-structure-fill',
    },
    {
      name: 'Human Resource',
      root: PATH_DASHBOARD.hrm.root,
      href: PATH_DASHBOARD.hrm.dashboard,
      icon: 'mdi:account-group',
      disabled: true,
      badge: {
        label: 'In Dev',
      },
      subItems: [
        {
          name: 'Monitoring',
          href: PATH_DASHBOARD.hrm.dashboard,
          icon: 'solar:graph-bold',
          disabled: true,
          badge: {
            label: 'Beta',
            color: 'warning',
          },
        },
        {
          name: 'Accounts',
          href: PATH_DASHBOARD.hrm.accounts,
          icon: 'material-symbols:manage-accounts',
          badge: {
            label: 'In Dev',
            color: 'default',
          },
        },
        {
          name: 'Recruitment',
          href: PATH_DASHBOARD.hrm.recruitment,
          icon: 'fa6-solid:users-gear',
          disabled: true,
          badge: {
            label: 'In Dev',
            color: 'default',
          },
        },
        {
          name: 'Payroll',
          href: PATH_DASHBOARD.hrm.payroll,
          icon: 'material-symbols:payments-outline-rounded',
          disabled: true,
          badge: {
            label: 'In Dev',
            color: 'default',
          },
        },
      ],
    },
    {
      name: 'Projects',
      root: PATH_DASHBOARD.pm.root,
      href: PATH_DASHBOARD.pm.dashboard,
      icon: 'bi:kanban-fill',
      disabled: true,
      badge: {
        label: 'In Dev',
        color: 'default',
      },
      subItems: [
        {
          name: 'Monitoring',
          href: PATH_DASHBOARD.pm.dashboard,
          icon: 'solar:graph-bold',
          disabled: true,
          badge: {
            label: 'Beta',
            color: 'warning',
          },
        },
        {
          name: 'Project Planning',
          href: PATH_DASHBOARD.pm.planning,
          icon: 'icon-park-solid:schedule',
          disabled: true,
          badge: {
            label: 'In Dev',
            color: 'default',
          },
        },
        {
          name: 'Tracking',
          href: PATH_DASHBOARD.pm.tracking,
          icon: 'material-symbols:timer-rounded',
          disabled: true,
          badge: {
            label: 'In Dev',
            color: 'default',
          },
        },
        {
          name: 'Product Building Pipelines',
          href: PATH_DASHBOARD.pm.pipelines,
          icon: 'material-symbols:account-tree-rounded',
          disabled: true,
          badge: {
            label: 'In Dev',
            color: 'default',
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
