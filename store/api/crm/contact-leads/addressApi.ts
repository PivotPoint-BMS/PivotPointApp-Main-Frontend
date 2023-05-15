import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
// config
import { PIVOTPOINT_API } from 'config'
// types
import { IGenericResponse } from 'types'
// store
import { RootState } from 'store'

export const addressApi = createApi({
  reducerPath: 'addressApi',
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
  tagTypes: ['Countries', 'Cities'],
  endpoints: (builder) => ({
    getCountries: builder.query<IGenericResponse<string[]>, void>({
      query: () => 'Address/Country',
      providesTags: [{ type: 'Countries', id: 'LIST' }],
    }),
    getCities: builder.query<IGenericResponse<string[]>, string>({
      query: (country) => `Address/City/${country}`,
      providesTags: [{ type: 'Cities', id: 'LIST' }],
    }),
    // createLead: builder.mutation<string[], FormData>({
    //   query: (data) => ({
    //     url: 'Lead',
    //     method: 'POST',
    //     body: data,
    //     responseHandler: 'content-type',
    //   }),
    //   invalidatesTags: ['Leads', 'Lead'],
    // }),
  }),
})

// Export hooks for usage in functional components
export const {
  // Queries
  useGetCountriesQuery,
  useGetCitiesQuery,
  // Mutations

  util: { getRunningQueriesThunk, invalidateTags },
} = addressApi

// export endpoints for use in SSR
export const { getCountries } = addressApi.endpoints
