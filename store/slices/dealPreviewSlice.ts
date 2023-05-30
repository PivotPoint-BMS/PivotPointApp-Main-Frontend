/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
// types

interface DealPreview {
  dealId: string | null
  isOpen: boolean
}

const initialState: DealPreview = {
  dealId: null,
  isOpen: false,
}

const dealPreviewSlice = createSlice({
  name: 'dealPreview',
  initialState,
  reducers: {
    previewDeal: (state, action: PayloadAction<string>) => {
      state.isOpen = true
      state.dealId = action.payload
    },
    closePreviewDeal: (state) => {
      state.isOpen = false
      state.dealId = null
    },
  },
})

export const { closePreviewDeal, previewDeal } = dealPreviewSlice.actions

export default dealPreviewSlice
