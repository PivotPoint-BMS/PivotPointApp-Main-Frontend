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
    createDealBoard: builder.mutation<
      IGenericResponse<unknown>,
      {
        title: string
        defColumnTitle: string
      }
    >({
      query: (data) => ({
        url: 'DealBoards',
        method: 'POST',
        body: data,
        responseHandler: 'content-type',
      }),
      invalidatesTags: ['DealsBoards'],
    }),

    createDealBoardColumn: builder.mutation<
      IGenericResponse<unknown>,
      { boardId: string; columnTitle: string }
    >({
      query: ({ columnTitle, boardId }) => ({
        url: `BoardColumns/${boardId}`,
        method: 'POST',
        body: { columnTitle },
        responseHandler: 'content-type',
      }),
      invalidatesTags: ['DealsBoards'],
    }),
    presistColumnOrder: builder.mutation<IGenericResponse<unknown>, { id: string; order: number }>({
      query: (data) => ({
        url: '/api/crm/BoardColumns',
        method: 'PUT',
        body: data,
        responseHandler: 'content-type',
      }),
      invalidatesTags: ['DealsBoards'],
    }),

    createDeal: builder.mutation<string[], Omit<Deal, 'id'> & { columnId: string }>({
      query: (data) => ({
        url: 'Deals',
        method: 'POST',
        body: data,
        responseHandler: 'content-type',
      }),
      invalidatesTags: ['DealsBoards'],
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  // Queries
  useGetDealBoardsQuery,
  useGetDealBoardQuery,
  // Mutations
  useCreateDealBoardMutation,
  useCreateDealBoardColumnMutation,
  useCreateDealMutation,
  util: { getRunningQueriesThunk, invalidateTags },
} = dealsBoardsApi

// export endpoints for use in SSR
export const { getDealBoards, getDealBoard } = dealsBoardsApi.endpoints
export default dealsBoardsApi
