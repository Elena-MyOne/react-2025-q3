import { configureStore } from '@reduxjs/toolkit';
import selectedItemsSlice from './slices/selectedItemsSlice';
import charactersSlice from './slices/charactersSlice';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsSlice,
    characters: charactersSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
