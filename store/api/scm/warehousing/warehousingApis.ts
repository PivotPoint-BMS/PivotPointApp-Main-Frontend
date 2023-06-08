/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
// config
import { PIVOTPOINT_API } from 'config'
// types
import { ListGenericResponse, RequestParams, IGenericResponse, Warehouse } from 'types'
// store
import { RootState } from 'store'
import RequestSearchParams from 'types/RequestSearchParams'
// import { assign } from 'lodash'

export const warehousingApi = createApi({
  reducerPath: 'warehousingApi',
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
    getWarehouses: builder.query<ListGenericResponse<Warehouse[]>, RequestSearchParams>({
      query: (params) => ({
        url: 'Warehousing',
        params,
      }),
    }),
    getWarehouse: builder.query<IGenericResponse<Warehouse>, string>({
      query: (id) => `Warehousing/${id}`,
    }),
    createWarehouse: builder.mutation<
      IGenericResponse<Warehouse>,
      Omit<Warehouse, 'id'> & RequestParams
    >({
      query: (data) => ({
        url: 'Warehousing',
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
            warehousingApi.util.updateQueryData(
              'getWarehouses',
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
    editWarehouse: builder.mutation<
      ListGenericResponse<Warehouse>,
      { data: Omit<Warehouse, 'id'>; id: string } & RequestParams
    >({
      query: ({ data, id }) => ({
        url: `Warehousing/${id}`,
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
            warehousingApi.util.updateQueryData(
              'getWarehouses',
              { PageNumber, PageSize },
              (draftedList) => {
                Object.assign(draftedList.data.find((item) => item.id === id)!, data)
                return draftedList
              }
            )
          )

          dispatch(
            warehousingApi.util.updateQueryData('getWarehouse', id, (draft) => {
              Object.assign(draft.data, data)
            })
          )
        } catch {
          /* empty */
        }
      },
    }),
    deleteWarehouse: builder.mutation<
      ListGenericResponse<Warehouse>,
      { id: string } & RequestParams
    >({
      query: ({ id }) => ({
        url: `Warehousing/${id}`,
        method: 'DELETE',
        responseHandler: 'content-type',
      }),
      async onQueryStarted({ id, PageNumber, PageSize }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            warehousingApi.util.updateQueryData(
              'getWarehouses',
              { PageNumber, PageSize },
              (draftedList) => ({
                ...draftedList,
                data: draftedList.data.filter((warehousing) => warehousing.id !== id),
              })
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
  useGetWarehouseQuery,
  useGetWarehousesQuery,
  // Mutations
  useEditWarehouseMutation,
  useCreateWarehouseMutation,
  useDeleteWarehouseMutation,
  util: { getRunningQueriesThunk },
} = warehousingApi

// export endpoints for use in SSR
export const { getWarehouse, getWarehouses } = warehousingApi.endpoints
