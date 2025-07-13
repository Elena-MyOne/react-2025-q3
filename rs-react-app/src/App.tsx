import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { LOCAL_STORAGE_VALUE } from './consts';
import type { CharactersData, CharacterData } from './models/interfaces';
import CharacterCard from './components/CharacterCard';
import Header from './components/Header';

interface AppProps {
  isLoading: boolean;
  isClichedErrorButton: boolean;
  error: Error | null | unknown;
  characters: CharacterData[];
  errorMessage: string;
}
export default class App extends React.Component<object, AppProps> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      isLoading: false,
      isClichedErrorButton: false,
      error: null,
      characters: [],
      errorMessage: '',
    };

    this.throwError = this.throwError.bind(this);
  }

  throwError() {
    this.setState({
      isClichedErrorButton: true,
    });
    console.error('Error: The Error boundary button was triggered');
  }

  async componentDidMount(): Promise<void> {
    const searchQuery = localStorage.getItem(LOCAL_STORAGE_VALUE);
    if (searchQuery) {
      // this.handleSearch();
      return;
    }

    this.getCharacters();
  }

  async getCharacters() {
    this.setState({ isLoading: true });

    try {
      const response = await fetch('https://rickandmortyapi.com/api/character');

      const data: CharactersData = await response.json();
      const characters: CharacterData[] = data.results;

      console.log(characters);
      this.setState({
        characters: characters,
        isLoading: false,
        error: null,
        errorMessage: '',
      });
    } catch (error) {
      this.setState({
        characters: [],
        isLoading: false,
        error,
        errorMessage: 'Data can not be downloaded',
      });
    }
  }

  render() {
    const { isClichedErrorButton, errorMessage, isLoading, characters } =
      this.state;

    return (
      <>
        <Header value={''} handleSearch={() => {}} />
        <ErrorBoundary isClichedErrorButton={isClichedErrorButton}>
          <main className="m-auto px-0 py-4 md:container justify-center">
            {errorMessage ? (
              <div className="text-red-500 text-center pt-4">
                <span>{errorMessage}</span>
              </div>
            ) : (
              <>
                <div className="flex justify-end my-4"></div>
                {isLoading && (
                  <div className="text-center">
                    <span className="text-primary">Loading ...</span>
                  </div>
                )}
                <div className="flex flex-wrap justify-center gap-6 py-4">
                  {characters.map((character) => (
                    <CharacterCard key={character.id} character={character} />
                  ))}
                </div>
              </>
            )}
            <div className="m-auto w-full mt-4">
              <button
                className="bg-green-400 hover:bg-green-500 w-full py-2 px-4 duration-300 "
                onClick={this.throwError}
              >
                ErrorBoundary
              </button>
            </div>
          </main>
        </ErrorBoundary>
      </>
    );
  }
}
