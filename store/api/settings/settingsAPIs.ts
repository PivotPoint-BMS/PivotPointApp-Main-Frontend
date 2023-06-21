import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
// config
import { PIVOTPOINT_API } from 'config'
// store
import { RootState } from 'store'
import {
  APISettings,
  CompanyDetails,
  IGenericResponse,
  NotificationsSettings,
  SMTPSettings,
  UserDetails,
} from 'types'

export const settingsApi = createApi({
  reducerPath: 'settingsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${PIVOTPOINT_API.baseUrl}/identity`,
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
    getUserDetails: builder.query<IGenericResponse<UserDetails>, void>({
      query: () => 'ProfileSettings/details',
      providesTags: ['UserDetails'],
    }),
    getNotifficationsSettings: builder.query<IGenericResponse<NotificationsSettings>, void>({
      query: () => 'ProfileSettings/notifications',
    }),
    getCompanyDetails: builder.query<IGenericResponse<CompanyDetails>, void>({
      query: () => 'OrganisationSettings/Details',
    }),
    getSMTPSettings: builder.query<IGenericResponse<SMTPSettings>, void>({
      query: () => 'OrganisationSettings/SMTP',
    }),
    getApiKey: builder.query<IGenericResponse<APISettings>, void>({
      query: () => 'OrganisationSettings/APIKey',
    }),
    updateImage: builder.mutation<IGenericResponse<boolean>, FormData>({
      query: (data) => ({
        url: 'ProfileSettings/image',
        method: 'POST',
        body: data,
        responseHandler: 'content-type',
      }),
      invalidatesTags: ['UserDetails'],
    }),
    updateUserDetails: builder.mutation<IGenericResponse<boolean>, Omit<UserDetails, 'email'>>({
      query: (data) => ({
        url: 'ProfileSettings/details',
        method: 'PUT',
        body: data,
        responseHandler: 'content-type',
      }),
      invalidatesTags: ['UserDetails'],
    }),
    updateNotificationsSettings: builder.mutation<IGenericResponse<boolean>, NotificationsSettings>(
      {
        query: (data) => ({
          url: 'ProfileSettings/notifications',
          method: 'PUT',
          body: data,
          responseHandler: 'content-type',
        }),
      }
    ),
    updateCompanyDetails: builder.mutation<IGenericResponse<boolean>, FormData>({
      query: (data) => ({
        url: 'OrganisationSettings/Details',
        method: 'POST',
        body: data,
        responseHandler: 'content-type',
      }),
    }),
    updateSMTPSettings: builder.mutation<IGenericResponse<boolean>, SMTPSettings>({
      query: (data) => ({
        url: 'OrganisationSettings/SMTP',
        method: 'POST',
        body: data,
        responseHandler: 'content-type',
      }),
    }),
    generateKey: builder.mutation<IGenericResponse<APISettings>, void>({
      query: () => ({
        url: 'OrganisationSettings/APIKey',
        method: 'POST',
        responseHandler: 'content-type',
      }),
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  // Queries
  useGetApiKeyQuery,
  useGetUserDetailsQuery,
  useGetSMTPSettingsQuery,
  useGetCompanyDetailsQuery,
  useGetNotifficationsSettingsQuery,
  // Mutations
  useUpdateImageMutation,
  useGenerateKeyMutation,
  useUpdateUserDetailsMutation,
  useUpdateSMTPSettingsMutation,
  useUpdateCompanyDetailsMutation,
  useUpdateNotificationsSettingsMutation,
  util: { getRunningQueriesThunk },
} = settingsApi

// export endpoints for use in SSR
export const { getUserDetails } = settingsApi.endpoints
