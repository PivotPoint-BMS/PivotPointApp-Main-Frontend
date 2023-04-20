/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
// types

import { Contact } from 'types'

interface ContactPreview {
  contact: Contact | null
  isOpen: boolean
}

const initialState: ContactPreview = {
  contact: null,
  isOpen: false,
}

const contactPreviewSlice = createSlice({
  name: 'contactPreview',
  initialState,
  reducers: {
    previewContact: (state, action: PayloadAction<Contact>) => {
      state.isOpen = true
      state.contact = action.payload
    },
    closePreviewContact: (state) => {
      state.isOpen = false
      state.contact = null
    },
  },
})

export const { closePreviewContact, previewContact } = contactPreviewSlice.actions

export default contactPreviewSlice
