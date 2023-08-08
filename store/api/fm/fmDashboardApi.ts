import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { HYDRATE } from "next-redux-wrapper"
// config
import { PIVOTPOINT_API } from "config"
// types
import { IGenericError, IGenericResponse } from "types"
// store
import { RootState } from "store"

export const financeDashboardApi = createApi({
  reducerPath: "financeDashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${PIVOTPOINT_API.baseUrl}/fm`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).session

      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
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
    getFmDashboardStats: builder.query<IGenericResponse<unknown>, void>({
      query: () => "Dashboard",
      transformErrorResponse: (response: IGenericError) => response.data.message,
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  // Queries
  useGetFmDashboardStatsQuery,
  // Mutations
  util: { getRunningQueriesThunk, invalidateTags },
} = financeDashboardApi

// export endpoints for use in SSR
export const { getFmDashboardStats } = financeDashboardApi.endpoints
