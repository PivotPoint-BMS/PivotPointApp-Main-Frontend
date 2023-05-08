/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
// types
import type { UniqueIdentifier } from '@dnd-kit/core'
import { DealBoardColumnProps, DealBoardProps } from 'types'

const initialState: DealBoardProps = {
  columns: {},
  columnsOrder: [],
  deals: {},
}

const dealsBoardSlice = createSlice({
  name: 'dealsBoard',
  initialState,
  reducers: {
    setBoard: (state, actions: PayloadAction<DealBoardProps>) => {
      state.columns = actions.payload.columns
      state.columnsOrder = actions.payload.columnsOrder
      state.deals = actions.payload.deals
    },
    persistCard: (
      state,
      actions: PayloadAction<{ [key: UniqueIdentifier]: DealBoardColumnProps }>
    ) => {
      state.columns = actions.payload
    },
    persistColumn: (state, actions: PayloadAction<UniqueIdentifier[]>) => {
      state.columnsOrder = actions.payload
    },
  },
})

export const { persistCard, persistColumn } = dealsBoardSlice.actions

export default dealsBoardSlice
