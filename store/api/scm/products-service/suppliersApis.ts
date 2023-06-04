/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
// config
import { PIVOTPOINT_API } from 'config'
// types
import { ListGenericResponse, Supplier, RequestParams, IGenericResponse } from 'types'
// store
import { RootState } from 'store'
import RequestSearchParams from 'types/RequestSearchParams'
// import { assign } from 'lodash'

export const supplierApi = createApi({
  reducerPath: 'supplierApi',
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
    getSuppliers: builder.query<ListGenericResponse<Supplier[]>, RequestSearchParams>({
      query: (params) => ({
        url: 'Suppliers',
        params,
      }),
    }),
    getSupplier: builder.query<IGenericResponse<Supplier>, string>({
      query: (id) => `Suppliers/${id}`,
    }),
    createSupplier: builder.mutation<
      ListGenericResponse<Supplier>,
      Omit<Supplier, 'id'> & RequestParams
    >({
      query: (data) => ({
        url: 'Suppliers',
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
            supplierApi.util.updateQueryData(
              'getSuppliers',
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
    editSupplier: builder.mutation<
      ListGenericResponse<Supplier>,
      { data: Omit<Supplier, 'id'>; id: string } & RequestParams
    >({
      query: ({ data, id }) => ({
        url: `Suppliers/${id}`,
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
            supplierApi.util.updateQueryData(
              'getSuppliers',
              { PageNumber, PageSize },
              (draftedList) => {
                Object.assign(draftedList.data.find((item) => item.id === id)!, data)
                return draftedList
              }
            )
          )

          dispatch(
            supplierApi.util.updateQueryData('getSupplier', id, (draft) => {
              Object.assign(draft.data, data)
            })
          )
        } catch {
          /* empty */
        }
      },
    }),
    deleteSupplier: builder.mutation<ListGenericResponse<Supplier>, { id: string } & RequestParams>(
      {
        query: ({ id }) => ({
          url: `Suppliers/${id}`,
          method: 'DELETE',
          responseHandler: 'content-type',
        }),
        async onQueryStarted({ id, PageNumber, PageSize }, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled
            dispatch(
              supplierApi.util.updateQueryData(
                'getSuppliers',
                { PageNumber, PageSize },
                (draftedList) => ({
                  ...draftedList,
                  data: draftedList.data.filter((supplier) => supplier.id !== id),
                })
              )
            )
          } catch {
            /* empty */
          }
        },
      }
    ),
    appSupplierProduct: builder.mutation<
      ListGenericResponse<Supplier>,
      {
        supplierId: string
        itemId: string
        cost: number
        name: string
        type: number
      }
    >({
      query: (data) => ({
        url: 'Suppliers/AddProduct',
        method: 'POST',
        body: data,
        responseHandler: 'content-type',
      }),
      async onQueryStarted({ supplierId, cost, itemId, name, type }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            supplierApi.util.updateQueryData('getSupplier', supplierId, (drafted) => {
              drafted.data.supplierItems.push({ cost, id: itemId, name, type })
            })
          )
        } catch {
          /* empty */
        }
      },
    }),
    deleteSupplierProduct: builder.mutation<
      ListGenericResponse<Supplier>,
      {
        supplierId: string
        itemId: string
      }
    >({
      query: (data) => ({
        url: 'Suppliers/DeleteProduct',
        method: 'POST',
        body: data,
        responseHandler: 'content-type',
      }),
      async onQueryStarted({ supplierId, itemId }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            supplierApi.util.updateQueryData('getSupplier', supplierId, (drafted) => ({
              ...drafted,
              data: {
                ...drafted.data,
                supplierItems: drafted.data.supplierItems.filter(
                  (supplier) => supplier.id !== itemId
                ),
              },
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
  useGetSupplierQuery,
  useGetSuppliersQuery,
  // Mutations
  useCreateSupplierMutation,
  useEditSupplierMutation,
  useDeleteSupplierMutation,
  useAppSupplierProductMutation,
  useDeleteSupplierProductMutation,
  util: { getRunningQueriesThunk, invalidateTags },
} = supplierApi

// export endpoints for use in SSR
export const { getSupplier, getSuppliers } = supplierApi.endpoints
