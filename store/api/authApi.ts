import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
// actions
import { setError, setUser, startLoading } from 'store/slices/sessionSlice'
// types
import { IGenericResponse, LoginInput, RegisterInput, ResetPasswordInput, SessionUser } from 'types'
// config
import { PIVOTPOINT_API } from 'config'

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: `${PIVOTPOINT_API.baseUrl}/identity/Authentication/`,
  }),
  // eslint-disable-next-line consistent-return
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    login: builder.mutation<SessionUser, LoginInput>({
      query: (data) => ({
        url: 'Login',
        method: 'POST',
        body: data,
        responseHandler: 'content-type',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(startLoading())
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data))
        } catch (err) {
          dispatch(setError('Error fetching user!'))
        }
      },
    }),
    register: builder.mutation<string[], RegisterInput>({
      query: (data) => ({
        url: 'Register',
        method: 'POST',
        body: data,
        responseHandler: 'content-type',
      }),
    }),
    getUser: builder.mutation<SessionUser, string>({
      query: (refreshToken) => ({
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
        url: 'RefreshToken',
        method: 'GET',
        responseHandler: 'content-type',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(startLoading())
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data))
        } catch (err) {
          dispatch(setError('Error fetching user!'))
        }
      },
    }),
    resetPassword: builder.mutation<IGenericResponse, ResetPasswordInput>({
      query: (data) => ({
        url: 'ResetPassword',
        method: 'POST',
        body: data,
        responseHandler: 'content-type',
      }),
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUserMutation,
  useResetPasswordMutation,
  util: { getRunningQueriesThunk },
} = authApi

// export endpoints for use in SSR
export const { login, register, getUser, resetPassword } = authApi.endpoints
