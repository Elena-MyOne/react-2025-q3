import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CharacterData } from '../../models/interfaces';
import type { RootState } from '../store';

export interface CharactersState {
  savedValue: string;
  characters: CharacterData[];
  pages: number;
  currentPage: number;
  nextPage: string | null;
  prevPage: string | null;
}

const initialState: CharactersState = {
  savedValue: '',
  characters: [],
  pages: 0,
  currentPage: 1,
  nextPage: null,
  prevPage: null,
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setSavedValue(state, action: PayloadAction<string>) {
      state.savedValue = action.payload;
    },
    setCharacters(state, action: PayloadAction<CharacterData[]>) {
      state.characters = action.payload;
    },
    setPages(state, action: PayloadAction<number>) {
      state.pages = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setNextPage(state, action: PayloadAction<string | null>) {
      state.nextPage = action.payload;
    },
    setPrevPage(state, action: PayloadAction<string | null>) {
      state.prevPage = action.payload;
    },
  },
});

export const selectCharacters = (state: RootState): CharactersState =>
  state.characters;

export const {
  setSavedValue,
  setCharacters,
  setPages,
  setCurrentPage,
  setNextPage,
  setPrevPage,
} = charactersSlice.actions;
export default charactersSlice.reducer;
