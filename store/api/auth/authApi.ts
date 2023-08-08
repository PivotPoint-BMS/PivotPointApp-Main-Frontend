import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { HYDRATE } from "next-redux-wrapper"
// actions
import { setError, setUser, startLoading } from "store/slices/sessionSlice"
// types
import {
  IGenericError,
  IGenericResponse,
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
  SessionUser,
} from "types"
// config
import { PIVOTPOINT_API } from "config"
import { RootState } from "store"

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: `${PIVOTPOINT_API.baseUrl}/identity/Authentication/`,
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
  tagTypes: [],
  endpoints: (builder) => ({
    login: builder.mutation<SessionUser, LoginInput>({
      query: (data) => ({
        url: "Login",
        method: "POST",
        body: data,
        responseHandler: "content-type",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(startLoading())
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data))
        } catch (err) {
          dispatch(setError("Error fetching user!"))
        }
      },
    }),
    register: builder.mutation<string[], RegisterInput>({
      query: (data) => ({
        url: "Register",
        method: "POST",
        body: data,
        responseHandler: "content-type",
      }),
    }),
    getUser: builder.mutation<SessionUser, string>({
      query: (refreshToken) => ({
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
        url: "RefreshToken",
        method: "GET",
        responseHandler: "content-type",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(startLoading())
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data))
        } catch (err) {
          dispatch(setError("Error fetching user!"))
        }
      },
    }),
    resetPassword: builder.mutation<IGenericResponse<unknown>, ResetPasswordInput>({
      query: (data) => ({
        url: "ResetPassword",
        method: "POST",
        body: data,
        responseHandler: "content-type",
      }),
    }),
    changePassword: builder.mutation<IGenericResponse<unknown>, ResetPasswordInput>({
      query: (data) => ({
        url: "ChangePassword",
        method: "PUT",
        body: data,
        responseHandler: "content-type",
      }),
      transformErrorResponse: (response: IGenericError) => ({ error: response }),
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUserMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  util: { getRunningQueriesThunk },
} = authApi

// export endpoints for use in SSR
export const { login, register, getUser, resetPassword } = authApi.endpoints
