import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
// config
import { PIVOTPOINT_API } from 'config'
// store
import { RootState } from 'store'
import { IGenericResponse } from 'types'

export interface Root {
  negative: Negative[]
  positive: Positive[]
}

export interface Positive {
  id: string
  companyId: string
  review: string
  sentiment: string
  hadFeedback: boolean
  isCorrect: boolean
  correctAnswer: number
  created: string
}
export interface Negative {
  id: string
  companyId: string
  review: string
  sentiment: string
  hadFeedback: boolean
  isCorrect: boolean
  correctAnswer: number
  created: string
}

export const reviewsApi = createApi({
  reducerPath: 'reviewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${PIVOTPOINT_API.baseUrl}`,
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
    getReviews: builder.query<Root, void>({
      query: () => '/im/AnalysedReviews',
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  // Queries

  useGetReviewsQuery,
  // Mutations
  util: { getRunningQueriesThunk },
} = reviewsApi

// export endpoints for use in SSR
export const { getReviews } = reviewsApi.endpoints
