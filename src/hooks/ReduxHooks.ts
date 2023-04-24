import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { bindActionCreators } from '@reduxjs/toolkit';
import { authModalActions } from '@/store/reducers/authModalReducer';

export const useTypedDispatch: () => AppDispatch = useDispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const allActions = {
    ...authModalActions,
};

export const useActions = () => {
    const dispatch = useTypedDispatch();

    return bindActionCreators(allActions, dispatch);
};
