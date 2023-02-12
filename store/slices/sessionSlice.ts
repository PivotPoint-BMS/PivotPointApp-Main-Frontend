/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// types
import { User } from 'types'
import { getTemporaryItem, removeFromLocalStorage, setTemporaryItem } from 'utils/localStorage'

interface Session {
  user: User | null
  isAuthenticated: boolean
  token: string | null
  isLoading: boolean
  error: string | null
}

const initialState: Session = {
  user: null,
  isAuthenticated: false,
  token: getTemporaryItem('token') as string,
  isLoading: false,
  error: null,
}

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true
    },
    setUser: (state, action: PayloadAction<User>) => {
      setTemporaryItem('token', action.payload.token, 60 * 24 /** 24H */)
      state.isLoading = false
      state.user = action.payload
      state.token = action.payload.token
      state.error = null
    },
    setError: (state, action: PayloadAction<string>) => {
      removeFromLocalStorage('token')
      state.error = action.payload
      state.isLoading = false
      state.user = null
    },
  },
})

export const { startLoading, setUser, setError } = sessionSlice.actions

export default sessionSlice
