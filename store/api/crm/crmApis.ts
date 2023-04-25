import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
// config
import { PIVOTPOINT_API } from 'config'
// types
import { Contact, Lead } from 'types'
// store
import { RootState } from 'store'

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
  tagTypes: [],
  endpoints: (builder) => ({
    getContacts: builder.query<Contact[], void>({
      query: () => 'Contact',
    }),
    getContact: builder.query<Contact, string>({
      query: (id) => `Contact/${id}`,
    }),
    getLeads: builder.query<Lead[], void>({
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
  }),
})

// Export hooks for usage in functional components
export const {
  useGetContactsQuery,
  useGetContactQuery,
  useGetLeadQuery,
  useGetLeadsQuery,
  useCreateLeadMutation,
  util: { getRunningQueriesThunk },
} = crmApi

// export endpoints for use in SSR
export const { getContacts, getContact, getLead, getLeads, createLead } = crmApi.endpoints
