// API
export const PIVOTPOINT_API = {
  baseUrl: process.env.NEXT_PUBLIC_PIVOTPOINT_API_BASE_URL,
  statsUrl: process.env.NEXT_PUBLIC_PIVOTPOINT_API_STATS_URL,
  profilePicUrl: process.env.NEXT_PUBLIC_PIVOTPOINT_PROFILE_PIC_URL,
  crmPicUrl: process.env.NEXT_PUBLIC_PIVOTPOINT_CRM_PIC_URL,
  scmPicUrl: process.env.NEXT_PUBLIC_PIVOTPOINT_SCM_PIC_URL,
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
  VERTICAL_NAVBAR_WIDTH: 280,
  SECONDARY_NAVBAR_WIDTH: 280,
  MAIN_NAVBAR_WIDTH_MOBILE: 300,
  SECONDARY_NAVBAR_COLLAPSE_WIDTH: 88,
  VERTICAL_NAVBAR_COLLAPSE_WIDTH: 80,
}

export const PREVIEW = {
  PREVIEW_WIDTH: 650,
}

// CONSTANTS

export const LEAD_PRIORITIES = [
  { value: 0, label: "Unassined" },
  { value: 1, label: "Low" },
  { value: 2, label: "Medium" },
  { value: 3, label: "High" },
]

export const DEALTYPES = [
  { value: 0, label: "General" },
  { value: 1, label: "Leads" },
  { value: 2, label: "Contacts" },
]

export const PRODUCTS_TYPES = [
  { value: 1, label: "Product" },
  { value: 2, label: "Service" },
  { value: 3, label: "Raw Materiel" },
]

export const VEHICULES_TYPES = [
  { value: 0, label: "Road" },
  { value: 1, label: "Plane" },
  { value: 2, label: "Train" },
  { value: 3, label: "Boat" },
]

export const VEHICULES_SIZES = [
  { value: 0, label: "Small" },
  { value: 1, label: "Medium" },
  { value: 2, label: "Large" },
  { value: 3, label: "Very Large" },
]

export const LANGS = [
  { value: "en", label: "English" },
  { value: "fr", label: "Français" },
  { value: "ar", label: "العربية" },
]

export const DELIVERY_STATUS = [
  { value: 0, label: "Initiated" },
  { value: 1, label: "In Transit" },
  { value: 2, label: "Arrived At Destination" },
  { value: 3, label: "Delivery Complete" },
]

export const INVOICE_STATUS = [
  { value: 0, label: "Initiated" },
  { value: 1, label: "In Transit" },
  { value: 2, label: "Arrived At Destination" },
  { value: 3, label: "Delivery Complete" },
]

export const BANK_ACCOUNT_TYPES = [
  { value: 0, label: "Bank" },
  { value: 1, label: "Card" },
  { value: 2, label: "Wallet" },
  { value: 3, label: "Cash" },
]

export const BUSINESS_TYPES = [
  { value: 0, label: "Retail" },
  { value: 1, label: "Manufacturing" },
  { value: 2, label: "Technology" },
  { value: 3, label: "Finance" },
  { value: 4, label: "Healthcare" },
  { value: 5, label: "Hospitality" },
  { value: 6, label: "Real Estate" },
  { value: 7, label: "Transportation" },
  { value: 8, label: "Education" },
  { value: 9, label: "Entertainment" },
  { value: 10, label: "Professional Services" },
  { value: 11, label: "Agriculture" },
  { value: 12, label: "Energy" },
  { value: 13, label: "Construction" },
  { value: 14, label: "Nonprofit" },
  { value: 100, label: "Other" },
]
