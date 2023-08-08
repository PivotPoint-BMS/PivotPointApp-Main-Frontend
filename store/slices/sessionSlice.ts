/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// types
import { SessionUser } from "types"
import { getItem, removeFromLocalStorage, setItem } from "utils/localStorage"

interface Session {
  user: SessionUser | null
  isAuthenticated: boolean
  token: string | null
  refreshToken: string | null
  isLoading: boolean
  error: string | null
}

const initialState: Session = {
  user: null,
  isAuthenticated: false,
  token: null,
  refreshToken: getItem("refreshToken") as string,
  isLoading: true,
  error: null,
}

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true
    },
    stopLoading: (state) => {
      state.isLoading = false
    },
    setUser: (state, action: PayloadAction<SessionUser>) => {
      setItem("refreshToken", action.payload.refreshToken)
      state.isLoading = false
      state.user = action.payload
      state.token = action.payload.token
      state.refreshToken = action.payload.refreshToken
      state.isAuthenticated = true
      state.error = null
    },
    setError: (state, action: PayloadAction<string>) => {
      removeFromLocalStorage("refreshToken")
      state.error = action.payload
      state.isLoading = false
      state.user = null
    },
    logout: (state) => {
      removeFromLocalStorage("refreshToken")
      state.error = null
      state.isAuthenticated = false
      state.isLoading = false
      state.refreshToken = null
      state.token = null
      state.user = null
    },
  },
})

export const { startLoading, stopLoading, setUser, setError, logout } = sessionSlice.actions

export default sessionSlice
