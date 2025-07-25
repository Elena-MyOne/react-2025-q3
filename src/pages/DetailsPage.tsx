import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE_PATHS } from '../routes';
import { useCallback, useEffect, useState } from 'react';
import { BASE_URL } from '../consts';
import Loader from '../components/Loader';
import type { CharacterData } from '../models/interfaces';

export default function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [character, setCharacter] = useState<CharacterData | null>(null);

  const getCharacterById = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/${id}`);

      if (!response.ok) {
        throw new Error('Network response error');
      }

      const data = await response.json();
      setCharacter(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Cannot get character by id', error);
      setIsLoading(false);
      setErrorMessage(`Cannot get character by id. Error: ${error}`);
    }
  }, [id]);

  useEffect(() => {
    getCharacterById();
  }, [getCharacterById, id]);

  return (
    <div className="bg-white text-center mt-4">
      {isLoading ? (
        <div className="min-w-[300px]">
          <Loader />
        </div>
      ) : (
        <>
          {character && (
            <div className="shadow-md border ">
              <figure className=" flex items-center justify-center w-[300px] h-[300px]">
                <img
                  src={character.image}
                  alt={`character ${character.image} image`}
                />
              </figure>
              <h3 className="py-4 font-bold pb-2">{character.name}</h3>
              <p>Gender: {character.gender}</p>
              <p>Species: {character.species}</p>
              <p>Status: {character.status}</p>
              <p>Type: {character.type ? character.type : 'unknown'}</p>
              <button
                className="text-center cursor-pointer text-black duration-300 border-[1px] border border-transparent bg-green-400 hover:bg-green-500 p-2 my-4"
                onClick={() => navigate(`${ROUTE_PATHS.HOME}`)}
              >
                Close details
              </button>
            </div>
          )}
          {errorMessage && (
            <div className="text-red-600">Character not found</div>
          )}
        </>
      )}
    </div>
  );
}
