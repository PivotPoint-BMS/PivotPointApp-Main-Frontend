/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface PagginationProps {
  PageSize: number
  PageNumber: number
}

const initialState: PagginationProps = {
  PageNumber: 1,
  PageSize: 10,
}

const pagginationSlice = createSlice({
  name: 'paggination',
  initialState,
  reducers: {
    changePageSize: (state, action: PayloadAction<number>) => {
      state.PageSize = action.payload
    },
    changePageNumber: (state, action: PayloadAction<number>) => {
      state.PageNumber = action.payload
    },
    resetPaggination: (state) => {
      state.PageNumber = 1
    },
  },
})

export const { changePageNumber, changePageSize, resetPaggination } = pagginationSlice.actions

export default pagginationSlice
