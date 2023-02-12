import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { authApi } from './api/authApi'
import { humanResourceApi } from './api/humanResourceApi'
import sideBarSlice from './slices/sideBarSlice'
import sessionSlice from './slices/sessionSlice'

export const makeStore = () =>
  configureStore({
    reducer: {
      [sessionSlice.name]: sessionSlice.reducer,
      [sideBarSlice.name]: sideBarSlice.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [humanResourceApi.reducerPath]: humanResourceApi.reducer,
    },
    devTools: process.env.NODE_ENV === 'development',
    middleware: (gDM) => gDM().concat(humanResourceApi.middleware, authApi.middleware),
  })

type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true })
