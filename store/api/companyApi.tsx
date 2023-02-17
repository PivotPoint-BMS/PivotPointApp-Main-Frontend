import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
// config
import { PIVOTPOINT_API } from 'config'
// types
import { CompanySetupInput } from 'types'
import { RootState } from 'store'

export const companyApi = createApi({
  reducerPath: 'company',
  baseQuery: fetchBaseQuery({
    baseUrl: `${PIVOTPOINT_API.baseUrl}/identity/Company`,
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
    createRequest: builder.mutation<string[], CompanySetupInput>({
      query: (data) => ({
        url: 'CreateRequest',
        method: 'POST',
        body: data,
        responseHandler: 'content-type',
      }),
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useCreateRequestMutation,
  util: { getRunningQueriesThunk },
} = companyApi

// export endpoints for use in SSR
export const { createRequest } = companyApi.endpoints
