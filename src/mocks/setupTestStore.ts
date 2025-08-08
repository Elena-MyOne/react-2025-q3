import { configureStore } from '@reduxjs/toolkit';
import selectedItemsSlice from '../redux/slices/selectedItemsSlice';

export function setupTestStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      selectedItems: selectedItemsSlice,
    },
    preloadedState,
  });
}
