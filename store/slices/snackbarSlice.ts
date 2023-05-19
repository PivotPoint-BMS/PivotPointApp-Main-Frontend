/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
// types
import { SnackbarOptions } from 'types'

interface SnackbarState {
  snackbars: SnackbarOptions[]
  side?:
    | 'top'
    | 'bottom'
    | 'right'
    | 'left'
    | 'top-left'
    | 'bottom-left'
    | 'top-right'
    | 'bottom-right'
}

const initialState: SnackbarState = {
  snackbars: [],
  side: 'bottom-left',
}

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar: (state, action: PayloadAction<Omit<SnackbarOptions, 'id'>>) => {
      state.snackbars.push({
        id: uuidv4(),
        message: action.payload.message,
        type: action.payload.type,
        autoHideDuration: action.payload.autoHideDuration,
        variant: action.payload.variant,
        closeButton: action.payload.closeButton,
      })
    },
    closeSnackbar: (state, action: PayloadAction<string>) => {
      state.snackbars = state.snackbars.filter(({ id }) => id !== action.payload)
    },
  },
})

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions

export default snackbarSlice
