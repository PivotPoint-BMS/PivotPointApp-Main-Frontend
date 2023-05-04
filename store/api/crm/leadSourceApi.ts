import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
// config
import { PIVOTPOINT_API } from 'config'
// types
import { IGenericResponse } from 'types'
// store
import { RootState } from 'store'
import { LeadSource } from 'types/Lead'

export const leadSourceApi = createApi({
  reducerPath: 'leadSourceApi',
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
  tagTypes: ['LeadSources'],
  endpoints: (builder) => ({
    getLeadSources: builder.query<IGenericResponse<LeadSource[]>, void>({
      query: () => 'LeadSources',
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'LeadSources' as const, id })),
              { type: 'LeadSources', id: 'LIST' },
            ]
          : [{ type: 'LeadSources', id: 'LIST' }],
    }),
    createLeadSource: builder.mutation<string[], LeadSource>({
      query: (data) => ({
        url: 'LeadSources',
        method: 'POST',
        body: data,
        responseHandler: 'content-type',
      }),
      invalidatesTags: ['LeadSources'],
    }),
    editLeadSource: builder.mutation<string[], { data: LeadSource; id: string }>({
      query: ({ data, id }) => ({
        url: `LeadSources/${id}`,
        method: 'PUT',
        body: data,
        responseHandler: 'content-type',
      }),
      invalidatesTags: ['LeadSources'],
    }),
    deleteLeadSource: builder.mutation<string[], string>({
      query: (id) => ({
        url: `LeadSources/${id}`,
        method: 'DELETE',
        responseHandler: 'content-type',
      }),
      invalidatesTags: ['LeadSources'],
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  // Queries
  useGetLeadSourcesQuery,
  // Mutations
  useCreateLeadSourceMutation,
  useDeleteLeadSourceMutation,
  useEditLeadSourceMutation,
  util: { getRunningQueriesThunk, invalidateTags },
} = leadSourceApi

// export endpoints for use in SSR
export const { getLeadSources } = leadSourceApi.endpoints
