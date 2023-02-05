import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

export const humanResourceApi = createApi({
  reducerPath: 'humanResource',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://8698a1af-e859-41eb-ba75-6b1f6348ff7e.mock.pstmn.io',
  }),
  // eslint-disable-next-line consistent-return
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    getWorkersNumber: builder.query<number, void>({
      query: () => 'hrm/workers/number',
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useGetWorkersNumberQuery,
  util: { getRunningQueriesThunk },
} = humanResourceApi

// export endpoints for use in SSR
export const { getWorkersNumber } = humanResourceApi.endpoints
