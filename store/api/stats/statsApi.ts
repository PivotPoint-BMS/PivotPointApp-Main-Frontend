import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { HYDRATE } from "next-redux-wrapper"
// config
import { PIVOTPOINT_API } from "config"
// store
import { RootState } from "store"
import { CrmStats, IGenericResponse, ScmStats } from "types"

export const statsApi = createApi({
  reducerPath: "statsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${PIVOTPOINT_API.statsUrl}`,
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
  tagTypes: ["CrmStats"],
  endpoints: (builder) => ({
    getCrmStats: builder.query<IGenericResponse<CrmStats>, void>({
      query: () => "CRMStats",
      providesTags: ["CrmStats"],
    }),
    getScmStats: builder.query<IGenericResponse<ScmStats>, void>({
      query: () => "SCMStats",
      providesTags: ["CrmStats"],
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useGetCrmStatsQuery,
  useGetScmStatsQuery,
  util: { getRunningQueriesThunk },
} = statsApi

// export endpoints for use in SSR
export const { getCrmStats } = statsApi.endpoints
