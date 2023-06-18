/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
// config
import { PIVOTPOINT_API } from 'config'
// types
import { ListGenericResponse, IGenericResponse, WarehouseSection } from 'types'
// store
import { RootState } from 'store'

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
    getWarehouseSections: builder.query<ListGenericResponse<WarehouseSection[]>, string>({
      query: (id) => `WarehouseSection/${id}`,
    }),
    getWarehouseSection: builder.query<IGenericResponse<WarehouseSection>, string>({
      query: (id) => `WarehouseSection/Detailed/${id}`,
    }),
    createWarehouseSection: builder.mutation<
      IGenericResponse<WarehouseSection>,
      Omit<WarehouseSection, 'id'> & { warehouseId: string }
    >({
      query: ({ warehouseId, ...data }) => ({
        url: `WarehouseSection/${warehouseId}`,
        method: 'POST',
        body: { ...data, dimensions: 'ded' },
        responseHandler: 'content-type',
      }),
      async onQueryStarted({ warehouseId }, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled
          dispatch(
            warehouseSectionApi.util.updateQueryData(
              'getWarehouseSections',
              warehouseId,
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
      { data: Omit<WarehouseSection, 'id'>; id: string; warehouseId: string }
    >({
      query: ({ data, id }) => ({
        url: `WarehouseSection/${id}`,
        method: 'PUT',
        body: data,
        responseHandler: 'content-type',
      }),

      async onQueryStarted({ id, warehouseId }, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled

          dispatch(
            warehouseSectionApi.util.updateQueryData(
              'getWarehouseSections',
              warehouseId,
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
    addWarehouseSectionItem: builder.mutation<
      ListGenericResponse<WarehouseSection>,
      {
        warehouseId: string
        sectionId: string
        itemId: string
        cost: number
        quantity: number
      }
    >({
      query: (data) => ({
        url: 'Warehousing/Item',
        method: 'POST',
        body: data,
        responseHandler: 'content-type',
      }),

      async onQueryStarted({ sectionId, warehouseId }, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled

          dispatch(
            warehouseSectionApi.util.updateQueryData(
              'getWarehouseSections',
              warehouseId,
              (draftedList) => {
                Object.assign(draftedList.data.find((item) => item.id === sectionId)!, data)
                return draftedList
              }
            )
          )

          dispatch(
            warehouseSectionApi.util.updateQueryData('getWarehouseSection', sectionId, (draft) => {
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
      { id: string; warehouseId: string }
    >({
      query: ({ id }) => ({
        url: `WarehouseSection/${id}`,
        method: 'DELETE',
        responseHandler: 'content-type',
      }),
      async onQueryStarted({ id, warehouseId }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            warehouseSectionApi.util.updateQueryData(
              'getWarehouseSections',
              warehouseId,
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
    deleteSectionItem: builder.mutation<
      ListGenericResponse<WarehouseSection>,
      {
        warehouseId: string
        itemId: string
        sectionId: string
      }
    >({
      query: (body) => ({
        url: 'Warehousing/Item',
        method: 'POST',
        body,
        responseHandler: 'content-type',
      }),
      async onQueryStarted({ sectionId, warehouseId, itemId }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            warehouseSectionApi.util.updateQueryData(
              'getWarehouseSections',
              warehouseId,
              (draftedList) => {
                Object.assign(draftedList.data.find((item) => item.id === sectionId)!, {
                  sectionItems: draftedList.data
                    .find((item) => item.id === sectionId)
                    ?.sectionItems.filter((item) => item.id !== itemId),
                })
                return draftedList
              }
            )
          )

          dispatch(
            warehouseSectionApi.util.updateQueryData('getWarehouseSection', sectionId, (draft) => {
              Object.assign(draft.data, {
                sectionItems: draft.data.sectionItems.filter((item) => item.id !== itemId),
              })
              return draft
            })
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
  useAddWarehouseSectionItemMutation,
  useDeleteSectionItemMutation,
  util: { getRunningQueriesThunk },
} = warehouseSectionApi

// export endpoints for use in SSR
export const { getWarehouseSection, getWarehouseSections } = warehouseSectionApi.endpoints
