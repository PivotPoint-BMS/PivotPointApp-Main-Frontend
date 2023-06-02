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
} from './slices'
// apis
import { authApi, companyApi, paymentApi } from './api/auth'
import { settingsApi } from './api/settings/settingsAPIs'
import { leadApi, leadSourceApi, dealsBoardsApi, addressApi } from './api/crm'
import { statsApi } from './api/stats/statsApi'
import { financeSetupApi } from './api/fm/financeSetupApi'
import { financeDashboardApi } from './api/fm/fmDashboardApi'
import { supplierApi } from './api/scm/products-service/suppliersApis'
import supplierPreviewSlice from './slices/supplierPreviewSlice'
import { productsApi } from './api/scm/products-service/productsApi'

export const makeStore = () =>
  configureStore({
    reducer: {
      [sessionSlice.name]: sessionSlice.reducer,
      [sideBarSlice.name]: sideBarSlice.reducer,
      [snackbarSlice.name]: snackbarSlice.reducer,
      [pagginationSlice.name]: pagginationSlice.reducer,
      [statsApi.reducerPath]: statsApi.reducer,
      // Auth
      [authApi.reducerPath]: authApi.reducer,
      [companyApi.reducerPath]: companyApi.reducer,
      [paymentApi.reducerPath]: paymentApi.reducer,
      [settingsApi.reducerPath]: settingsApi.reducer,
      // CRM
      [leadApi.reducerPath]: leadApi.reducer,
      [leadSourceApi.reducerPath]: leadSourceApi.reducer,
      [leadPreviewSlice.name]: leadPreviewSlice.reducer,
      [addressApi.reducerPath]: addressApi.reducer,
      [dealsBoardsApi.reducerPath]: dealsBoardsApi.reducer,
      [dealPreviewSlice.name]: dealPreviewSlice.reducer,
      // FM
      [financeSetupApi.reducerPath]: financeSetupApi.reducer,
      [financeDashboardApi.reducerPath]: financeDashboardApi.reducer,
      // SCM
      [supplierApi.reducerPath]: supplierApi.reducer,
      [productsApi.reducerPath]: productsApi.reducer,
      [supplierPreviewSlice.name]: supplierPreviewSlice.reducer,
    },
    devTools: process.env.NODE_ENV === 'development',
    middleware: (gDM) =>
      gDM({
        serializableCheck: true,
        immutableCheck: true,
      }).concat(
        authApi.middleware,
        companyApi.middleware,
        paymentApi.middleware,
        settingsApi.middleware,
        leadApi.middleware,
        leadSourceApi.middleware,
        addressApi.middleware,
        dealsBoardsApi.middleware,
        statsApi.middleware,
        financeSetupApi.middleware,
        financeDashboardApi.middleware,
        supplierApi.middleware,
        productsApi.middleware
      ),
  })

setupListeners(makeStore().dispatch)
type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true })
