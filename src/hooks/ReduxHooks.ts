import { authModalActions } from '@/store/slices/authModal.slice'
import { bindActionCreators } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import { filtersSlice } from '@/store/slices/filters.slice'

export const useTypedDispatch: () => AppDispatch = useDispatch
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

const allActions = {
  ...authModalActions,
  ...filtersSlice.actions,
}

export const useActions = () => {
  const dispatch = useTypedDispatch()

  return bindActionCreators(allActions, dispatch)
}
