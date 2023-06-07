/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
// types
import { Vehicule } from 'types'

interface VehiculePreview {
  vehicule: Vehicule | null
  isOpen: boolean
}

const initialState: VehiculePreview = {
  vehicule: null,
  isOpen: false,
}

const vehiculePreviewSlice = createSlice({
  name: 'vehiculePreview',
  initialState,
  reducers: {
    previewVehicule: (state, action: PayloadAction<Vehicule>) => {
      state.isOpen = true
      state.vehicule = action.payload
    },
    closePreviewVehicule: (state) => {
      state.isOpen = false
      state.vehicule = null
    },
  },
})

export const { closePreviewVehicule, previewVehicule } = vehiculePreviewSlice.actions

export default vehiculePreviewSlice
