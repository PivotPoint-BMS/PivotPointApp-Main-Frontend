/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
// types
import { SnackbarOptions } from 'types'

interface SnackbarState extends SnackbarOptions {
  isOpen: boolean
}

const initialState: SnackbarState = {
  message: '',
  isOpen: false,
  type: 'info',
  side: 'bottom-left',
  variant: 'contained',
}

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar: (state, action: PayloadAction<SnackbarOptions>) => {
      state.isOpen = true
      state.message = action.payload.message
      state.type = action.payload.type
      state.autoHideDuration = action.payload.autoHideDuration
      state.side = action.payload.side
      state.variant = action.payload.variant
    },
    closeSnackbar: (state) => {
      state.isOpen = false
      state.message = ''
    },
  },
})

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions

export default snackbarSlice
