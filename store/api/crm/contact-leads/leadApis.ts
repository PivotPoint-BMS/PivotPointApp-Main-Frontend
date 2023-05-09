import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
// config
import { PIVOTPOINT_API } from 'config'
// types
import { IGenericResponse, Lead, LeadRequestParams } from 'types'
// store
import { RootState } from 'store'

export const leadApi = createApi({
  reducerPath: 'leadApi',
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
  tagTypes: ['Leads', 'Lead'],
  endpoints: (builder) => ({
    getLeads: builder.query<IGenericResponse<Lead[]>, LeadRequestParams>({
      query: (params) => ({
        url: 'Lead',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Leads' as const, id })),
              { type: 'Leads', id: 'LIST' },
            ]
          : [{ type: 'Leads', id: 'LIST' }],
    }),
    getLead: builder.query<IGenericResponse<Lead>, string>({
      query: (id) => `Lead/${id}`,
      providesTags: ['Lead'],
    }),
    createLead: builder.mutation<string[], FormData>({
      query: (data) => ({
        url: 'Lead',
        method: 'POST',
        body: data,
        responseHandler: 'content-type',
      }),
      invalidatesTags: ['Leads', 'Lead'],
    }),
    editLead: builder.mutation<string[], { data: FormData; id: string }>({
      query: ({ data, id }) => ({
        url: `Lead/${id}`,
        method: 'PUT',
        body: data,
        responseHandler: 'content-type',
      }),
      invalidatesTags: ['Leads', 'Lead'],
    }),
    deleteLead: builder.mutation<string[], string>({
      query: (id) => ({
        url: `Lead/${id}`,
        method: 'DELETE',
        responseHandler: 'content-type',
      }),
      invalidatesTags: ['Leads', 'Lead'],
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  // Queries
  useGetLeadQuery,
  useGetLeadsQuery,
  // Mutations
  useCreateLeadMutation,
  useEditLeadMutation,
  useDeleteLeadMutation,
  util: { getRunningQueriesThunk, invalidateTags },
} = leadApi

// export endpoints for use in SSR
export const { getLead, getLeads } = leadApi.endpoints
