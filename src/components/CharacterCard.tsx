import { useState } from 'react';
import type { CharacterData } from '../models/interfaces';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { IoHeart } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSelectedItems,
  setSelectedItems,
} from '../redux/slices/selectedItemsSlice';
import type { AppDispatch } from '../redux/store';
import useThemeClasses from '../hooks/useThemeClasses';

interface CharacterCardProps {
  character: CharacterData;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const [currentCharacter] = useState<CharacterData>(character);
  const { name, image, gender, species, id } = currentCharacter;
  const location = useLocation();
  const { theme } = useTheme();
  const { bg } = useThemeClasses(theme);

  const { selectedItems } = useSelector(selectSelectedItems);
  const dispatch = useDispatch<AppDispatch>();

  function handleSelectedItem(character: CharacterData) {
    const alreadySelected = selectedItems.some(
      (item) => item.id === character.id
    );

    if (alreadySelected) {
      dispatch(
        setSelectedItems(
          selectedItems.filter((item) => item.id !== character.id)
        )
      );
    } else {
      dispatch(setSelectedItems([...selectedItems, character]));
    }
  }

  return (
    <div
      className={`${bg}  hover:shadow-lg cursor-pointer duration-300 shadow-md border w-[300px] relative`}
      data-testid="card"
    >
      <button
        data-testid="icon"
        className={`${selectedItems.some((item) => item.id === character.id) ? 'text-green-500 hover:text-green-600' : 'text-gray-800 hover:text-green-400'} absolute top-0 right-0 bg-gray-100 -700 p-2 text-xl duration-300 `}
        onClick={() => handleSelectedItem(character)}
      >
        <IoHeart />
      </button>
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
