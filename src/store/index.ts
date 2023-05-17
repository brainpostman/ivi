import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authModalSlice } from './slices/authModal.slice'

const rootReducer = combineReducers({
  [authModalSlice.name]: authModalSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
