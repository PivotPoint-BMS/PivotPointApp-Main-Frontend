/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
// types

import { Supplier } from 'types'

interface SupplierPreview {
  supplier: Supplier | null
  isOpen: boolean
}

const initialState: SupplierPreview = {
  supplier: null,
  isOpen: false,
}

const supplierPreviewSlice = createSlice({
  name: 'supplierPreview',
  initialState,
  reducers: {
    previewSupplier: (state, action: PayloadAction<Supplier>) => {
      state.isOpen = true
      state.supplier = action.payload
    },
    closePreviewSupplier: (state) => {
      state.isOpen = false
      state.supplier = null
    },
  },
})

export const { closePreviewSupplier, previewSupplier } = supplierPreviewSlice.actions

export default supplierPreviewSlice
