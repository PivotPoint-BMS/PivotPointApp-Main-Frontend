/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
// config
import { PIVOTPOINT_API } from 'config'
// types
import { ListGenericResponse, Vehicule, RequestParams, IGenericResponse } from 'types'
// store
import { RootState } from 'store'
import RequestSearchParams from 'types/RequestSearchParams'
// import { assign } from 'lodash'

export const vehiculesApi = createApi({
  reducerPath: 'vehiculesApi',
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
    getVehicules: builder.query<ListGenericResponse<Vehicule[]>, RequestSearchParams>({
      query: (params) => ({
        url: '/Vehicules',
        params,
      }),
    }),
    getVehicule: builder.query<IGenericResponse<Vehicule>, string>({
      query: (id) => `Vehicules/${id}`,
    }),
    createVehicule: builder.mutation<
      ListGenericResponse<Vehicule>,
      Omit<Vehicule, 'id'> & RequestParams
    >({
      query: (data) => ({
        url: 'Vehicules',
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
            vehiculesApi.util.updateQueryData(
              'getVehicules',
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
    editVehicule: builder.mutation<
      ListGenericResponse<Vehicule>,
      { data: Omit<Vehicule, 'id'>; id: string } & RequestParams
    >({
      query: ({ data, id }) => ({
        url: `Vehicules/${id}`,
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
            vehiculesApi.util.updateQueryData(
              'getVehicules',
              { PageNumber, PageSize },
              (draftedList) => {
                Object.assign(draftedList.data.find((item) => item.id === id)!, data)
                return draftedList
              }
            )
          )

          dispatch(
            vehiculesApi.util.updateQueryData('getVehicule', id, (draft) => {
              Object.assign(draft.data, data)
            })
          )
        } catch {
          /* empty */
        }
      },
    }),
    deleteVehicule: builder.mutation<ListGenericResponse<Vehicule>, { id: string } & RequestParams>(
      {
        query: ({ id }) => ({
          url: `Vehicules/${id}`,
          method: 'DELETE',
          responseHandler: 'content-type',
        }),
        async onQueryStarted({ id, PageNumber, PageSize }, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled
            dispatch(
              vehiculesApi.util.updateQueryData(
                'getVehicules',
                { PageNumber, PageSize },
                (draftedList) => ({
                  ...draftedList,
                  data: draftedList.data.filter((vehicules) => vehicules.id !== id),
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
  useGetVehiculeQuery,
  useGetVehiculesQuery,
  // Mutations
  useEditVehiculeMutation,
  useCreateVehiculeMutation,
  useDeleteVehiculeMutation,
  util: { getRunningQueriesThunk, invalidateTags },
} = vehiculesApi

// export endpoints for use in SSR
export const { getVehicule, getVehicules } = vehiculesApi.endpoints
