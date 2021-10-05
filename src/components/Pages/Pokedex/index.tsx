import styled from 'styled-components';
import client from '../../../graphql/client';
import { GET_POKEMONS } from '../../../graphql/queries';
import Card from './../../Molecules/Card/index';

import { artworkForPokemon } from '../../../graphql/getSprites';
import { useState, useEffect } from 'react';
import { Pokemon_V2_Pokemon } from '../../../graphql/generated/graphql';

const Pokedex = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon_V2_Pokemon[]>();

  const getPokemonData = async () => {
    const { pokemon } = await client.request(GET_POKEMONS);

    return pokemon;
  };

  useEffect(() => {
    getPokemonData().then((data: any) => setPokemonData(data));
  }, []);

  console.log(pokemonData);

  return (
    <Container>
      <CardGrid>
        {pokemonData?.map((pokemon: any, index) => {
          return <Card key={index} pokemon={pokemon} />;
        })}
      </CardGrid>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100vw;
`;

const CardGrid = styled.div`
  width: 100%;
  max-width: 1125px;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-row-gap: 2.8125rem;
  grid-column-gap: 2.125rem;
`;

export default Pokedex;
