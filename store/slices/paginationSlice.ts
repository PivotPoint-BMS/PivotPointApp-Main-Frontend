/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface paginationProps {
  PageSize: number
  PageNumber: number
}

const initialState: paginationProps = {
  PageNumber: 1,
  PageSize: 10,
}

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    changePageSize: (state, action: PayloadAction<number>) => {
      state.PageSize = action.payload
    },
    changePageNumber: (state, action: PayloadAction<number>) => {
      state.PageNumber = action.payload
    },
    resetpagination: (state) => {
      state.PageNumber = 1
    },
  },
})

export const { changePageNumber, changePageSize, resetpagination } = paginationSlice.actions

export default paginationSlice
