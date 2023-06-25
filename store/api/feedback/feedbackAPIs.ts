import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
// config
import { PIVOTPOINT_API } from 'config'
// store
import { RootState } from 'store'
import { CompanyDetails, IGenericResponse } from 'types'

export const feedbackApi = createApi({
  reducerPath: 'feedbackApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${PIVOTPOINT_API.baseUrl}`,
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
  endpoints: (builder) => ({
    getCompanyDetails: builder.query<IGenericResponse<CompanyDetails>, string>({
      query: (id) => `identity/OrganisationSettings/Details/${id}`,
    }),

    sendFeedback: builder.mutation<IGenericResponse<boolean>, { id: string; review: string }>({
      query: ({ id, review }) => ({
        url: `/im/Analysis/Review/${id}`,
        method: 'POST',
        body: { review },
        responseHandler: 'content-type',
      }),
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  // Queries

  useGetCompanyDetailsQuery,
  // Mutations
  useSendFeedbackMutation,
  util: { getRunningQueriesThunk },
} = feedbackApi

// export endpoints for use in SSR
export const { getCompanyDetails } = feedbackApi.endpoints
