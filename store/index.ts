import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
// slices
import sideBarSlice from './slices/sideBarSlice'
import sessionSlice from './slices/sessionSlice'
import leadPreviewSlice from './slices/leadPreviewSlice'
import contactPreviewSlice from './slices/contactPreviewSlice'
// apis
import { authApi } from './api/authApi'
import { humanResourceApi } from './api/humanResourceApi'
import { companyApi } from './api/companyApi'
import { paymentApi } from './api/paymentApi'
import { crmApi } from './api/crm/crmApis'

export const makeStore = () =>
  configureStore({
    reducer: {
      [sessionSlice.name]: sessionSlice.reducer,
      [sideBarSlice.name]: sideBarSlice.reducer,
      [leadPreviewSlice.name]: leadPreviewSlice.reducer,
      [contactPreviewSlice.name]: contactPreviewSlice.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [humanResourceApi.reducerPath]: humanResourceApi.reducer,
      [companyApi.reducerPath]: companyApi.reducer,
      [paymentApi.reducerPath]: paymentApi.reducer,
      [crmApi.reducerPath]: crmApi.reducer,
    },
    devTools: process.env.NODE_ENV === 'development',
    middleware: (gDM) =>
      gDM().concat(
        humanResourceApi.middleware,
        authApi.middleware,
        companyApi.middleware,
        paymentApi.middleware,
        crmApi.middleware
      ),
  })

type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true })
