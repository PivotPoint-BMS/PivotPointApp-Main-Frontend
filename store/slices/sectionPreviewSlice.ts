/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
// types

interface SectionPreview {
  sectionId: string | null
  isOpen: boolean
}

const initialState: SectionPreview = {
  sectionId: null,
  isOpen: false,
}

const sectionPreviewSlice = createSlice({
  name: "sectionPreview",
  initialState,
  reducers: {
    previewSection: (state, action: PayloadAction<string>) => {
      state.isOpen = true
      state.sectionId = action.payload
    },
    closePreviewSection: (state) => {
      state.isOpen = false
      state.sectionId = null
    },
  },
})

export const { closePreviewSection, previewSection } = sectionPreviewSlice.actions

export default sectionPreviewSlice
