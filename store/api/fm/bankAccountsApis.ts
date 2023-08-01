/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
// config
import { PIVOTPOINT_API } from 'config'
// types
import { ListGenericResponse, BankAccount, RequestParams, IGenericResponse } from 'types'
// store
import { RootState } from 'store'
import RequestSearchParams from 'types/RequestSearchParams'
// import { assign } from 'lodash'

export const bankAccountsApi = createApi({
  reducerPath: 'bankAccountsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${PIVOTPOINT_API.baseUrl}/fm`,
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
    getBankAccounts: builder.query<ListGenericResponse<BankAccount[]>, RequestSearchParams>({
      query: (params) => ({
        url: 'Accounts',
        params,
      }),
    }),
    getBankAccount: builder.query<IGenericResponse<BankAccount>, string>({
      query: (id) => `Accounts/${id}`,
    }),
    createBankAccount: builder.mutation<
      ListGenericResponse<BankAccount>,
      Omit<BankAccount, 'id'> & RequestParams
    >({
      query: (data) => ({
        url: 'Accounts',
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
            bankAccountsApi.util.updateQueryData(
              'getBankAccounts',
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
    editBankAccount: builder.mutation<
      ListGenericResponse<BankAccount>,
      { data: Omit<BankAccount, 'id'>; id: string } & RequestParams
    >({
      query: ({ data, id }) => ({
        url: `Accounts/${id}`,
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
            bankAccountsApi.util.updateQueryData(
              'getBankAccounts',
              { PageNumber, PageSize },
              (draftedList) => {
                Object.assign(draftedList.data.find((item) => item.id === id)!, data)
                return draftedList
              }
            )
          )

          dispatch(
            bankAccountsApi.util.updateQueryData('getBankAccount', id, (draft) => {
              Object.assign(draft.data, data)
            })
          )
        } catch {
          /* empty */
        }
      },
    }),
    deleteBankAccount: builder.mutation<
      ListGenericResponse<BankAccount>,
      { id: string } & RequestParams
    >({
      query: ({ id }) => ({
        url: `Accounts/${id}`,
        method: 'DELETE',
        responseHandler: 'content-type',
      }),
      async onQueryStarted({ id, PageNumber, PageSize }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            bankAccountsApi.util.updateQueryData(
              'getBankAccounts',
              { PageNumber, PageSize },
              (draftedList) => ({
                ...draftedList,
                data: draftedList.data.filter((bankAccounts) => bankAccounts.id !== id),
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
  useGetBankAccountQuery,
  useGetBankAccountsQuery,
  // Mutations
  useCreateBankAccountMutation,
  useEditBankAccountMutation,
  useDeleteBankAccountMutation,
  util: { getRunningQueriesThunk, invalidateTags },
} = bankAccountsApi

// export endpoints for use in SSR
export const { getBankAccount, getBankAccounts } = bankAccountsApi.endpoints
