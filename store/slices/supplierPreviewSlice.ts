/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
// types

import { Supplier } from "types"

interface SupplierPreview {
  supplier: Supplier | null
  isOpen: boolean
  isEdit: boolean
}

const initialState: SupplierPreview = {
  supplier: null,
  isOpen: false,
  isEdit: false,
}

const supplierPreviewSlice = createSlice({
  name: "supplierPreview",
  initialState,
  reducers: {
    previewSupplier: (state, action: PayloadAction<Supplier>) => {
      state.isOpen = true
      state.supplier = action.payload
    },
    editSupplier: (state, action: PayloadAction<Supplier>) => {
      state.isOpen = true
      state.isEdit = true
      state.supplier = action.payload
    },
    closePreviewSupplier: (state) => {
      state.isOpen = false
      state.isEdit = false
      state.supplier = null
    },
  },
})

export const { closePreviewSupplier, previewSupplier, editSupplier } = supplierPreviewSlice.actions

export default supplierPreviewSlice
