/* eslint-disable no-param-reassign */
import { arrayMove } from '@dnd-kit/sortable'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
// config
import { PIVOTPOINT_API } from 'config'
// types
import { Deal, IGenericResponse } from 'types'
import DealBoardProps, { DealBoard, DealBoardResponse } from 'types/DealBoardProps'
// store
import { RootState } from 'store'
import DealBoardColumnProps from 'types/DealBoardColumnProps'

export const dealsBoardsApi = createApi({
  reducerPath: 'dealsBoardsApi',
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
  tagTypes: ['DealsBoards'],
  endpoints: (builder) => ({
    getDealBoards: builder.query<DealBoard[], void>({
      query: () => 'DealBoards',
      transformResponse: (response: IGenericResponse<DealBoardResponse>) =>
        response.data.dealBoards,
    }),
    getDealBoard: builder.query<
      Omit<DealBoardProps, 'dealBoards'> & { dealBoards: { [key: string]: DealBoard } },
      string
    >({
      query: (id) => `DealBoards/Board/${id}`,
      transformResponse: (response: IGenericResponse<DealBoardResponse>) => {
        const columns = response.data.columns.reduce<{ [key: string]: DealBoardColumnProps }>(
          (acc, curr) => {
            acc[curr.id.toString()] = curr
            return acc
          },
          {}
        )
        const deals = response.data.deals.reduce<{ [key: string]: Deal }>((acc, curr) => {
          acc[curr.id.toString()] = curr
          return acc
        }, {})
        const dealBoards = response.data.dealBoards.reduce<{ [key: string]: DealBoard }>(
          (acc, curr) => {
            acc[curr.id.toString()] = curr
            return acc
          },
          {}
        )
        const { columnsOrder } = response.data
        return {
          columns,
          columnsOrder,
          deals,
          dealBoards,
        }
      },
    }),
    createDealBoard: builder.mutation<
      IGenericResponse<DealBoard>,
      {
        title: string
        defColumnTitle: string
      }
    >({
      query: (data) => ({
        url: 'DealBoards',
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
            dealsBoardsApi.util.updateQueryData('getDealBoards', undefined, (draftedList) => {
              draftedList.push(data)
            })
          )
        } catch {
          /* empty */
        }
      },
    }),
    editDealBoardTitle: builder.mutation<
      IGenericResponse<DealBoard>,
      {
        id: string
        title: string
      }
    >({
      query: ({ title, id }) => ({
        url: `DealBoards/Title/${id}`,
        method: 'PUT',
        body: { title },
        responseHandler: 'content-type',
      }),
      async onQueryStarted({ title, id }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            dealsBoardsApi.util.updateQueryData('getDealBoards', undefined, (draftedList) => {
              const board = draftedList.find((item) => item.id === id)
              if (board) board.title = title
            })
          )
        } catch {
          /* empty */
        }
      },
    }),
    deleteDealBoard: builder.mutation<IGenericResponse<unknown>, string>({
      query: (id) => ({
        url: `DealBoards/${id}`,
        method: 'DELETE',
        responseHandler: 'content-type',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            dealsBoardsApi.util.updateQueryData('getDealBoards', undefined, (draftedList) =>
              draftedList.filter((board) => board.id !== id)
            )
          )
        } catch {
          /* empty */
        }
      },
    }),
    createDealBoardColumn: builder.mutation<
      IGenericResponse<DealBoardColumnProps>,
      { boardId: string; columnTitle: string }
    >({
      query: ({ columnTitle, boardId }) => ({
        url: `BoardColumns/${boardId}`,
        method: 'POST',
        body: { columnTitle },
        responseHandler: 'content-type',
      }),
      async onQueryStarted({ boardId }, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled

          dispatch(
            dealsBoardsApi.util.updateQueryData('getDealBoard', boardId, (draft) => {
              const { columns } = draft

              const newColumns = columns

              Object.assign(newColumns, { [data.id]: data })

              draft.columns = newColumns
              draft.columnsOrder.push(data.id)
              return draft
            })
          )
        } catch {
          /* empty */
        }
      },
    }),
    editDealBoardColumn: builder.mutation<
      IGenericResponse<DealBoardColumnProps>,
      { id: string; columnTitle: string; boardId: string }
    >({
      query: ({ columnTitle, id }) => ({
        url: `BoardColumns/${id}`,
        method: 'PUT',
        body: { columnTitle },
        responseHandler: 'content-type',
      }),
      async onQueryStarted({ boardId, id, columnTitle }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled

          dispatch(
            dealsBoardsApi.util.updateQueryData('getDealBoard', boardId, (draft) => {
              const { columns } = draft

              const newColumns = {}
              Object.keys(columns).forEach((key) => {
                if (key === id)
                  Object.assign(newColumns, {
                    [key]: {
                      id: columns[key].id,
                      columnTitle,
                      deals: columns[key].deals,
                      columnType: columns[key].columnType,
                    },
                  })
                else
                  Object.assign(newColumns, {
                    [key]: {
                      id: columns[key].id,
                      columnTitle: columns[key].columnTitle,
                      deals: columns[key].deals,
                      columnType: columns[key].columnType,
                    },
                  })
              })

              draft.columns = newColumns
              return draft
            })
          )
        } catch {
          /* empty */
        }
      },
    }),
    makeSuccessColumn: builder.mutation<
      IGenericResponse<DealBoardColumnProps>,
      { id: string; boardId: string }
    >({
      query: ({ id }) => ({
        url: `BoardColumns/Success/${id}`,
        method: 'PUT',
        responseHandler: 'content-type',
      }),
      async onQueryStarted({ boardId, id }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled

          dispatch(
            dealsBoardsApi.util.updateQueryData('getDealBoard', boardId, (draft) => {
              const { columns } = draft

              const newColumns = {}
              Object.keys(columns).forEach((key) => {
                if (key === id)
                  Object.assign(newColumns, {
                    [key]: {
                      id: columns[key].id,
                      columnTitle: columns[key].columnTitle,
                      deals: columns[key].deals,
                      columnType: 1,
                    },
                  })
                // else if (columns[key].columnType === 1)
                //   Object.assign(newColumns, {
                //     [key]: {
                //       id: columns[key].id,
                //       columnTitle: columns[key].columnTitle,
                //       deals: columns[key].deals,
                //       columnType: 0,
                //     },
                //   })
                else
                  Object.assign(newColumns, {
                    [key]: {
                      id: columns[key].id,
                      columnTitle: columns[key].columnTitle,
                      deals: columns[key].deals,
                      columnType: columns[key].columnType,
                    },
                  })
              })

              draft.columns = newColumns
              return draft
            })
          )
        } catch {
          /* empty */
        }
      },
    }),
    makeFailureColumn: builder.mutation<
      IGenericResponse<DealBoardColumnProps>,
      { id: string; boardId: string }
    >({
      query: ({ id }) => ({
        url: `BoardColumns/Failure/${id}`,
        method: 'PUT',
        responseHandler: 'content-type',
      }),
      async onQueryStarted({ boardId, id }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled

          dispatch(
            dealsBoardsApi.util.updateQueryData('getDealBoard', boardId, (draft) => {
              const { columns } = draft

              const newColumns = {}
              Object.keys(columns).forEach((key) => {
                if (key === id)
                  Object.assign(newColumns, {
                    [key]: {
                      id: columns[key].id,
                      columnTitle: columns[key].columnTitle,
                      deals: columns[key].deals,
                      columnType: 2,
                    },
                  })
                // else if (columns[key].columnType === 2)
                //   Object.assign(newColumns, {
                //     [key]: {
                //       id: columns[key].id,
                //       columnTitle: columns[key].columnTitle,
                //       deals: columns[key].deals,
                //       columnType: 0,
                //     },
                //   })
                else
                  Object.assign(newColumns, {
                    [key]: {
                      id: columns[key].id,
                      columnTitle: columns[key].columnTitle,
                      deals: columns[key].deals,
                      columnType: columns[key].columnType,
                    },
                  })
              })

              draft.columns = newColumns
              return draft
            })
          )
        } catch {
          /* empty */
        }
      },
    }),
    makeNormalColumn: builder.mutation<
      IGenericResponse<DealBoardColumnProps>,
      { id: string; boardId: string }
    >({
      query: ({ id }) => ({
        url: `BoardColumns/Failure/${id}`,
        method: 'PUT',
        responseHandler: 'content-type',
      }),
      async onQueryStarted({ boardId, id }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled

          dispatch(
            dealsBoardsApi.util.updateQueryData('getDealBoard', boardId, (draft) => {
              const { columns } = draft

              const newColumns = {}
              Object.keys(columns).forEach((key) => {
                if (key === id)
                  Object.assign(newColumns, {
                    [key]: {
                      id: columns[key].id,
                      columnTitle: columns[key].columnTitle,
                      deals: columns[key].deals,
                      columnType: 0,
                    },
                  })
                else
                  Object.assign(newColumns, {
                    [key]: {
                      id: columns[key].id,
                      columnTitle: columns[key].columnTitle,
                      deals: columns[key].deals,
                      columnType: columns[key].columnType,
                    },
                  })
              })

              draft.columns = newColumns
              return draft
            })
          )
        } catch {
          /* empty */
        }
      },
    }),
    deleteDealBoardColumn: builder.mutation<
      IGenericResponse<unknown>,
      { boardId: string; id: string }
    >({
      query: ({ id }) => ({
        url: `BoardColumns/${id}`,
        method: 'DELETE',
        responseHandler: 'content-type',
      }),
      async onQueryStarted({ boardId, id }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled

          dispatch(
            dealsBoardsApi.util.updateQueryData('getDealBoard', boardId, (draft) => {
              const { columns, columnsOrder } = draft

              const newColumns = {}
              Object.keys(columns).forEach((key) => {
                if (key !== id)
                  Object.assign(newColumns, {
                    [key]: {
                      id: columns[key].id,
                      columnTitle: columns[key].columnTitle,
                      deals: columns[key].deals,
                    },
                  })
              })
              const newColumnsOrder = columnsOrder.filter((column) => column !== id)

              draft.columns = newColumns
              draft.columnsOrder = newColumnsOrder
              return draft
            })
          )
        } catch {
          /* empty */
        }
      },
    }),
    presistColumnOrder: builder.mutation<
      IGenericResponse<unknown>,
      { id: string; order: number; boardId: string }
    >({
      query: ({ id, order }) => ({
        url: 'BoardColumns',
        method: 'PUT',
        body: { id, order: order + 1 },
        responseHandler: 'content-type',
      }),
      async onQueryStarted({ id, boardId, order }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled

          dispatch(
            dealsBoardsApi.util.updateQueryData('getDealBoard', boardId, (draft) => {
              const { columnsOrder } = draft

              const activeIndex = columnsOrder.indexOf(id)
              const newColumnsOrder = arrayMove(columnsOrder, activeIndex, order)

              draft.columnsOrder = newColumnsOrder
              return draft
            })
          )
        } catch {
          /* empty */
        }
      },
    }),
    getDeal: builder.query<IGenericResponse<Deal>, string>({
      query: (id) => `Deals/${id}`,
    }),
    createDeal: builder.mutation<
      IGenericResponse<{
        assignedTo: null
        createdBy: string
        dealComments: []
        description: string
        id: string
        lastUpdatedBy: null
        leads: []
        potentialDealValue: number
        successProbability: number
        tags: string
        title: string
        type: number
      }>,
      Partial<Deal> & { columnId: string; boardId: string }
    >({
      query: (data) => ({
        url: 'Deals',
        method: 'POST',
        body: data,
        responseHandler: 'content-type',
      }),
      async onQueryStarted({ boardId, columnId }, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled

          dispatch(
            dealsBoardsApi.util.updateQueryData('getDealBoard', boardId, (draft) => {
              const { columns, deals } = draft

              const newColumns = columns
              newColumns[columnId].deals.push(data.id)

              const newDeals = deals
              Object.assign(newDeals, { [data.id]: data })

              draft.columns = newColumns
              draft.deals = newDeals

              return draft
            })
          )
        } catch {
          /* empty */
        }
      },
    }),
    editDeal: builder.mutation<IGenericResponse<boolean>, Deal & { boardId: string }>({
      query: ({ id, ...data }) => ({
        url: `Deals/${id}`,
        method: 'PUT',
        body: data,
        responseHandler: 'content-type',
      }),
      async onQueryStarted({ boardId, id, ...data }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled

          dispatch(
            dealsBoardsApi.util.updateQueryData('getDealBoard', boardId, (draft) => {
              const { deals } = draft

              const newDeals = deals
              Object.assign(newDeals, { [id]: { ...deals[id], ...data } })

              draft.deals = newDeals

              return draft
            })
          )
        } catch {
          /* empty */
        }
      },
    }),

    changeDealsColums: builder.mutation<
      IGenericResponse<boolean>,
      { id: string; columnId: string; boardId: string }
    >({
      query: ({ id, ...data }) => ({
        url: `Deals/Column/${id}`,
        method: 'PUT',
        body: data,
        responseHandler: 'content-type',
      }),
      async onQueryStarted({ boardId, id, columnId }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled

          dispatch(
            dealsBoardsApi.util.updateQueryData('getDealBoard', boardId, (draft) => {
              const { columns } = draft

              const newColumns = columns

              let oldColumnId = ''

              Object.keys(columns).forEach((column) => {
                if (columns[column].deals.includes(id)) oldColumnId = columns[column].id.toString()
              })

              Object.assign(newColumns, {
                [oldColumnId]: {
                  ...newColumns[oldColumnId],
                  deals: [...newColumns[oldColumnId].deals.filter((dealId) => dealId !== id)],
                },
              })
              Object.assign(newColumns, {
                [columnId]: { ...newColumns[columnId], deals: [...newColumns[columnId].deals, id] },
              })

              draft.columns = newColumns

              return draft
            })
          )
        } catch {
          /* empty */
        }
      },
    }),
    deleteDeal: builder.mutation<IGenericResponse<unknown>, { dealId: string; boardId: string }>({
      query: ({ dealId }) => ({
        url: `Deals/${dealId}`,
        method: 'DELETE',
        responseHandler: 'content-type',
      }),
      async onQueryStarted({ dealId, boardId }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled

          dispatch(
            dealsBoardsApi.util.updateQueryData('getDealBoard', boardId, (draft) => {
              const { columns, deals } = draft

              const newDeals = {}
              Object.keys(deals).forEach((key) => {
                if (key !== dealId)
                  Object.assign(newDeals, {
                    [key]: {
                      id: deals[key].id,
                      title: deals[key].title,
                      successProbability: deals[key].successProbability,
                      potentialDealValue: deals[key].potentialDealValue,
                    },
                  })
              })

              const newColumns = columns
              let columnId = ''
              Object.keys(columns).forEach((key) => {
                if (columns[key].deals.includes(dealId)) columnId = key
              })
              newColumns[columnId].deals.filter((deal) => deal === dealId)

              draft.columns = newColumns
              draft.deals = newDeals

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
  useGetDealBoardsQuery,
  useGetDealBoardQuery,
  useGetDealQuery,
  // Mutations
  useCreateDealBoardMutation,
  useEditDealBoardTitleMutation,
  useDeleteDealBoardMutation,
  useCreateDealBoardColumnMutation,
  useEditDealBoardColumnMutation,
  useDeleteDealBoardColumnMutation,
  usePresistColumnOrderMutation,
  useCreateDealMutation,
  useEditDealMutation,
  useChangeDealsColumsMutation,
  useDeleteDealMutation,
  useMakeFailureColumnMutation,
  useMakeNormalColumnMutation,
  useMakeSuccessColumnMutation,
  util: { getRunningQueriesThunk, invalidateTags },
} = dealsBoardsApi

// export endpoints for use in SSR
export const { getDealBoards, getDealBoard, getDeal } = dealsBoardsApi.endpoints
export default dealsBoardsApi
