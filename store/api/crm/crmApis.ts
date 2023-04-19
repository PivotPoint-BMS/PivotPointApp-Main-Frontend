import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
// config
import { PIVOTPOINT_API } from 'config'
// types
import { Lead } from 'types'
import { Address } from 'types/Lead'
// store
import { RootState } from 'store'

export const crmApi = createApi({
  reducerPath: 'crmApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${PIVOTPOINT_API.baseUrl}/crm`,
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
    getAddress: builder.mutation<unknown, Address>({
      query: ({ city, country }) => ({
        url: '/Address',
        method: 'GET',
        params: {
          city,
          country,
        },
        responseHandler: 'content-type',
      }),
    }),
    createAddress: builder.mutation<string[], Address>({
      query: (data) => ({
        url: 'Address',
        method: 'POST',
        body: data,
        responseHandler: 'content-type',
      }),
    }),
    createLead: builder.mutation<string[], Lead>({
      query: (data) => ({
        url: 'Lead',
        method: 'POST',
        body: data,
        responseHandler: 'content-type',
      }),
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useGetAddressMutation,
  useCreateAddressMutation,
  useCreateLeadMutation,
  util: { getRunningQueriesThunk },
} = crmApi

// export endpoints for use in SSR
export const { createAddress, createLead } = crmApi.endpoints
