import { useState } from 'react';
import type { CharacterData } from '../models/interfaces';
import { Link, useLocation } from 'react-router-dom';

interface CharacterCardProps {
  character: CharacterData;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const [currentCharacter] = useState<CharacterData>(character);
  const { name, image, gender, species, id } = currentCharacter;
  const location = useLocation();

  return (
    <div
      className="bg-gray-50 hover:shadow-lg cursor-pointer duration-300 shadow-md border w-[300px] relative"
      data-testid="card"
    >
      <figure className="flex items-center justify-center w-[299px] h-[299px]">
        <img src={image} alt={`character ${name} image`} />
      </figure>
      <div className="items-center p-4">
        <h2 className="text-center font-bold pb-2">{name}</h2>
        <p>Gender: {gender}</p>
        <p>Species: {species}</p>
        <div className="text-center mt-4 mb-2">
          <Link
            to={`/details/${id}${location.search}`}
            className="text-center cursor-pointer text-black duration-300 border-[1px] border border-transparent bg-green-400 hover:bg-green-500 p-2 my-4"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
