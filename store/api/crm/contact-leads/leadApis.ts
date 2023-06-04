import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
// config
import { PIVOTPOINT_API } from 'config'
// types
import { ListGenericResponse, Lead, LeadRequestParams, RequestParams } from 'types'
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
    getLeads: builder.query<ListGenericResponse<Lead[]>, LeadRequestParams>({
      query: (params) => ({
        url: 'Lead',
        params: {
          ...params,
          IsContact: false,
          IsLead: true,
        },
      }),
    }),
    getContacts: builder.query<ListGenericResponse<Lead[]>, LeadRequestParams>({
      query: (params) => ({
        url: 'Lead',
        params: {
          ...params,
          IsContact: true,
          IsLead: false,
        },
      }),
    }),
    getLead: builder.query<ListGenericResponse<Lead>, string>({
      query: (id) => `Lead/${id}`,
    }),
    createLead: builder.mutation<ListGenericResponse<Lead>, { data: FormData } & RequestParams>({
      query: ({ data }) => ({
        url: 'Lead',
        method: 'POST',
        body: data,
        responseHandler: 'content-type',
      }),
      async onQueryStarted({ PageNumber, PageSize }, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled
          dispatch(
            leadApi.util.updateQueryData('getLeads', { PageNumber, PageSize }, (draftedList) => {
              draftedList.data.push(data)
            })
          )
        } catch {
          /* empty */
        }
      },
    }),
    editLead: builder.mutation<
      ListGenericResponse<Lead>,
      { data: FormData; id: string } & RequestParams
    >({
      query: ({ data, id }) => ({
        url: `Lead/${id}`,
        method: 'PUT',
        body: data,
        responseHandler: 'content-type',
      }),

      async onQueryStarted({ id, PageNumber, PageSize }, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled

          dispatch(
            leadApi.util.updateQueryData('getLeads', { PageNumber, PageSize }, (draftedList) => {
              Object.assign(draftedList.data.find((item) => item.id === id)!, data)
              return draftedList
            })
          )
          dispatch(
            leadApi.util.updateQueryData('getLead', id, (draft) => {
              Object.assign(draft.data, data)
            })
          )
        } catch {
          /* empty */
        }
      },
    }),
    deleteLead: builder.mutation<ListGenericResponse<Lead>, { id: string } & RequestParams>({
      query: ({ id }) => ({
        url: `Lead/${id}`,
        method: 'DELETE',
        responseHandler: 'content-type',
      }),
      async onQueryStarted({ id, PageNumber, PageSize }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            leadApi.util.updateQueryData('getLeads', { PageNumber, PageSize }, (draftedList) => ({
              ...draftedList,
              data: draftedList.data.filter((lead) => lead.id !== id),
            }))
          )
          dispatch(
            leadApi.util.updateQueryData(
              'getContacts',
              { PageNumber, PageSize },
              (draftedList) => ({
                ...draftedList,
                data: draftedList.data.filter((contact) => contact.id !== id),
              })
            )
          )
        } catch {
          /* empty */
        }
      },
    }),
    bulkDeleteLead: builder.mutation<
      ListGenericResponse<unknown>,
      { toDelete: string[] } & RequestParams
    >({
      query: ({ toDelete }) => ({
        url: 'Lead/bulk',
        body: { toDelete },
        method: 'DELETE',
        responseHandler: 'content-type',
      }),
      async onQueryStarted({ toDelete, PageNumber, PageSize }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            leadApi.util.updateQueryData('getLeads', { PageNumber, PageSize }, (draftedList) => ({
              ...draftedList,
              data: draftedList.data.filter((lead) => !toDelete.includes(lead.id)),
            }))
          )
          dispatch(
            leadApi.util.updateQueryData(
              'getContacts',
              { PageNumber, PageSize },
              (draftedList) => ({
                ...draftedList,
                data: draftedList.data.filter((contact) => !toDelete.includes(contact.id)),
              })
            )
          )
        } catch {
          /* empty */
        }
      },
    }),
    convertToContact: builder.mutation<ListGenericResponse<Lead>, { id: string } & RequestParams>({
      query: ({ id }) => ({
        url: `Lead/toContact/${id}`,
        method: 'PUT',
        responseHandler: 'content-type',
      }),
      async onQueryStarted({ id, PageNumber, PageSize }, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled
          dispatch(
            leadApi.util.updateQueryData('getLeads', { PageNumber, PageSize }, (draftedList) => ({
              ...draftedList,
              data: draftedList.data.filter((lead) => lead.id !== id),
            }))
          )
          dispatch(
            leadApi.util.updateQueryData(
              'getContacts',
              { PageNumber: 1, PageSize: 10 },
              (draftedList) => {
                draftedList.data.push(data)
              }
            )
          )
        } catch {
          /* empty */
        }
      },
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  // Queries
  useGetLeadQuery,
  useGetLeadsQuery,
  useGetContactsQuery,
  // Mutations
  useCreateLeadMutation,
  useEditLeadMutation,
  useDeleteLeadMutation,
  useBulkDeleteLeadMutation,
  useConvertToContactMutation,
  util: { getRunningQueriesThunk, invalidateTags },
} = leadApi

// export endpoints for use in SSR
export const { getLead, getContacts, getLeads } = leadApi.endpoints
