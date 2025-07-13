import React from 'react';
import type { CharacterData } from '../models/interfaces';

interface CharacterCardProps {
  character: CharacterData;
}

export default class CharacterCard extends React.Component<
  CharacterCardProps,
  { character: CharacterData }
> {
  constructor(props: CharacterCardProps) {
    super(props);
    this.state = {
      character: props.character,
    };
  }

  render() {
    const { name, image, gender, species } = this.state.character;

    return (
      <div
        className="bg-gray-50 hover:shadow-lg cursor-pointer duration-300 shadow-md border w-[300px] relative"
        data-testid="card"
      >
        <figure className=" flex items-center justify-center w-[299px] h-[299px]">
          <img src={image} alt={`character ${name} image`} />
        </figure>
        <div className="items-center p-4">
          <h2 className="text-center font-bold pb-2">{name}</h2>
          <p>Gender: {gender}</p>
          <p>Species: {species}</p>
        </div>
      </div>
    );
  }
}
