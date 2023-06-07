import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { createWrapper } from 'next-redux-wrapper'
// slices
import {
  dealPreviewSlice,
  leadPreviewSlice,
  pagginationSlice,
  sessionSlice,
  sideBarSlice,
  snackbarSlice,
  vehiculePreviewSlice,
  supplierPreviewSlice,
} from './slices'
// apis
import { authApi, companyApi, paymentApi } from './api/auth'
import { settingsApi } from './api/settings/settingsAPIs'
import {
  leadApi,
  leadSourceApi,
  dealsBoardsApi,
  addressApi,
  customerSegmentationApi,
} from './api/crm'
import { statsApi } from './api/stats/statsApi'
import { financeSetupApi } from './api/fm/financeSetupApi'
import { financeDashboardApi } from './api/fm/fmDashboardApi'
import { supplierApi } from './api/scm/products-service/suppliersApis'
import { productsApi } from './api/scm/products-service/productsApi'
import { vehiculesApi } from './api/scm/transportation/vehiculesApis'

export const makeStore = () =>
  configureStore({
    reducer: {
      [statsApi.reducerPath]: statsApi.reducer,
      [sessionSlice.name]: sessionSlice.reducer,
      [sideBarSlice.name]: sideBarSlice.reducer,
      [snackbarSlice.name]: snackbarSlice.reducer,
      [pagginationSlice.name]: pagginationSlice.reducer,
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
      [financeDashboardApi.reducerPath]: financeDashboardApi.reducer,
      // SCM
      [supplierApi.reducerPath]: supplierApi.reducer,
      [productsApi.reducerPath]: productsApi.reducer,
      [vehiculesApi.reducerPath]: vehiculesApi.reducer,
      [supplierPreviewSlice.name]: supplierPreviewSlice.reducer,
      [vehiculePreviewSlice.name]: vehiculePreviewSlice.reducer,
    },
    devTools: process.env.NODE_ENV === 'development',
    middleware: (gDM) =>
      gDM({
        serializableCheck: true,
        immutableCheck: true,
      }).concat(
        authApi.middleware,
        leadApi.middleware,
        statsApi.middleware,
        addressApi.middleware,
        companyApi.middleware,
        paymentApi.middleware,
        settingsApi.middleware,
        supplierApi.middleware,
        productsApi.middleware,
        vehiculesApi.middleware,
        leadSourceApi.middleware,
        dealsBoardsApi.middleware,
        financeSetupApi.middleware,
        financeDashboardApi.middleware,
        customerSegmentationApi.middleware
      ),
  })

setupListeners(makeStore().dispatch)
type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']
export type RootState = ReturnType<AppStore['getState']>
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true })
