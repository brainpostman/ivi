import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type languageType = 'ru' | 'en';

const initialState = {
    language: 'ru' as languageType,
};

export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        changeLanguage: (state, action: PayloadAction<languageType>) => {
            state.language = action.payload;
        },
    },
});

export default languageSlice.reducer;

export const languageActions = languageSlice.actions;
