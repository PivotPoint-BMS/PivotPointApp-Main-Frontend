import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { RootState } from 'store'
// config
import { PIVOTPOINT_API } from 'config'

export const paymentApi = createApi({
  reducerPath: 'payment',
  baseQuery: fetchBaseQuery({
    baseUrl: `${PIVOTPOINT_API.baseUrl}/identity/Payment`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).session
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  // eslint-disable-next-line consistent-return
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    checkPayment: builder.query<{ tier: number; startDate: string; endDate: string }, void>({
      query: () => ({
        url: '/Subscription',
      }),
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useCheckPaymentQuery,
  util: { getRunningQueriesThunk },
} = paymentApi

// export endpoints for use in SSR
export const { checkPayment } = paymentApi.endpoints
