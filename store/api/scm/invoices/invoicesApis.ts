/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { HYDRATE } from "next-redux-wrapper"
// config
import { PIVOTPOINT_API } from "config"
// types
import { ListGenericResponse, Invoice, RequestParams, IGenericResponse } from "types"
// store
import { RootState } from "store"
import RequestSearchParams from "types/RequestSearchParams"
// import { assign } from 'lodash'

export const invoicesApi = createApi({
  reducerPath: "invoicesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${PIVOTPOINT_API.baseUrl}/scm`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).session

      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
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
    getInvoices: builder.query<ListGenericResponse<Invoice[]>, RequestSearchParams>({
      query: (params) => ({
        url: "Invoices",
        params,
      }),
    }),
    getInvoice: builder.query<IGenericResponse<Invoice>, string>({
      query: (id) => `Invoices/${id}`,
    }),
    createInvoice: builder.mutation<ListGenericResponse<Invoice>, Partial<Invoice> & RequestParams>(
      {
        query: (data) => ({
          url: "Invoices",
          method: "POST",
          body: data,
          responseHandler: "content-type",
        }),
        async onQueryStarted({ PageNumber, PageSize }, { dispatch, queryFulfilled }) {
          try {
            const {
              data: { data },
            } = await queryFulfilled
            dispatch(
              invoicesApi.util.updateQueryData(
                "getInvoices",
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
      }
    ),
    editInvoice: builder.mutation<
      ListGenericResponse<Invoice>,
      { data: Omit<Invoice, "id">; id: string } & RequestParams
    >({
      query: ({ data, id }) => ({
        url: `Invoices/${id}`,
        method: "PUT",
        body: data,
        responseHandler: "content-type",
      }),

      async onQueryStarted({ id, PageNumber, PageSize }, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled

          dispatch(
            invoicesApi.util.updateQueryData(
              "getInvoices",
              { PageNumber, PageSize },
              (draftedList) => {
                Object.assign(draftedList.data.find((item) => item.id === id)!, data)
                return draftedList
              }
            )
          )

          dispatch(
            invoicesApi.util.updateQueryData("getInvoices", { PageNumber, PageSize }, (draft) => {
              Object.assign(draft.data, data)
            })
          )
        } catch {
          /* empty */
        }
      },
    }),
    pendingInvoice: builder.mutation<ListGenericResponse<Invoice>, { id: string } & RequestParams>({
      query: ({ id }) => ({
        url: `Invoices/IsPending/${id}`,
        method: "PUT",
        responseHandler: "content-type",
      }),

      async onQueryStarted({ id, PageNumber, PageSize }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled

          dispatch(
            invoicesApi.util.updateQueryData(
              "getInvoices",
              { PageNumber, PageSize },
              (draftedList) => {
                Object.assign(draftedList.data.find((item) => item.id === id)!, {
                  ...draftedList.data.find((item) => item.id === id),
                  status: 1,
                })
                return draftedList
              }
            )
          )

          dispatch(
            invoicesApi.util.updateQueryData("getInvoices", { PageNumber, PageSize }, (draft) => {
              Object.assign(draft.data, {
                ...draft.data,
                status: 1,
              })
            })
          )
        } catch {
          /* empty */
        }
      },
    }),
    paidInvoice: builder.mutation<ListGenericResponse<Invoice>, { id: string } & RequestParams>({
      query: ({ id }) => ({
        url: `Invoices/IsPaid/${id}`,
        method: "PUT",
        responseHandler: "content-type",
      }),

      async onQueryStarted({ id, PageNumber, PageSize }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled

          dispatch(
            invoicesApi.util.updateQueryData(
              "getInvoices",
              { PageNumber, PageSize },
              (draftedList) => {
                Object.assign(draftedList.data.find((item) => item.id === id)!, {
                  ...draftedList.data.find((item) => item.id === id),
                  status: 2,
                })
                return draftedList
              }
            )
          )

          dispatch(
            invoicesApi.util.updateQueryData("getInvoices", { PageNumber, PageSize }, (draft) => {
              Object.assign(draft.data, {
                ...draft.data,
                status: 2,
              })
            })
          )
        } catch {
          /* empty */
        }
      },
    }),
    completedInvoice: builder.mutation<
      ListGenericResponse<Invoice>,
      { id: string } & RequestParams
    >({
      query: ({ id }) => ({
        url: `Invoices/IsCompleted/${id}`,
        method: "PUT",
        responseHandler: "content-type",
      }),

      async onQueryStarted({ id, PageNumber, PageSize }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled

          dispatch(
            invoicesApi.util.updateQueryData(
              "getInvoices",
              { PageNumber, PageSize },
              (draftedList) => {
                Object.assign(draftedList.data.find((item) => item.id === id)!, {
                  ...draftedList.data.find((item) => item.id === id),
                  status: 3,
                })
                return draftedList
              }
            )
          )

          dispatch(
            invoicesApi.util.updateQueryData("getInvoices", { PageNumber, PageSize }, (draft) => {
              Object.assign(draft.data, {
                ...draft.data,
                status: 3,
              })
            })
          )
        } catch {
          /* empty */
        }
      },
    }),
    archiveInvoice: builder.mutation<ListGenericResponse<Invoice>, { id: string } & RequestParams>({
      query: ({ id }) => ({
        url: `Invoices/Archive/${id}`,
        method: "PUT",
        responseHandler: "content-type",
      }),

      async onQueryStarted({ id, PageNumber, PageSize }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled

          dispatch(
            invoicesApi.util.updateQueryData(
              "getInvoices",
              { PageNumber, PageSize },
              (draftedList) => {
                Object.assign(draftedList.data.find((item) => item.id === id)!, {
                  ...draftedList.data.find((item) => item.id === id),
                  archived: true,
                })
                return draftedList
              }
            )
          )

          dispatch(
            invoicesApi.util.updateQueryData("getInvoices", { PageNumber, PageSize }, (draft) => {
              Object.assign(draft.data, {
                ...draft.data,
                archived: true,
              })
            })
          )
        } catch {
          /* empty */
        }
      },
    }),
    unarchiveInvoice: builder.mutation<
      ListGenericResponse<Invoice>,
      { id: string } & RequestParams
    >({
      query: ({ id }) => ({
        url: `Invoices/UnArchive/${id}`,
        method: "PUT",
        responseHandler: "content-type",
      }),

      async onQueryStarted({ id, PageNumber, PageSize }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled

          dispatch(
            invoicesApi.util.updateQueryData(
              "getInvoices",
              { PageNumber, PageSize },
              (draftedList) => {
                Object.assign(draftedList.data.find((item) => item.id === id)!, {
                  ...draftedList.data.find((item) => item.id === id),
                  archived: false,
                })
                return draftedList
              }
            )
          )

          dispatch(
            invoicesApi.util.updateQueryData("getInvoices", { PageNumber, PageSize }, (draft) => {
              Object.assign(draft.data, {
                ...draft.data,
                archived: false,
              })
            })
          )
        } catch {
          /* empty */
        }
      },
    }),
    deleteInvoice: builder.mutation<ListGenericResponse<Invoice>, { id: string } & RequestParams>({
      query: ({ id }) => ({
        url: `Invoices/${id}`,
        method: "DELETE",
        responseHandler: "content-type",
      }),
      async onQueryStarted({ id, PageNumber, PageSize }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            invoicesApi.util.updateQueryData(
              "getInvoices",
              { PageNumber, PageSize },
              (draftedList) => ({
                ...draftedList,
                data: draftedList.data.filter((Invoices) => Invoices.id !== id),
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
  useGetInvoiceQuery,
  useGetInvoicesQuery,
  // Mutations
  useEditInvoiceMutation,
  useCreateInvoiceMutation,
  usePendingInvoiceMutation,
  useCompletedInvoiceMutation,
  usePaidInvoiceMutation,
  useDeleteInvoiceMutation,
  useArchiveInvoiceMutation,
  useUnarchiveInvoiceMutation,
  util: { getRunningQueriesThunk },
} = invoicesApi

// export endpoints for use in SSR
export const { getInvoices, getInvoice } = invoicesApi.endpoints
