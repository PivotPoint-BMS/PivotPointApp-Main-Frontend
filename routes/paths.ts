// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`
}

const ROOTS_AUTH = '/auth'
const ROOTS_DASHBOARD = '/dashboard'
const ROOTS_USER = '/dashboard/user'

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
  root: ROOTS_DASHBOARD,
  general: {
    root: path(ROOTS_DASHBOARD, '/'),
  },
  crm: {
    root: path(ROOTS_DASHBOARD, '/crm'),
    contact: path(ROOTS_DASHBOARD, '/crm/contact'),
    'customer-service': path(ROOTS_DASHBOARD, '/crm/customer-service'),
    workflow: path(ROOTS_DASHBOARD, '/crm/workflow'),
  },
  fm: {
    root: path(ROOTS_DASHBOARD, '/fm'),
    assets: path(ROOTS_DASHBOARD, '/fm/assets'),
    cash: path(ROOTS_DASHBOARD, '/fm/cash'),
    funding: path(ROOTS_DASHBOARD, '/fm/funding'),
    invoice: path(ROOTS_DASHBOARD, '/fm/invoice'),
    'expences-incomes': path(ROOTS_DASHBOARD, '/fm/expences-incomes'),
    risk: path(ROOTS_DASHBOARD, '/fm/risk'),
    tax: path(ROOTS_DASHBOARD, '/fm/tax'),
  },
  hrm: {
    root: path(ROOTS_DASHBOARD, '/hrm'),
    payroll: path(ROOTS_DASHBOARD, '/hrm/payroll'),
    performance: path(ROOTS_DASHBOARD, '/hrm/performance'),
    recruitment: path(ROOTS_DASHBOARD, '/hrm/recruitment'),
    invoice: path(ROOTS_DASHBOARD, '/hrm/invoice'),
    benefits: path(ROOTS_DASHBOARD, '/hrm/benefits'),
  },
  im: {
    root: path(ROOTS_DASHBOARD, '/im'),
    'product-service': path(ROOTS_DASHBOARD, '/im/product-service'),
  },
  pm: {
    root: path(ROOTS_DASHBOARD, '/pm'),
    pipelines: path(ROOTS_DASHBOARD, '/pm/pipelines'),
    planning: path(ROOTS_DASHBOARD, '/pm/planning'),
    tracking: path(ROOTS_DASHBOARD, '/pm/tracking'),
  },
  scm: {
    root: path(ROOTS_DASHBOARD, '/scm'),
    monitoring: path(ROOTS_DASHBOARD, '/scm/monitoring'),
    transportation: path(ROOTS_DASHBOARD, '/scm/transportation'),
    warehousing: path(ROOTS_DASHBOARD, '/scm/warehousing'),
    'demand-forecasting': path(ROOTS_DASHBOARD, '/scm/demand-forecasting'),
  },
}
