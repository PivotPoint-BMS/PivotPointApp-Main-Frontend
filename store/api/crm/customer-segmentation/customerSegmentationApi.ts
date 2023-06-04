import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
// config
import { PIVOTPOINT_API } from 'config'
// types
import { IGenericResponse, Segment, SegmentClient } from 'types'
// store
import { RootState } from 'store'
import { leadApi } from '../contact-leads/leadApis'

export const customerSegmentationApi = createApi({
  reducerPath: 'customerSegmentationApi',
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
  endpoints: (builder) => ({
    getSegmentations: builder.query<IGenericResponse<Segment[]>, void>({
      query: () => 'ClientSegmentation',
    }),
    createSegment: builder.mutation<
      IGenericResponse<Segment>,
      {
        segmentName: string
        segmentDescription: string
      }
    >({
      query: (data) => ({
        url: 'ClientSegmentation',
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
            customerSegmentationApi.util.updateQueryData(
              'getSegmentations',
              undefined,
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
    editSegment: builder.mutation<
      IGenericResponse<Segment>,
      {
        id: string
        segmentName: string
        segmentDescription: string
      }
    >({
      query: ({ id, ...patch }) => ({
        url: `ClientSegmentation/${id}`,
        method: 'PUT',
        body: patch,
        responseHandler: 'content-type',
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            customerSegmentationApi.util.updateQueryData(
              'getSegmentations',
              undefined,
              (draftedList) => {
                const segment = draftedList.data.find((item) => item.id === id)
                if (segment) Object.assign(segment, patch)
              }
            )
          )
        } catch {
          /* empty */
        }
      },
    }),
    deleteSegment: builder.mutation<IGenericResponse<Segment>, string>({
      query: (id) => ({
        url: `ClientSegmentation/${id}`,
        method: 'DELETE',
        responseHandler: 'content-type',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            customerSegmentationApi.util.updateQueryData(
              'getSegmentations',
              undefined,
              (draftedList) => ({
                ...draftedList,
                data: draftedList.data.filter((segment) => segment.id !== id),
              })
            )
          )
        } catch {
          /* empty */
        }
      },
    }),
    addClientToSegment: builder.mutation<
      IGenericResponse<Segment>,
      {
        segmentId: string
        client: SegmentClient
        PageNumber: number
        PageSize: number
      }
    >({
      query: ({ segmentId, client: { id } }) => ({
        url: 'ClientSegmentation/Client',
        method: 'POST',
        body: {
          segmentId,
          clientId: id,
        },
        responseHandler: 'content-type',
      }),
      async onQueryStarted(
        { segmentId, client, PageNumber, PageSize },
        { dispatch, queryFulfilled }
      ) {
        try {
          await queryFulfilled
          dispatch(
            leadApi.util.updateQueryData(
              'getSegmentClients',
              { id: segmentId, PageNumber, PageSize },
              (draftedList) => {
                draftedList.data.push(client)
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
  useGetSegmentationsQuery,
  // Mutations
  useCreateSegmentMutation,
  useEditSegmentMutation,
  useDeleteSegmentMutation,
  useAddClientToSegmentMutation,
  util: { getRunningQueriesThunk },
} = customerSegmentationApi

// export endpoints for use in SSR
export const { getSegmentations } = customerSegmentationApi.endpoints
export default customerSegmentationApi
