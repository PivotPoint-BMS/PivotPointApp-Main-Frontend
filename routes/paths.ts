// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`
}

const ROOTS_AUTH = '/auth'
const ROOTS_APP = '/app'
const ROOTS_USER = '/app/user'

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  companySetup: path(ROOTS_AUTH, '/company-setup'),
  payment: path(ROOTS_AUTH, '/payment'),
}

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  page404: '/404',
  page500: '/500',
  termOfService: 'https://www.pivotpointbms.com/legal/terms-of-service',
  privacyPolicy: 'https://www.pivotpointbms.com/legal/privacy-policy',
  apiDocs: 'https://www.pivotpointbms.com/api/docs',
}

export const PATH_ACCOUNT = {
  profile: path(ROOTS_USER, '/profile'),
  settings: path(ROOTS_USER, '/settings'),
}

export const PATH_DASHBOARD = {
  root: ROOTS_APP,
  general: {
    root: path(ROOTS_APP, '/'),
  },
  crm: {
    root: path(ROOTS_APP, '/crm'),
    dashboard: path(ROOTS_APP, '/crm/dashboard'),
    'contacts-leads': {
      root: path(ROOTS_APP, '/crm/contacts-leads'),
      create: path(ROOTS_APP, '/crm/contacts-leads/create'),
      edit: (id?: string) => `${path(ROOTS_APP, '/crm/contacts-leads/lead/edit/')}/${id}`,
      lead: (id?: string) => `${path(ROOTS_APP, '/crm/contacts-leads/lead')}/${id}`,
      contact: (id?: string) => `${path(ROOTS_APP, '/crm/contacts-leads/contact')}/${id}`,
      'lead-source': {
        root: path(ROOTS_APP, '/crm/contacts-leads/lead-source'),
        create: path(ROOTS_APP, '/crm/contacts-leads/lead-source/create'),
      },
    },
    accounts: path(ROOTS_APP, '/crm/accounts'),
    'sales-pipeline': path(ROOTS_APP, '/crm/sales-pipeline'),
    'customer-service': path(ROOTS_APP, '/crm/customer-service'),
    workflow: path(ROOTS_APP, '/crm/workflow'),
  },
  fm: {
    root: path(ROOTS_APP, '/fm'),
    dashboard: path(ROOTS_APP, '/fm/dashboard'),
    assets: path(ROOTS_APP, '/fm/assets'),
    cash: path(ROOTS_APP, '/fm/cash'),
    funding: path(ROOTS_APP, '/fm/funding'),
    invoice: path(ROOTS_APP, '/fm/invoice'),
    'expences-incomes': path(ROOTS_APP, '/fm/expences-incomes'),
    risk: path(ROOTS_APP, '/fm/risk'),
    tax: path(ROOTS_APP, '/fm/tax'),
  },
  hrm: {
    root: path(ROOTS_APP, '/hrm'),
    dashboard: path(ROOTS_APP, '/hrm/dashboard'),
    payroll: path(ROOTS_APP, '/hrm/payroll'),
    performance: path(ROOTS_APP, '/hrm/performance'),
    recruitment: path(ROOTS_APP, '/hrm/recruitment'),
    invoice: path(ROOTS_APP, '/hrm/invoice'),
    benefits: path(ROOTS_APP, '/hrm/benefits'),
  },
  im: {
    root: path(ROOTS_APP, '/im'),
    dashboard: path(ROOTS_APP, '/im/dashboard'),
    'product-service': path(ROOTS_APP, '/im/product-service'),
  },
  pm: {
    root: path(ROOTS_APP, '/pm'),
    dashboard: path(ROOTS_APP, '/pm/dashboard'),
    pipelines: path(ROOTS_APP, '/pm/pipelines'),
    planning: path(ROOTS_APP, '/pm/planning'),
    tracking: path(ROOTS_APP, '/pm/tracking'),
  },
  scm: {
    root: path(ROOTS_APP, '/scm'),
    dashboard: path(ROOTS_APP, '/scm/dashboard'),
    monitoring: path(ROOTS_APP, '/scm/monitoring'),
    transportation: path(ROOTS_APP, '/scm/transportation'),
    warehousing: path(ROOTS_APP, '/scm/warehousing'),
    'demand-forecasting': path(ROOTS_APP, '/scm/demand-forecasting'),
  },
}
