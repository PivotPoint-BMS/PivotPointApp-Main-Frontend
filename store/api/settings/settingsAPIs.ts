import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
// config
import { PIVOTPOINT_API } from 'config'
// store
import { RootState } from 'store'
import { UserDetails, UserDetailsResponse } from 'types'

export const settingsApi = createApi({
  reducerPath: 'settingsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${PIVOTPOINT_API.baseUrl}/identity/ProfileSettings`,
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
  tagTypes: ['UserDetails'],
  endpoints: (builder) => ({
    getUserDetails: builder.query<UserDetailsResponse, void>({
      query: () => 'details',
      providesTags: ['UserDetails'],
    }),
    updateImage: builder.mutation<string[], FormData>({
      query: (data) => ({
        url: 'image',
        method: 'POST',
        body: data,
        responseHandler: 'content-type',
      }),
      invalidatesTags: ['UserDetails'],
    }),
    updateUserDetails: builder.mutation<string[], Omit<UserDetails, 'email'>>({
      query: (data) => ({
        url: 'details',
        method: 'PUT',
        body: data,
        responseHandler: 'content-type',
      }),
      invalidatesTags: ['UserDetails'],
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useGetUserDetailsQuery,
  useUpdateImageMutation,
  useUpdateUserDetailsMutation,
  util: { getRunningQueriesThunk },
} = settingsApi

// export endpoints for use in SSR
export const { getUserDetails } = settingsApi.endpoints
