/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit"
// routes
import { PATH_DASHBOARD } from "routes/paths"
import { getItem, setItem } from "utils/localStorage"

export interface NavItemConfig {
  name: string
  root: string
  href: string
  icon: string
  disabled?: boolean
  roles: string[]
  badge?: {
    label: string
    color?: "primary" | "secondary" | "info" | "warning" | "error" | "success" | "default"
  }
  subItems?: {
    name: string
    href: string
    icon: string
    disabled?: boolean
    badge?: {
      label: string
      color?: "primary" | "secondary" | "info" | "warning" | "error" | "success" | "default"
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
      name: "Customer Relationship",
      root: PATH_DASHBOARD.crm.root,
      href: PATH_DASHBOARD.crm.dashboard,
      icon: "fa6-solid:handshake",
      roles: ["Owner", "CRM"],
      subItems: [
        {
          name: "Monitoring",
          href: PATH_DASHBOARD.crm.dashboard,
          icon: "solar:graph-bold",
          badge: {
            label: "New",
            color: "success",
          },
        },
        {
          name: "Contacts & Leads",
          href: PATH_DASHBOARD.crm["contacts-leads"].root,
          icon: "material-symbols:contact-page",
          badge: {
            label: "New",
            color: "success",
          },
        },
        {
          name: "Sales Pipeline",
          href: PATH_DASHBOARD.crm["sales-pipeline"],
          icon: "icon-park-solid:sales-report",
          badge: {
            label: "New",
            color: "success",
          },
        },
        {
          name: "Customer Segmentation",
          href: PATH_DASHBOARD.crm["customer-segmentation"],
          icon: "fa6-solid:users-viewfinder",
          badge: {
            label: "Beta",
            color: "warning",
          },
        },
      ],
    },
    {
      name: "Supply Chain & Inventory",
      root: PATH_DASHBOARD.scm.root,
      href: PATH_DASHBOARD.scm.dashboard,
      icon: "fa6-solid:truck-ramp-box",
      roles: ["Owner", "SCM"],
      subItems: [
        {
          name: "Monitoring",
          href: PATH_DASHBOARD.scm.dashboard,
          icon: "solar:graph-bold",
          badge: {
            label: "New",
            color: "success",
          },
        },
        {
          name: "Suppliers",
          href: PATH_DASHBOARD.scm.suppliers,
          icon: "fa6-solid:boxes-packing",
          badge: {
            label: "New",
            color: "success",
          },
        },
        {
          name: "Product/Service",
          href: PATH_DASHBOARD.scm["product-service"].list,
          icon: "fa6-solid:boxes-stacked",
          badge: {
            label: "New",
            color: "success",
          },
        },
        {
          name: "Warehousing",
          href: PATH_DASHBOARD.scm.warehousing.list,
          icon: "fa6-solid:warehouse",
          badge: {
            label: "New",
            color: "success",
          },
        },
        {
          name: "Transportation",
          href: PATH_DASHBOARD.scm.transportation.root,
          icon: "fluent:vehicle-truck-profile-20-filled",
          badge: {
            label: "New",
            color: "success",
          },
        },
        {
          name: "Invoices",
          href: PATH_DASHBOARD.scm.invoices.root,
          icon: "basil:invoice-solid",
          badge: {
            label: "New",
            color: "success",
          },
        },
        // {
        //   name: 'Demand Forecasting',
        //   href: PATH_DASHBOARD.scm['demand-forecasting'],
        //   icon: 'material-symbols:batch-prediction',
        //   disabled: true,
        //   badge: {
        //     label: 'Soon',
        //     color: 'default',
        //   },
        // },
        // {
        //   name: 'Invoice',
        //   href: PATH_DASHBOARD.scm.invoice,
        //   icon: 'fa6-solid:file-invoice',
        //   disabled: true,
        //   badge: {
        //     label: 'Soon',
        //     color: 'default',
        //   },
        // },
        // {
        //   name: 'Monitoring & Planning',
        //   href: PATH_DASHBOARD.scm.monitoring,
        //   icon: 'material-symbols:monitor-heart-rounded',
        //   disabled: true,
        //   badge: {
        //     label: 'Soon',
        //     color: 'default',
        //   },
        // },
      ],
    },
    {
      name: "Finance",
      root: PATH_DASHBOARD.fm.root,
      href: PATH_DASHBOARD.fm.dashboard,
      icon: "fa-solid:money-check-alt",
      roles: ["Owner", "FM"],
      subItems: [
        {
          name: "Monitoring",
          href: PATH_DASHBOARD.fm.dashboard,
          icon: "solar:graph-bold",
          badge: {
            label: "Beta",
            color: "warning",
          },
        },
        {
          name: "Bank Accounts",
          href: PATH_DASHBOARD.fm["bank-accounts"],
          icon: "mingcute:bank-card-fill",
          badge: {
            label: "Beta",
            color: "warning",
          },
        },
        // {
        //   name: 'Business Plan',
        //   href: PATH_DASHBOARD.fm['business-plan'],
        //   icon: 'ion:cash',
        //   badge: {
        //     label: 'Soon',
        //     color: 'default',
        //   },
        // },
        // {
        //   name: 'Cash',
        //   href: PATH_DASHBOARD.fm.cash,
        //   icon: 'ion:cash',
        //   disabled: true,
        //   badge: {
        //     label: 'Soon',
        //     color: 'default',
        //   },
        // },
        // {
        //   name: 'Expenses & Incomes',
        //   href: PATH_DASHBOARD.fm['expences-incomes'],
        //   icon: 'fa6-solid:money-bill-transfer',
        //   disabled: true,
        //   badge: {
        //     label: 'Soon',
        //     color: 'default',
        //   },
        // },
        // {
        //   name: 'Funding',
        //   href: PATH_DASHBOARD.fm.funding,
        //   icon: 'icon-park-outline:funds',
        //   disabled: true,
        //   badge: {
        //     label: 'Soon',
        //     color: 'default',
        //   },
        // },
        // {
        //   name: 'Asset',
        //   href: PATH_DASHBOARD.fm.assets,
        //   icon: 'material-symbols:real-estate-agent-rounded',
        //   disabled: true,
        //   badge: {
        //     label: 'Soon',
        //     color: 'default',
        //   },
        // },
        // {
        //   name: 'Risk',
        //   href: PATH_DASHBOARD.fm.risk,
        //   icon: 'jam:triangle-danger-f',
        //   disabled: true,
        //   badge: {
        //     label: 'Soon',
        //     color: 'default',
        //   },
        // },
        // {
        //   name: 'Tax',
        //   href: PATH_DASHBOARD.fm.tax,
        //   icon: 'majesticons:money-hand',
        //   disabled: true,
        //   badge: {
        //     label: 'Soon',
        //     color: 'default',
        //   },
        // },
      ],
    },
    {
      name: "Human Resource",
      root: PATH_DASHBOARD.hrm.root,
      href: PATH_DASHBOARD.hrm.dashboard,
      icon: "mdi:account-group",
      disabled: true,
      roles: ["Owner", "HRM"],
      badge: {
        label: "Soon",
      },
      subItems: [
        {
          name: "Monitoring",
          href: PATH_DASHBOARD.hrm.dashboard,
          icon: "solar:graph-bold",
          disabled: true,
          badge: {
            label: "Soon",
            color: "default",
          },
        },
        {
          name: "Accounts",
          href: PATH_DASHBOARD.hrm.accounts,
          icon: "material-symbols:manage-accounts",
          disabled: true,
          badge: {
            label: "Soon",
            color: "default",
          },
        },
        {
          name: "Recruitment",
          href: PATH_DASHBOARD.hrm.recruitment,
          icon: "fa6-solid:users-gear",
          disabled: true,
          badge: {
            label: "Soon",
            color: "default",
          },
        },
        {
          name: "Payroll",
          href: PATH_DASHBOARD.hrm.payroll,
          icon: "material-symbols:payments-outline-rounded",
          disabled: true,
          badge: {
            label: "Soon",
            color: "default",
          },
        },
      ],
    },
    {
      name: "Projects",
      root: PATH_DASHBOARD.pm.root,
      href: PATH_DASHBOARD.pm.dashboard,
      icon: "bi:kanban-fill",
      disabled: true,
      roles: ["Owner", "PM"],
      badge: {
        label: "Soon",
        color: "default",
      },
      subItems: [
        {
          name: "Monitoring",
          href: PATH_DASHBOARD.pm.dashboard,
          icon: "solar:graph-bold",
          disabled: true,
          badge: {
            label: "Soon",
            color: "default",
          },
        },
        {
          name: "Project Planning",
          href: PATH_DASHBOARD.pm.planning,
          icon: "icon-park-solid:schedule",
          disabled: true,
          badge: {
            label: "Soon",
            color: "default",
          },
        },
        {
          name: "Tracking",
          href: PATH_DASHBOARD.pm.tracking,
          icon: "material-symbols:timer-rounded",
          disabled: true,
          badge: {
            label: "Soon",
            color: "default",
          },
        },
        {
          name: "Product Building Pipelines",
          href: PATH_DASHBOARD.pm.pipelines,
          icon: "material-symbols:account-tree-rounded",
          disabled: true,
          badge: {
            label: "Soon",
            color: "default",
          },
        },
      ],
    },
    {
      name: "Workflow",
      root: PATH_DASHBOARD.workflow.root,
      href: PATH_DASHBOARD.workflow.root,
      icon: "ph:tree-structure-fill",
      disabled: true,
      roles: ["Owner", "WF"],
      badge: {
        label: "Soon",
        color: "default",
      },
    },
  ],
  isOpen: false,
  isCollapsed: getItem("isCollapsed") as boolean,
}

const sideBarSlice = createSlice({
  name: "sideBar",
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true
    },
    close: (state) => {
      state.isOpen = false
    },
    collapse: (state) => {
      setItem("isCollapsed", true)
      state.isCollapsed = true
    },
    extend: (state) => {
      setItem("isCollapsed", false)
      state.isCollapsed = false
    },
  },
})

export const { close, open, collapse, extend } = sideBarSlice.actions

export default sideBarSlice
