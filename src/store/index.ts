import { configureStore } from '@reduxjs/toolkit';
import authModalSlice from './reducers/authModalReducer';
import languageSlice from './reducers/languageReducer';

export const store = configureStore({
    reducer: {
        authModal: authModalSlice,
        language: languageSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
