/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getItem, setItem } from 'utils/localStorage'

interface ThemeSettings {
  themeLayout: 'vertical' | 'horizontal' | 'double'
  themeColor: string
}

const initialState: ThemeSettings = {
  themeLayout: getItem('themeLayout') as 'vertical' | 'horizontal' | 'double',
  themeColor: 'green',
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setThemeLayout: (state, action: PayloadAction<'vertical' | 'horizontal' | 'double'>) => {
      setItem('themeLayout', action.payload)
      state.themeLayout = action.payload
    },
    setThemeColor: (state, action: PayloadAction<string>) => {
      state.themeColor = action.payload
    },
  },
})

export const { setThemeColor, setThemeLayout } = settingsSlice.actions

export default settingsSlice
