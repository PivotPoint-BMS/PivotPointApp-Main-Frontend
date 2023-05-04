import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { createWrapper } from 'next-redux-wrapper'
// slices
import { leadPreviewSlice, sessionSlice, sideBarSlice, snackbarSlice } from './slices'
// apis
import { authApi, companyApi, paymentApi } from './api/auth'
import { settingsApi } from './api/settings/settingsAPIs'
import { leadApi, leadSourceApi } from './api/crm'

export const makeStore = () =>
  configureStore({
    reducer: {
      [sessionSlice.name]: sessionSlice.reducer,
      [sideBarSlice.name]: sideBarSlice.reducer,
      [snackbarSlice.name]: snackbarSlice.reducer,
      [leadPreviewSlice.name]: leadPreviewSlice.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [companyApi.reducerPath]: companyApi.reducer,
      [paymentApi.reducerPath]: paymentApi.reducer,
      [settingsApi.reducerPath]: settingsApi.reducer,
      [leadApi.reducerPath]: leadApi.reducer,
      [leadSourceApi.reducerPath]: leadSourceApi.reducer,
    },
    devTools: process.env.NODE_ENV === 'development',
    middleware: (gDM) =>
      gDM().concat(
        authApi.middleware,
        companyApi.middleware,
        paymentApi.middleware,
        settingsApi.middleware,
        leadApi.middleware,
        leadSourceApi.middleware
      ),
  })

setupListeners(makeStore().dispatch)
type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true })
