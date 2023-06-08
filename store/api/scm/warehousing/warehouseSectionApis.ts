/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
// config
import { PIVOTPOINT_API } from 'config'
// types
import { ListGenericResponse, RequestParams, IGenericResponse, WarehouseSection } from 'types'
// store
import { RootState } from 'store'
import RequestSearchParams from 'types/RequestSearchParams'
// import { assign } from 'lodash'

export const warehouseSectionApi = createApi({
  reducerPath: 'warehouseSectionApi',
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
    getWarehouseSections: builder.query<
      ListGenericResponse<WarehouseSection[]>,
      RequestSearchParams
    >({
      query: (params) => ({
        url: 'WarehouseSection',
        params,
      }),
    }),
    getWarehouseSection: builder.query<IGenericResponse<WarehouseSection>, string>({
      query: (id) => `WarehouseSection/${id}`,
    }),
    createWarehouseSection: builder.mutation<
      IGenericResponse<WarehouseSection>,
      Omit<WarehouseSection, 'id'> & RequestParams
    >({
      query: (data) => ({
        url: 'WarehouseSection',
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
            warehouseSectionApi.util.updateQueryData(
              'getWarehouseSections',
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
    editWarehouseSection: builder.mutation<
      ListGenericResponse<WarehouseSection>,
      { data: Omit<WarehouseSection, 'id'>; id: string } & RequestParams
    >({
      query: ({ data, id }) => ({
        url: `WarehouseSection/${id}`,
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
            warehouseSectionApi.util.updateQueryData(
              'getWarehouseSections',
              { PageNumber, PageSize },
              (draftedList) => {
                Object.assign(draftedList.data.find((item) => item.id === id)!, data)
                return draftedList
              }
            )
          )

          dispatch(
            warehouseSectionApi.util.updateQueryData('getWarehouseSection', id, (draft) => {
              Object.assign(draft.data, data)
            })
          )
        } catch {
          /* empty */
        }
      },
    }),
    deleteWarehouseSection: builder.mutation<
      ListGenericResponse<WarehouseSection>,
      { id: string } & RequestParams
    >({
      query: ({ id }) => ({
        url: `WarehouseSection/${id}`,
        method: 'DELETE',
        responseHandler: 'content-type',
      }),
      async onQueryStarted({ id, PageNumber, PageSize }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            warehouseSectionApi.util.updateQueryData(
              'getWarehouseSections',
              { PageNumber, PageSize },
              (draftedList) => ({
                ...draftedList,
                data: draftedList.data.filter((warehouseSection) => warehouseSection.id !== id),
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
  useGetWarehouseSectionQuery,
  useGetWarehouseSectionsQuery,
  // Mutations
  useEditWarehouseSectionMutation,
  useCreateWarehouseSectionMutation,
  useDeleteWarehouseSectionMutation,
  util: { getRunningQueriesThunk },
} = warehouseSectionApi

// export endpoints for use in SSR
export const { getWarehouseSection, getWarehouseSections } = warehouseSectionApi.endpoints
