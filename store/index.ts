import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { createWrapper } from "next-redux-wrapper"
// slices
import {
  dealPreviewSlice,
  leadPreviewSlice,
  paginationSlice,
  sessionSlice,
  sideBarSlice,
  snackbarSlice,
  vehiculePreviewSlice,
  supplierPreviewSlice,
  sectionPreviewSlice,
  settingsSlice,
} from "./slices"
// apis
import { authApi, companyApi, paymentApi } from "./api/auth"
import { settingsApi } from "./api/settings/settingsAPIs"
import {
  leadApi,
  leadSourceApi,
  dealsBoardsApi,
  addressApi,
  customerSegmentationApi,
} from "./api/crm"
import { statsApi } from "./api/stats/statsApi"
import { financeSetupApi } from "./api/fm/financeSetupApi"
import { financeDashboardApi } from "./api/fm/fmDashboardApi"
import { supplierApi } from "./api/scm/products-service/suppliersApis"
import { productsApi } from "./api/scm/products-service/productsApi"
import { vehiculesApi } from "./api/scm/transportation/vehiculesApis"
import { warehousingApi } from "./api/scm/warehousing/warehousingApis"
import { warehouseSectionApi } from "./api/scm/warehousing/warehouseSectionApis"
import { deliveriesApi } from "./api/scm/transportation/deliveriesApis"
import { fmBusinessPlanApi } from "./api/fm/fmBusinessPlanApis"
import { feedbackApi } from "./api/feedback/feedbackAPIs"
import { reviewsApi } from "./api/external-api/reviewsAPIs"
import { invoicesApi } from "./api/scm/invoices/invoicesApis"
import { bankAccountsApi } from "./api/fm/bankAccountsApis"

export const makeStore = () =>
  configureStore({
    reducer: {
      [statsApi.reducerPath]: statsApi.reducer,
      [sessionSlice.name]: sessionSlice.reducer,
      [settingsSlice.name]: settingsSlice.reducer,
      [sideBarSlice.name]: sideBarSlice.reducer,
      [snackbarSlice.name]: snackbarSlice.reducer,
      [paginationSlice.name]: paginationSlice.reducer,
      // Auth
      [authApi.reducerPath]: authApi.reducer,
      [companyApi.reducerPath]: companyApi.reducer,
      [paymentApi.reducerPath]: paymentApi.reducer,
      [settingsApi.reducerPath]: settingsApi.reducer,
      // CRM
      [leadApi.reducerPath]: leadApi.reducer,
      [addressApi.reducerPath]: addressApi.reducer,
      [leadPreviewSlice.name]: leadPreviewSlice.reducer,
      [dealPreviewSlice.name]: dealPreviewSlice.reducer,
      [leadSourceApi.reducerPath]: leadSourceApi.reducer,
      [dealsBoardsApi.reducerPath]: dealsBoardsApi.reducer,
      [customerSegmentationApi.reducerPath]: customerSegmentationApi.reducer,
      // FM
      [financeSetupApi.reducerPath]: financeSetupApi.reducer,
      [bankAccountsApi.reducerPath]: bankAccountsApi.reducer,
      [fmBusinessPlanApi.reducerPath]: fmBusinessPlanApi.reducer,
      [financeDashboardApi.reducerPath]: financeDashboardApi.reducer,
      // SCM
      [reviewsApi.reducerPath]: reviewsApi.reducer,
      [invoicesApi.reducerPath]: invoicesApi.reducer,
      [feedbackApi.reducerPath]: feedbackApi.reducer,
      [supplierApi.reducerPath]: supplierApi.reducer,
      [productsApi.reducerPath]: productsApi.reducer,
      [vehiculesApi.reducerPath]: vehiculesApi.reducer,
      [deliveriesApi.reducerPath]: deliveriesApi.reducer,
      [warehousingApi.reducerPath]: warehousingApi.reducer,
      [sectionPreviewSlice.name]: sectionPreviewSlice.reducer,
      [supplierPreviewSlice.name]: supplierPreviewSlice.reducer,
      [vehiculePreviewSlice.name]: vehiculePreviewSlice.reducer,
      [warehouseSectionApi.reducerPath]: warehouseSectionApi.reducer,
    },
    devTools: process.env.NODE_ENV === "development",
    middleware: (gDM) =>
      gDM({
        serializableCheck: true,
        immutableCheck: true,
      }).concat(
        authApi.middleware,
        leadApi.middleware,
        statsApi.middleware,
        reviewsApi.middleware,
        addressApi.middleware,
        companyApi.middleware,
        paymentApi.middleware,
        feedbackApi.middleware,
        settingsApi.middleware,
        supplierApi.middleware,
        productsApi.middleware,
        invoicesApi.middleware,
        vehiculesApi.middleware,
        leadSourceApi.middleware,
        deliveriesApi.middleware,
        warehousingApi.middleware,
        dealsBoardsApi.middleware,
        financeSetupApi.middleware,
        bankAccountsApi.middleware,
        fmBusinessPlanApi.middleware,
        financeDashboardApi.middleware,
        warehouseSectionApi.middleware,
        customerSegmentationApi.middleware
      ),
  })

setupListeners(makeStore().dispatch)
type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore["dispatch"]
export type RootState = ReturnType<AppStore["getState"]>
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true })
