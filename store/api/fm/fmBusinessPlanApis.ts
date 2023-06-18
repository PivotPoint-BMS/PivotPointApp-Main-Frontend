import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
// config
import { PIVOTPOINT_API } from 'config'
// types
import { IGenericError, IGenericResponse } from 'types'
// store
import { RootState } from 'store'

export const fmBusinessPlanApi = createApi({
  reducerPath: 'fmBusinessPlanApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${PIVOTPOINT_API.baseUrl}/fm`,
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
    getBusinnesPlan: builder.query<IGenericResponse<unknown>, void>({
      query: () => 'BusinessPlan',
      transformErrorResponse: (response: IGenericError) => response.data.message,
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  // Queries
  useGetBusinnesPlanQuery,
  // Mutations
  util: { getRunningQueriesThunk, invalidateTags },
} = fmBusinessPlanApi

// export endpoints for use in SSR
export const { getBusinnesPlan } = fmBusinessPlanApi.endpoints
