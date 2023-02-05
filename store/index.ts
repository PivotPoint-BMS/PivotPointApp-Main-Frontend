import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { humanResourceApi } from './slices/humanResourceApi'
import sideBarSlice from './slices/sideBarSlice'

export const makeStore = () =>
  configureStore({
    reducer: {
      [sideBarSlice.name]: sideBarSlice.reducer,
      [humanResourceApi.reducerPath]: humanResourceApi.reducer,
    },
    middleware: (gDM) => gDM().concat(humanResourceApi.middleware),
  })

type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true })
