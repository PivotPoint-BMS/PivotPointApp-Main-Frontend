import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { createWrapper } from 'next-redux-wrapper'
// slices
import sideBarSlice from './slices/sideBarSlice'
import sessionSlice from './slices/sessionSlice'
import leadPreviewSlice from './slices/leadPreviewSlice'
import contactPreviewSlice from './slices/contactPreviewSlice'
import snackbarSlice from './slices/snackbarSlice'
// apis
import { authApi } from './api/authApi'
import { humanResourceApi } from './api/humanResourceApi'
import { companyApi } from './api/companyApi'
import { paymentApi } from './api/paymentApi'
import { crmApi } from './api/crm/crmApis'
import { settingsApi } from './api/settings/settingsAPIs'

export const makeStore = () =>
  configureStore({
    reducer: {
      [sessionSlice.name]: sessionSlice.reducer,
      [sideBarSlice.name]: sideBarSlice.reducer,
      [snackbarSlice.name]: snackbarSlice.reducer,
      [leadPreviewSlice.name]: leadPreviewSlice.reducer,
      [contactPreviewSlice.name]: contactPreviewSlice.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [humanResourceApi.reducerPath]: humanResourceApi.reducer,
      [companyApi.reducerPath]: companyApi.reducer,
      [paymentApi.reducerPath]: paymentApi.reducer,
      [crmApi.reducerPath]: crmApi.reducer,
      [settingsApi.reducerPath]: settingsApi.reducer,
    },
    devTools: process.env.NODE_ENV === 'development',
    middleware: (gDM) =>
      gDM().concat(
        humanResourceApi.middleware,
        authApi.middleware,
        companyApi.middleware,
        paymentApi.middleware,
        crmApi.middleware,
        settingsApi.middleware
      ),
  })

setupListeners(makeStore().dispatch)
type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true })
