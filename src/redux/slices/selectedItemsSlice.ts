import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CharacterData } from '../../models/interfaces';
import type { RootState } from '../store';

export interface SelectedItemsState {
  selectedItems: CharacterData[];
}

const initialState: SelectedItemsState = {
  selectedItems: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    setSelectedItems(state, action: PayloadAction<CharacterData[]>) {
      state.selectedItems = action.payload;
    },
  },
});

export default selectedItemsSlice.reducer;

export const { setSelectedItems } = selectedItemsSlice.actions;

export const selectSelectedItems = (state: RootState): SelectedItemsState =>
  state.selectedItems;
