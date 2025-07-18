import { http, HttpResponse } from 'msw';
import { mockCharacter } from './mockCharacter';
import { mockCharactersList } from './mockCharactersList';

export const handlers = [
  http.get('https://rickandmortyapi.com/api/character/:id', ({ params }) => {
    const { id } = params;
    if (id === '2000') {
      return HttpResponse.error();
    }

    if (id === '132') {
      return HttpResponse.json(mockCharacter, { status: 200 });
    }

    return HttpResponse.json(mockCharacter, { status: 200 });
  }),

  http.get('https://rickandmortyapi.com/api/character', ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('page');

    if (query === '1000') {
      return HttpResponse.error();
    }

    if (query === '1') {
      return HttpResponse.json(mockCharactersList, { status: 200 });
    }

    return HttpResponse.json(mockCharactersList, { status: 200 });
  }),
];
