import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
// config
import { PIVOTPOINT_API } from 'config'
// types
import { IGenericResponse } from 'types'
// store
import { RootState } from 'store'

export interface StepOneState {
  financements: {
    source: string
    amount: number | string
    interestRate: number | string
    percentage: string
  }[]
  years: number
}

export interface StepTwoState {
  financements: {
    service: string
    values: number[]
  }[]
}

export const financeSetupApi = createApi({
  reducerPath: 'financeSetupApi',
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
  tagTypes: ['StepOne', 'StepTwo', 'StepThree', 'StepFour', 'StepFive', 'StepSix', 'StepSeven'],
  endpoints: (builder) => ({
    getStepOne: builder.query<IGenericResponse<StepOneState>, void>({
      query: () => 'QuickSetup/Step1',
      providesTags: ['StepOne'],
    }),
    getStepTwo: builder.query<IGenericResponse<StepTwoState>, void>({
      query: () => 'QuickSetup/Step2',
      providesTags: ['StepTwo'],
    }),
    setStepOne: builder.mutation<IGenericResponse<unknown>, StepOneState>({
      query: (data) => ({
        url: 'QuickSetup/Step1',
        method: 'POST',
        body: data,
        responseHandler: 'content-type',
      }),
      invalidatesTags: ['StepOne'],
    }),
    setStepTwo: builder.mutation<IGenericResponse<unknown>, StepTwoState>({
      query: (data) => ({
        url: 'QuickSetup/Step2',
        method: 'POST',
        body: data,
        responseHandler: 'content-type',
      }),
      invalidatesTags: ['StepTwo'],
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  // Queries
  useGetStepOneQuery,
  useGetStepTwoQuery,
  // Mutations
  useSetStepOneMutation,
  useSetStepTwoMutation,
  util: { getRunningQueriesThunk, invalidateTags },
} = financeSetupApi

// export endpoints for use in SSR
export const { getStepOne } = financeSetupApi.endpoints
