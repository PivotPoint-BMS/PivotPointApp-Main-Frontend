import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
// config
import { PIVOTPOINT_API } from 'config'
// types
import { Contact, ContactsResponse, Lead, LeadsResponse, LeadSourceResponse } from 'types'
// store
import { RootState } from 'store'
import { LeadSource } from 'types/Lead'

export const crmApi = createApi({
  reducerPath: 'crmApi',
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
    // Contacts APIs
    getContacts: builder.query<ContactsResponse, void>({
      query: () => 'Contact',
    }),
    getContact: builder.query<Contact, string>({
      query: (id) => `Contact/${id}`,
    }),
    // Leads APIs
    getLeads: builder.query<LeadsResponse, void>({
      query: () => 'Lead',
    }),
    getLead: builder.query<Lead, string>({
      query: (id) => `Lead/${id}`,
    }),
    createLead: builder.mutation<string[], Lead>({
      query: (data) => ({
        url: 'Lead',
        method: 'POST',
        body: data,
        responseHandler: 'content-type',
      }),
    }),
    // Lead Sources APIs
    getLeadSources: builder.query<LeadSourceResponse, void>({
      query: () => 'LeadSources',
      providesTags: ['LeadSources'],
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
  useGetContactsQuery,
  useGetContactQuery,
  useGetLeadQuery,
  useGetLeadsQuery,
  useGetLeadSourcesQuery,
  // Mutations
  useCreateLeadMutation,
  useCreateLeadSourceMutation,
  useDeleteLeadSourceMutation,
  util: { getRunningQueriesThunk },
} = crmApi

// export endpoints for use in SSR
export const { getContacts, getContact, getLead, getLeads, getLeadSources, createLead } =
  crmApi.endpoints
