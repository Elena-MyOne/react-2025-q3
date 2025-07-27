export interface CharactersData {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: null;
  };
  results: CharacterData[];
}

export interface CharacterData {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}
