import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
// config
import { PIVOTPOINT_API } from 'config'
// types
import { Deal } from 'types'
// store
import { RootState } from 'store'

const dealsApi = createApi({
  reducerPath: 'dealsApi',
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
  tagTypes: ['Deals'],
  endpoints: (builder) => ({
    // getdeals: builder.query<IGenericResponse<LeadSource[]>, void>({
    //   query: () => 'deals',
    //   providesTags: (result) =>
    //     result
    //       ? [
    //           ...result.data.map(({ id }) => ({ type: 'deals' as const, id })),
    //           { type: 'deals', id: 'LIST' },
    //         ]
    //       : [{ type: 'deals', id: 'LIST' }],
    // }),
    createDeal: builder.mutation<string[], Omit<Deal, 'id'> & { columnId: string }>({
      query: (data) => ({
        url: 'Deals',
        method: 'POST',
        body: data,
        responseHandler: 'content-type',
      }),
      invalidatesTags: ['Deals'],
    }),
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
  // Mutations
  useCreateDealMutation,
  util: { getRunningQueriesThunk, invalidateTags },
} = dealsApi

// export endpoints for use in SSR
// export const {} = dealsApi.endpoints
export default dealsApi
