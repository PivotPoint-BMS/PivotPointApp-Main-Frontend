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
  }[]
  years: number
}

export interface StepTwoState {
  turnOverSources: {
    source: string
    contributions: number[]
  }[]
}

export interface StepThreeState {
  inventorySources: {
    inventory: string
    costs: number[]
    isRawMaterials: boolean
  }[]
}

export interface StepFourState {
  peronnelCosts: number[]
}

export interface StepFiveState {
  investements: {
    investement: string
    amount: number
    yearsOfUse: number
    physical: boolean
  }[]
}

export interface StepSixState {
  expenses: {
    expense: string
    expectedCosts: number[]
    isFixedCharge: boolean
    isDeletable: boolean
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
    setStepOne: builder.mutation<IGenericResponse<unknown>, StepOneState>({
      query: (data) => ({
        url: 'QuickSetup/Step1',
        method: 'POST',
        body: data,
        responseHandler: 'content-type',
      }),
      invalidatesTags: ['StepOne'],
    }),
    getStepTwo: builder.query<IGenericResponse<StepTwoState>, void>({
      query: () => 'QuickSetup/Step2',
      providesTags: ['StepTwo'],
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
    getStepThree: builder.query<IGenericResponse<StepThreeState>, void>({
      query: () => 'QuickSetup/Step3',
      providesTags: ['StepThree'],
    }),
    setStepThree: builder.mutation<IGenericResponse<unknown>, StepThreeState>({
      query: (data) => ({
        url: 'QuickSetup/Step3',
        method: 'POST',
        body: data,
        responseHandler: 'content-type',
      }),
      invalidatesTags: ['StepThree'],
    }),
    getStepFour: builder.query<IGenericResponse<StepFourState>, void>({
      query: () => 'QuickSetup/Step4',
      providesTags: ['StepFour'],
    }),
    setStepFour: builder.mutation<IGenericResponse<unknown>, StepFourState>({
      query: (data) => ({
        url: 'QuickSetup/Step4',
        method: 'POST',
        body: data,
        responseHandler: 'content-type',
      }),
      invalidatesTags: ['StepFour'],
    }),
    getStepFive: builder.query<IGenericResponse<StepFiveState>, void>({
      query: () => 'QuickSetup/Step5',
      providesTags: ['StepFive'],
    }),
    setStepFive: builder.mutation<IGenericResponse<unknown>, StepFiveState>({
      query: (data) => ({
        url: 'QuickSetup/Step5',
        method: 'POST',
        body: data,
        responseHandler: 'content-type',
      }),
      invalidatesTags: ['StepFive'],
    }),
    getStepSix: builder.query<IGenericResponse<StepSixState>, void>({
      query: () => 'QuickSetup/Step6',
      providesTags: ['StepSix'],
    }),
    setStepSix: builder.mutation<IGenericResponse<unknown>, StepSixState>({
      query: (data) => ({
        url: 'QuickSetup/Step6',
        method: 'POST',
        body: data,
        responseHandler: 'content-type',
      }),
      invalidatesTags: ['StepSix'],
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  // Queries
  useGetStepOneQuery,
  useGetStepTwoQuery,
  useGetStepThreeQuery,
  useGetStepFourQuery,
  useGetStepFiveQuery,
  useGetStepSixQuery,
  // Mutations
  useSetStepOneMutation,
  useSetStepTwoMutation,
  useSetStepThreeMutation,
  useSetStepFourMutation,
  useSetStepFiveMutation,
  useSetStepSixMutation,
  util: { getRunningQueriesThunk, invalidateTags },
} = financeSetupApi

// export endpoints for use in SSR
export const { getStepOne } = financeSetupApi.endpoints
