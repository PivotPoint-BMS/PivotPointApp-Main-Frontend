import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
// config
import { PIVOTPOINT_API } from 'config'
// types
import { Category, IGenericResponse, ListGenericResponse, Product, RequestParams } from 'types'
// store
import { RootState } from 'store'
import RequestSearchParams from 'types/RequestSearchParams'
// import { assign } from 'lodash'

export const productsApi = createApi({
  reducerPath: 'productsApi',
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
    getProducts: builder.query<ListGenericResponse<Product[]>, RequestSearchParams>({
      query: (params) => ({
        url: 'Products',
        params,
      }),
    }),
    getCategories: builder.query<ListGenericResponse<Category[]>, void>({
      query: () => 'Categories',
    }),
    getProduct: builder.query<IGenericResponse<Product>, string>({
      query: (id) => `Products/${id}`,
    }),
    createProduct: builder.mutation<
      IGenericResponse<Product>,
      { data: Omit<Product, 'id'> } & RequestParams
    >({
      query: ({ data }) => ({
        url: 'Products',
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
            productsApi.util.updateQueryData(
              'getProducts',
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
    createCategory: builder.mutation<IGenericResponse<Category>, Omit<Category, 'id'>>({
      query: (data) => ({
        url: 'Categories',
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
            productsApi.util.updateQueryData('getCategories', undefined, (draftedList) => {
              draftedList.data.push(data)
            })
          )
        } catch {
          /* empty */
        }
      },
    }),
    editProduct: builder.mutation<IGenericResponse<Product>, Product & RequestParams>({
      query: ({ id, ...data }) => ({
        url: `Products/${id}`,
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
            productsApi.util.updateQueryData(
              'getProducts',
              { PageNumber, PageSize },
              (draftedList) => {
                draftedList.data.map((product) => {
                  if (product.id === id) return data
                  return product
                })
              }
            )
          )
          dispatch(
            productsApi.util.updateQueryData('getProduct', id, (draft) => {
              Object.assign(draft.data, data)
            })
          )
        } catch {
          /* empty */
        }
      },
    }),
    editCategory: builder.mutation<IGenericResponse<Category>, Category>({
      query: ({ id, ...data }) => ({
        url: `Categories/${id}`,
        method: 'PUT',
        body: data,
        responseHandler: 'content-type',
      }),

      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled

          dispatch(
            productsApi.util.updateQueryData('getCategories', undefined, (draftedList) => {
              draftedList.data.map((product) => {
                if (product.id === id) return data
                return product
              })
            })
          )
          dispatch(
            productsApi.util.updateQueryData('getProduct', id, (draft) => {
              Object.assign(draft.data, data)
            })
          )
        } catch {
          /* empty */
        }
      },
    }),
    deleteProduct: builder.mutation<IGenericResponse<Product>, { id: string } & RequestParams>({
      query: ({ id }) => ({
        url: `Products/${id}`,
        method: 'DELETE',
        responseHandler: 'content-type',
      }),
      async onQueryStarted({ id, PageNumber, PageSize }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            productsApi.util.updateQueryData(
              'getProducts',
              { PageNumber, PageSize },
              (draftedList) => ({
                ...draftedList,
                data: draftedList.data.filter((product) => product.id !== id),
              })
            )
          )
        } catch {
          /* empty */
        }
      },
    }),
    deleteCategory: builder.mutation<IGenericResponse<Category>, string>({
      query: (id) => ({
        url: `Categories/${id}`,
        method: 'DELETE',
        responseHandler: 'content-type',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            productsApi.util.updateQueryData('getCategories', undefined, (draftedList) => ({
              ...draftedList,
              data: draftedList.data.filter((category) => category.id !== id),
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
  useGetProductQuery,
  useGetProductsQuery,
  useGetCategoriesQuery,
  // Mutations
  useCreateProductMutation,
  useCreateCategoryMutation,
  useEditProductMutation,
  useEditCategoryMutation,
  useDeleteProductMutation,
  useDeleteCategoryMutation,
  // useBulkDeleteProductMutation,
  util: { getRunningQueriesThunk, invalidateTags },
} = productsApi

// export endpoints for use in SSR
export const { getProduct, getProducts, getCategories } = productsApi.endpoints
