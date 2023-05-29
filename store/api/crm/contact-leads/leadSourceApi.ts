import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
// config
import { PIVOTPOINT_API } from 'config'
// types
import { IGenericResponse, ListGenericResponse, RequestParams } from 'types'
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
  tagTypes: ['LeadSources', 'AllLeadSources'],
  endpoints: (builder) => ({
    getLeadSources: builder.query<ListGenericResponse<LeadSource[]>, RequestParams>({
      query: () => 'LeadSources',
    }),
    getAllLeadSources: builder.query<ListGenericResponse<LeadSource[]>, void>({
      query: () => 'LeadSources/All',
    }),
    createLeadSource: builder.mutation<IGenericResponse<LeadSource>, LeadSource>({
      query: (data) => ({
        url: 'LeadSources',
        method: 'POST',
        body: data,
        responseHandler: 'content-type',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled
          dispatch(
            leadSourceApi.util.updateQueryData(
              'getLeadSources',
              { PageNumber: 1, PageSize: 10 },
              (draftedList) => {
                draftedList.data.push(data)
              }
            )
          )
          dispatch(
            leadSourceApi.util.updateQueryData('getAllLeadSources', undefined, (draftedList) => {
              draftedList.data.push(data)
            })
          )
        } catch {
          /* empty */
        }
      },
    }),
    editLeadSource: builder.mutation<string[], { data: LeadSource; id: string }>({
      query: ({ data, id }) => ({
        url: `LeadSources/${id}`,
        method: 'PUT',
        body: data,
        responseHandler: 'content-type',
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled

          dispatch(
            leadSourceApi.util.updateQueryData(
              'getLeadSources',
              { PageNumber: 1, PageSize: 10 },
              (draftedList) => {
                draftedList.data.map((source) => {
                  if (source.id === id) return { ...source, ...patch }
                  return source
                })
              }
            )
          )
          dispatch(
            leadSourceApi.util.updateQueryData('getAllLeadSources', undefined, (draftedList) => {
              draftedList.data.map((source) => {
                if (source.id === id) return { ...source, ...patch }
                return source
              })
            })
          )
        } catch {
          /* empty */
        }
      },
    }),
    deleteLeadSource: builder.mutation<string[], string>({
      query: (id) => ({
        url: `LeadSources/${id}`,
        method: 'DELETE',
        responseHandler: 'content-type',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            leadSourceApi.util.updateQueryData(
              'getLeadSources',
              { PageNumber: 1, PageSize: 10 },
              (draftedList) => ({
                ...draftedList,
                data: draftedList.data.filter((source) => source.id !== id),
              })
            )
          )
          dispatch(
            leadSourceApi.util.updateQueryData('getAllLeadSources', undefined, (draftedList) => ({
              ...draftedList,
              data: draftedList.data.filter((source) => source.id !== id),
            }))
          )
        } catch {
          /* empty */
        }
      },
    }),
    bulkDeleteLeadSources: builder.mutation<ListGenericResponse<unknown>, string[]>({
      query: (toDelete) => ({
        url: 'Lead/bulk',
        body: { toDelete },
        method: 'DELETE',
        responseHandler: 'content-type',
      }),
      async onQueryStarted(toDelete, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            leadSourceApi.util.updateQueryData(
              'getLeadSources',
              { PageNumber: 1, PageSize: 10 },
              (draftedList) => ({
                ...draftedList,
                data: draftedList.data.filter(
                  (source) => source.id && !toDelete.includes(source.id)
                ),
              })
            )
          )
          dispatch(
            leadSourceApi.util.updateQueryData('getAllLeadSources', undefined, (draftedList) => ({
              ...draftedList,
              data: draftedList.data.filter((source) => source.id && !toDelete.includes(source.id)),
            }))
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
  useGetLeadSourcesQuery,
  useGetAllLeadSourcesQuery,
  // Mutations
  useCreateLeadSourceMutation,
  useEditLeadSourceMutation,
  useDeleteLeadSourceMutation,
  useBulkDeleteLeadSourcesMutation,
  util: { getRunningQueriesThunk, invalidateTags },
} = leadSourceApi

// export endpoints for use in SSR
export const { getLeadSources, getAllLeadSources } = leadSourceApi.endpoints
