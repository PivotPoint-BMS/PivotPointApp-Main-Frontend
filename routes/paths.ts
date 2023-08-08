// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`
}

const ROOTS_AUTH = "/auth"
const ROOTS_APP = "/app"
const ROOTS_USER = "/app/user"

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
  verify: path(ROOTS_AUTH, "/verify"),
  resetPassword: path(ROOTS_AUTH, "/reset-password"),
  companySetup: path(ROOTS_AUTH, "/company-setup"),
  payment: path(ROOTS_AUTH, "/payment"),
}

export const PATH_PAGE = {
  comingSoon: "/coming-soon",
  maintenance: "/maintenance",
  page404: "/404",
  page500: "/500",
  termOfService: "https://www.pivotpointbms.com/legal/terms-of-service",
  privacyPolicy: "https://www.pivotpointbms.com/legal/privacy-policy",
  apiDocs: "https://www.pivotpointbms.com/api/docs",
}

export const PATH_ACCOUNT = {
  profile: path(ROOTS_USER, "/profile"),
  company: path(ROOTS_USER, "/company"),
}

export const PATH_DASHBOARD = {
  root: ROOTS_APP,
  general: {
    root: path(ROOTS_APP, "/"),
  },
  crm: {
    root: path(ROOTS_APP, "/crm"),
    dashboard: path(ROOTS_APP, "/crm/dashboard"),
    "contacts-leads": {
      root: path(ROOTS_APP, "/crm/contacts-leads"),
      create: path(ROOTS_APP, "/crm/contacts-leads/create"),
      edit: (id?: string) => `${path(ROOTS_APP, "/crm/contacts-leads/lead/edit/")}/${id}`,
      lead: (id?: string) => `${path(ROOTS_APP, "/crm/contacts-leads/lead")}/${id}`,
      contact: (id?: string) => `${path(ROOTS_APP, "/crm/contacts-leads/contact")}/${id}`,
      "lead-source": {
        root: path(ROOTS_APP, "/crm/contacts-leads/lead-source"),
        create: path(ROOTS_APP, "/crm/contacts-leads/lead-source/create"),
      },
    },
    "sales-pipeline": path(ROOTS_APP, "/crm/sales-pipeline"),
    "customer-segmentation": path(ROOTS_APP, "/crm/customer-segmentation"),
    "customer-service": path(ROOTS_APP, "/crm/customer-service"),
    "sentiment-analysis": path(ROOTS_APP, "/crm/sentiment-analysis"),
    workflow: path(ROOTS_APP, "/crm/workflow"),
  },
  fm: {
    root: path(ROOTS_APP, "/fm"),
    dashboard: path(ROOTS_APP, "/fm/dashboard"),
    "bank-accounts": path(ROOTS_APP, "/fm/bank-accounts"),
    "business-plan": path(ROOTS_APP, "/fm/business-plan"),
    assets: path(ROOTS_APP, "/fm/assets"),
    cash: path(ROOTS_APP, "/fm/cash"),
    funding: path(ROOTS_APP, "/fm/funding"),
    "expences-incomes": path(ROOTS_APP, "/fm/expences-incomes"),
    risk: path(ROOTS_APP, "/fm/risk"),
    tax: path(ROOTS_APP, "/fm/tax"),
  },
  hrm: {
    root: path(ROOTS_APP, "/hrm"),
    dashboard: path(ROOTS_APP, "/hrm/dashboard"),
    payroll: path(ROOTS_APP, "/hrm/payroll"),
    accounts: path(ROOTS_APP, "/hrm/accounts"),
    performance: path(ROOTS_APP, "/hrm/performance"),
    recruitment: path(ROOTS_APP, "/hrm/recruitment"),
    invoice: path(ROOTS_APP, "/hrm/invoice"),
    benefits: path(ROOTS_APP, "/hrm/benefits"),
  },
  pm: {
    root: path(ROOTS_APP, "/pm"),
    dashboard: path(ROOTS_APP, "/pm/dashboard"),
    pipelines: path(ROOTS_APP, "/pm/pipelines"),
    planning: path(ROOTS_APP, "/pm/planning"),
    tracking: path(ROOTS_APP, "/pm/tracking"),
  },
  scm: {
    root: path(ROOTS_APP, "/scm"),
    dashboard: path(ROOTS_APP, "/scm/dashboard"),
    monitoring: path(ROOTS_APP, "/scm/monitoring"),
    "product-service": {
      list: path(ROOTS_APP, "/scm/product-service"),
      product: (id: string) => path(ROOTS_APP, `/scm/product-service/product/${id}`),
      products: {
        create: path(ROOTS_APP, "/scm/product-service/product/create"),
      },
    },
    supplier: (id: string) => path(ROOTS_APP, `/scm/supplier/${id}`),
    suppliers: path(ROOTS_APP, "/scm/suppliers"),
    transportation: {
      root: path(ROOTS_APP, "/scm/transportation"),
      deliveries: {
        create: {
          w2w: path(ROOTS_APP, "/scm/transportation/deliveries/create/w2w"),
          w2c: path(ROOTS_APP, "/scm/transportation/deliveries/create/w2c"),
          s2w: path(ROOTS_APP, "/scm/transportation/deliveries/create/s2w"),
        },
        delivery: (id: string) => path(ROOTS_APP, `/scm/transportation/deliveries/${id}`),
      },
    },
    warehousing: {
      list: path(ROOTS_APP, "/scm/warehousing"),
      warehouse: (id: string) => path(ROOTS_APP, `/scm/warehousing/warehouse/${id}`),
    },
    "demand-forecasting": path(ROOTS_APP, "/scm/demand-forecasting"),
    invoices: {
      root: path(ROOTS_APP, "/scm/invoices"),
      create: path(ROOTS_APP, "/scm/invoices/create"),
      invoice: (id: string) => path(ROOTS_APP, `/scm/invoices/${id}`),
      edit: (id: string) => path(ROOTS_APP, `/scm/invoices/edit/${id}`),
    },
  },
  workflow: {
    root: path(ROOTS_APP, "/workflow"),
  },
}
