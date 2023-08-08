/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
// types
import { Vehicle } from "types"

interface VehiclePreview {
  vehicule: Vehicle | null
  isOpen: boolean
}

const initialState: VehiclePreview = {
  vehicule: null,
  isOpen: false,
}

const vehiculePreviewSlice = createSlice({
  name: "vehiculePreview",
  initialState,
  reducers: {
    previewVehicle: (state, action: PayloadAction<Vehicle>) => {
      state.isOpen = true
      state.vehicule = action.payload
    },
    closePreviewVehicle: (state) => {
      state.isOpen = false
      state.vehicule = null
    },
  },
})

export const { closePreviewVehicle, previewVehicle } = vehiculePreviewSlice.actions

export default vehiculePreviewSlice
