/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
// config
import { PIVOTPOINT_API } from 'config'
// types
import { ListGenericResponse, Delivery, RequestParams, IGenericResponse } from 'types'
// store
import { RootState } from 'store'
import RequestSearchParams from 'types/RequestSearchParams'
// import { assign } from 'lodash'

export const deliveriesApi = createApi({
  reducerPath: 'deliveriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${PIVOTPOINT_API.baseUrl}/scm`,
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
    getDeliveries: builder.query<ListGenericResponse<Delivery[]>, RequestSearchParams>({
      query: (params) => ({
        url: 'Delivery',
        params,
      }),
    }),
    getDelivery: builder.query<IGenericResponse<Delivery>, string>({
      query: (id) => `Delivery/${id}`,
    }),
    createDelivery: builder.mutation<
      ListGenericResponse<Delivery>,
      Omit<Delivery, 'id'> & RequestParams
    >({
      query: (data) => ({
        url: 'Delivery',
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
            deliveriesApi.util.updateQueryData(
              'getDeliveries',
              { PageNumber, PageSize },
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
    editDelivery: builder.mutation<
      ListGenericResponse<Delivery>,
      { data: Omit<Delivery, 'id'>; id: string } & RequestParams
    >({
      query: ({ data, id }) => ({
        url: `Delivery/${id}`,
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
            deliveriesApi.util.updateQueryData(
              'getDeliveries',
              { PageNumber, PageSize },
              (draftedList) => {
                Object.assign(draftedList.data.find((item) => item.id === id)!, data)
                return draftedList
              }
            )
          )

          dispatch(
            deliveriesApi.util.updateQueryData('getDeliveries', id, (draft) => {
              Object.assign(draft.data, data)
            })
          )
        } catch {
          /* empty */
        }
      },
    }),
    deleteDelivery: builder.mutation<ListGenericResponse<Delivery>, { id: string } & RequestParams>(
      {
        query: ({ id }) => ({
          url: `Delivery/${id}`,
          method: 'DELETE',
          responseHandler: 'content-type',
        }),
        async onQueryStarted({ id, PageNumber, PageSize }, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled
            dispatch(
              deliveriesApi.util.updateQueryData(
                'getDeliveries',
                { PageNumber, PageSize },
                (draftedList) => ({
                  ...draftedList,
                  data: draftedList.data.filter((Deliveries) => Deliveries.id !== id),
                })
              )
            )
          } catch {
            /* empty */
          }
        },
      }
    ),
  }),
})

// Export hooks for usage in functional components
export const {
  // Queries
  useGetDeliveryQuery,
  useGetDeliveriesQuery,
  // Mutations
  useEditDeliveryMutation,
  useCreateDeliveryMutation,
  useDeleteDeliveryMutation,
  util: { getRunningQueriesThunk, invalidateTags },
} = deliveriesApi

// export endpoints for use in SSR
export const { getDeliveries, getDelivery } = deliveriesApi.endpoints
