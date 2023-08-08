import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { HYDRATE } from "next-redux-wrapper"
// config
import { PIVOTPOINT_API } from "config"
// types
import { IGenericResponse } from "types"
import { RootState } from "store"

interface StepTwo {
  contactEmail: string
  contactPhone: string
  address: string
}

interface StepThree {
  tier: 0 | 1 | 2 | 3
}

interface StepFour {
  companyWorkers: {
    firstName: string
    lastName: string
    email: string
    position: string
  }[]
}

interface StepSix {
  stars: number
  feedback: string
}

export const companyApi = createApi({
  reducerPath: "company",
  baseQuery: fetchBaseQuery({
    baseUrl: `${PIVOTPOINT_API.baseUrl}/identity`,
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
    creationStepOne: builder.mutation<IGenericResponse<unknown>, FormData>({
      query: (data) => ({
        url: "CompanyCreation/Step1",
        method: "POST",
        body: data,
        responseHandler: "content-type",
      }),
    }),
    creationStepTwo: builder.mutation<IGenericResponse<unknown>, StepTwo>({
      query: (data) => ({
        url: "CompanyCreation/Step2",
        method: "POST",
        body: data,
        responseHandler: "content-type",
      }),
    }),
    creationStepThree: builder.mutation<IGenericResponse<unknown>, StepThree>({
      query: (data) => ({
        url: "CompanyCreation/Step3",
        method: "POST",
        body: data,
        responseHandler: "content-type",
      }),
    }),
    creationStepFour: builder.mutation<IGenericResponse<unknown>, StepFour>({
      query: (data) => ({
        url: "CompanyCreation/Step4",
        method: "POST",
        body: data,
        responseHandler: "content-type",
      }),
    }),
    creationStepFive: builder.mutation<IGenericResponse<unknown>, FormData>({
      query: (data) => ({
        url: "CompanyCreation/Step5",
        method: "POST",
        body: data,
        responseHandler: "content-type",
      }),
    }),
    creationStepSix: builder.mutation<IGenericResponse<unknown>, StepSix>({
      query: (data) => ({
        url: "CompanyCreation/Step6",
        method: "POST",
        body: data,
        responseHandler: "content-type",
      }),
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useCreationStepOneMutation,
  useCreationStepTwoMutation,
  useCreationStepThreeMutation,
  useCreationStepFourMutation,
  useCreationStepFiveMutation,
  useCreationStepSixMutation,
  util: { getRunningQueriesThunk },
} = companyApi

// export endpoints for use in SSR
// export const {} = companyApi.endpoints
