import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
// config
import { PIVOTPOINT_API } from 'config'
// types
import { ListGenericResponse, Supplier, RequestParams } from 'types'
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
    getSupplier: builder.query<ListGenericResponse<Supplier>, string>({
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
      { data: FormData; id: string } & RequestParams
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
                draftedList.data.map((supplier) => {
                  if (supplier.id === id) return data
                  return supplier
                })
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
    // bulkDeleteSupplier: builder.mutation<ListGenericResponse<unknown>, string[]>({
    //   query: (toDelete) => ({
    //     url: 'Suppliers/bulk',
    //     body: { toDelete },
    //     method: 'DELETE',
    //     responseHandler: 'content-type',
    //   }),
    //   async onQueryStarted(toDelete, { dispatch, queryFulfilled }) {
    //     try {
    //       await queryFulfilled
    //       dispatch(
    //         supplierApi.util.updateQueryData(
    //           'getSuppliers',
    //           { PageNumber: 1, PageSize: 10 },
    //           (draftedList) => ({
    //             ...draftedList,
    //             data: draftedList.data.filter((supplier) => !toDelete.includes(supplier.id)),
    //           })
    //         )
    //       )
    //     } catch {
    //       /* empty */
    //     }
    //   },
    // }),
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
  // useBulkDeleteSupplierMutation,
  util: { getRunningQueriesThunk, invalidateTags },
} = supplierApi

// export endpoints for use in SSR
export const { getSupplier, getSuppliers } = supplierApi.endpoints
