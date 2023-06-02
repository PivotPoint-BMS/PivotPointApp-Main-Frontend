import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
// config
import { PIVOTPOINT_API } from 'config'
// types
import { IGenericResponse, ListGenericResponse, RequestParams } from 'types'
// store
import { RootState } from 'store'
import { LeadSource } from 'types/Lead'
import RequestSearchParams from 'types/RequestSearchParams'

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
    getLeadSources: builder.query<ListGenericResponse<LeadSource[]>, RequestSearchParams>({
      query: (params) => ({
        url: 'LeadSources',
        params,
      }),
    }),
    getAllLeadSources: builder.query<ListGenericResponse<LeadSource[]>, void>({
      query: () => 'LeadSources/All',
    }),
    createLeadSource: builder.mutation<
      IGenericResponse<LeadSource>,
      { data: LeadSource } & RequestParams
    >({
      query: ({ data }) => ({
        url: 'LeadSources',
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
            leadSourceApi.util.updateQueryData(
              'getLeadSources',
              { PageNumber, PageSize },
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
    editLeadSource: builder.mutation<string[], { data: LeadSource; id: string } & RequestParams>({
      query: ({ data, id }) => ({
        url: `LeadSources/${id}`,
        method: 'PUT',
        body: data,
        responseHandler: 'content-type',
      }),
      async onQueryStarted({ id, PageNumber, PageSize, data }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled

          dispatch(
            leadSourceApi.util.updateQueryData(
              'getLeadSources',
              { PageNumber, PageSize },
              (draftedList) => {
                draftedList.data.map((source) => {
                  if (source.id === id) return { id, ...data }
                  return source
                })
              }
            )
          )
          dispatch(
            leadSourceApi.util.updateQueryData('getAllLeadSources', undefined, (draftedList) => {
              draftedList.data.map((source) => {
                if (source.id === id) return { id, ...data }
                return source
              })
            })
          )
        } catch {
          /* empty */
        }
      },
    }),
    deleteLeadSource: builder.mutation<string[], { id: string } & RequestParams>({
      query: ({ id }) => ({
        url: `LeadSources/${id}`,
        method: 'DELETE',
        responseHandler: 'content-type',
      }),
      async onQueryStarted({ id, PageNumber, PageSize }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            leadSourceApi.util.updateQueryData(
              'getLeadSources',
              { PageNumber, PageSize },
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
    bulkDeleteLeadSources: builder.mutation<
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
            leadSourceApi.util.updateQueryData(
              'getLeadSources',
              { PageNumber, PageSize },
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
