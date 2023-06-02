// API
export const PIVOTPOINT_API = {
  baseUrl: process.env.NEXT_PUBLIC_PIVOTPOINT_API_BASE_URL,
  statsUrl: process.env.NEXT_PUBLIC_PIVOTPOINT_API_STATS_URL,
  profilePicUrl: process.env.NEXT_PUBLIC_PIVOTPOINT_PROFILE_PIC_URL,
  crmPicUrl: process.env.NEXT_PUBLIC_PIVOTPOINT_CRM_PIC_URL,
}

export const PIVOTPOINT_SOCIALS = {
  supportEmail: process.env.NEXT_PUBLIC_PIVOTPOINT_SUPPORT_MAIL,
}

export const HEADER = {
  MOBILE_HEIGHT: 64,
  MAIN_DESKTOP_HEIGHT: 88,
  DESKTOP_HEIGHT: 80,
  DESKTOP_OFFSET_HEIGHT: 92 - 32,
}

export const NAVBAR = {
  MAIN_NAVBAR_WIDTH: 88,
  SECONDARY_NAVBAR_WIDTH: 280,
  MAIN_NAVBAR_WIDTH_MOBILE: 300,
  SECONDARY_NAVBAR_COLLAPSE_WIDTH: 88,
}

export const PREVIEW = {
  PREVIEW_WIDTH: 650,
}

// CONSTANTS

export const LEAD_PRIORITIES = [
  { value: 0, label: 'Unassined' },
  { value: 1, label: 'Low' },
  { value: 2, label: 'Medium' },
  { value: 3, label: 'High' },
]

export const DEALTYPES = [
  { value: 0, label: 'General' },
  { value: 1, label: 'Leads' },
  { value: 2, label: 'Contacts' },
]

export const PRODUCTS_TYPES = [
  { value: 1, label: 'Product' },
  { value: 2, label: 'Service' },
]
