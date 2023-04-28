import { configureStore } from '@reduxjs/toolkit';
import authModalSlice from './reducers/authModalReducer';

export const store = configureStore({
    reducer: {
        authModal: authModalSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
