import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../consts';
import type { CharactersData } from '../../models/interfaces';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCharactersList: builder.query<
      CharactersData,
      { page?: number; name?: string }
    >({
      query: ({ page, name }) => {
        let queryString = 'character';
        if (page) {
          queryString = `character?page=${page}`;
        }
        if (name && page) {
          queryString = `character?page=${page}&name=${name}`;
        }
        return queryString;
      },
    }),
    getCharacterById: builder.query<CharacterData, string>({
      query: (id) => `character/${id}`,
    }),
  }),
});

export const { useGetCharactersListQuery, useGetCharacterByIdQuery } = apiSlice;
