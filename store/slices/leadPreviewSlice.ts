/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
// types

import { Lead } from "types"

interface LeadPreview {
  lead: Lead | null
  isOpen: boolean
}

const initialState: LeadPreview = {
  lead: null,
  isOpen: false,
}

const leadPreviewSlice = createSlice({
  name: "leadPreview",
  initialState,
  reducers: {
    previewLead: (state, action: PayloadAction<Lead>) => {
      state.isOpen = true
      state.lead = action.payload
    },
    closePreviewLead: (state) => {
      state.isOpen = false
      state.lead = null
    },
  },
})

export const { closePreviewLead, previewLead } = leadPreviewSlice.actions

export default leadPreviewSlice
