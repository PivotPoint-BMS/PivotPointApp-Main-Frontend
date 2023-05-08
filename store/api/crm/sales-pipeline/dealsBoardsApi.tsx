import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
// config
import { PIVOTPOINT_API } from 'config'
// types
import { Deal, IGenericResponse } from 'types'
import DealBoardProps, { DealBoard, DealBoardResponse } from 'types/DealBoardProps'
// store
import { RootState } from 'store'
import DealBoardColumnProps from 'types/DealBoardColumnProps'

export const dealsBoardsApi = createApi({
  reducerPath: 'dealsBoardsApi',
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
  tagTypes: ['DealsBoards'],
  endpoints: (builder) => ({
    getDealBoards: builder.query<DealBoard[], void>({
      query: () => 'DealBoards',
      providesTags: ['DealsBoards'],
      transformResponse: (response: IGenericResponse<DealBoardProps>) => response.data.dealBoards,
    }),
    getDealBoard: builder.query<Omit<DealBoardProps, 'dealBoards'>, string>({
      query: (id) => `DealBoards/Board/${id}`,
      providesTags: ['DealsBoards'],
      transformResponse: (response: IGenericResponse<DealBoardResponse>) => {
        const columns = response.data.columns.reduce<{ [key: string]: DealBoardColumnProps }>(
          (acc, curr) => {
            acc[curr.id.toString()] = curr
            return acc
          },
          {}
        )
        const deals = response.data.deals.reduce<{ [key: string]: Deal }>((acc, curr) => {
          acc[curr.id.toString()] = curr
          return acc
        }, {})
        const { columnsOrder } = response.data
        return {
          columns,
          columnsOrder,
          deals,
        }
      },
    }),
    // createLeadSource: builder.mutation<string[], LeadSource>({
    //   query: (data) => ({
    //     url: 'deals',
    //     method: 'POST',
    //     body: data,
    //     responseHandler: 'content-type',
    //   }),
    //   invalidatesTags: ['deals'],
    // }),
    // editLeadSource: builder.mutation<string[], { data: LeadSource; id: string }>({
    //   query: ({ data, id }) => ({
    //     url: `deals/${id}`,
    //     method: 'PUT',
    //     body: data,
    //     responseHandler: 'content-type',
    //   }),
    //   invalidatesTags: ['deals'],
    // }),
    // deleteLeadSource: builder.mutation<string[], string>({
    //   query: (id) => ({
    //     url: `deals/${id}`,
    //     method: 'DELETE',
    //     responseHandler: 'content-type',
    //   }),
    //   invalidatesTags: ['deals'],
    // }),
  }),
})

// Export hooks for usage in functional components
export const {
  // Queries
  useGetDealBoardsQuery,
  useGetDealBoardQuery,
  // Mutations

  util: { getRunningQueriesThunk, invalidateTags },
} = dealsBoardsApi

// export endpoints for use in SSR
export const { getDealBoards, getDealBoard } = dealsBoardsApi.endpoints
export default dealsBoardsApi
