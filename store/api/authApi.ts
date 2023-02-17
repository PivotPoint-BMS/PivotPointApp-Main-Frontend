import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { IGenericResponse, RegisterInput, ResetPasswordInput } from 'types'

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://staging.pivotpointbms.com/api/identity/Authentication/',
  }),
  // eslint-disable-next-line consistent-return
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    register: builder.mutation<IGenericResponse, RegisterInput>({
      query: (data) => ({
        url: 'Register',
        method: 'POST',
        body: data,
        responseHandler: 'content-type',
      }),
    }),
    resetPassword: builder.mutation<IGenericResponse, ResetPasswordInput>({
      query: (data) => ({
        url: 'Register',
        method: 'POST',
        body: data,
        responseHandler: 'content-type',
      }),
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useRegisterMutation,
  util: { getRunningQueriesThunk },
} = authApi

// export endpoints for use in SSR
export const { register } = authApi.endpoints
