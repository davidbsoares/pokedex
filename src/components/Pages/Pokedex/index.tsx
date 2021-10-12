import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import client from '../../../graphql/client';
import { GET_POKEMONS } from '../../../graphql/queries';
import { Pokemon_V2_Pokemon } from '../../../graphql/generated/graphql';

import { TextField, Pagination } from '@mui/material';

import Card from './../../Molecules/Card/index';

import COLORS from '../../constants/colors';
import PokemonDetails from '../../Organisms/PokemonDetails';
import Filter from '../../Atoms/Filter';

const Pokedex = () => {
  const [open, setOpen] = useState<boolean>(false);

  const storageKey = localStorage.getItem('pokemonsStorage') || null;

  const pokemonsStorage: Pokemon_V2_Pokemon[] =
    storageKey && JSON.parse(storageKey);

  const [pokemonData, setPokemonData] =
    useState<Pokemon_V2_Pokemon[]>(pokemonsStorage);

  const [pokemonId, setPokemonId] = useState<number>(-1);

  const [search, setSearch] = useState<string>('');
  const [pages, setPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const step = 9;
  const start = page * step - step;
  const end = start + step;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePage = (_: any, p: number) => {
    setPage(p);
  };

  const getPokemonsData = async () => {
    const { pokemon } = await client.request(GET_POKEMONS);

    return pokemon;
  };

  function filterName(value: Pokemon_V2_Pokemon) {
    if (value.name.includes(search.toLowerCase())) return value;
  }

  const filteredPokemon = pokemonData?.filter(filterName);

  //Modal
  const handleOpenModal = (id: number) => {
    setPokemonId(id);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setPokemonId(-1);
  };

  useEffect(() => {
    if (!pokemonsStorage) {
      getPokemonsData().then((data: any) => setPokemonData(data));
    }
  }, [pokemonsStorage]);

  useEffect(() => {
    localStorage.setItem('pokemonsStorage', JSON.stringify(pokemonData));

    setPages(Math.round(pokemonData?.length / 9));
  }, [pokemonData]);

  useEffect(() => {
    setPages(Math.round(filteredPokemon?.length / 9));
  }, [search, filteredPokemon]);

  return (
    <>
      <Container>
        <Title>
          {pokemonData?.length} Pokemons for you to choose your favorite
        </Title>
        <StyledTextField
          value={search}
          onChange={handleSearch}
          label="Find your pokemon"
          variant="standard"
        />

        <FilterWrapper>
          <Filter label="Type" />
          <Filter label="Rarity" />
        </FilterWrapper>
        <CardGrid>
          {filteredPokemon?.slice(start, end).map((pokemon: any, index) => {
            return (
              <Card
                key={index}
                pokemon={pokemon}
                handleOpenModal={handleOpenModal}
              />
            );
          })}
        </CardGrid>
        <StyledPagination
          count={pages}
          page={page}
          onChange={handlePage}
          variant="outlined"
          hideNextButton
          hidePrevButton
        />
      </Container>
      <PokemonDetails
        open={open}
        onClose={handleCloseModal}
        id={pokemonId}
        pokemons={pokemonData}
      />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #ffffff 30.32%, #f5f5f5 100%);
  align-items: center;

  width: 100vw;
`;

const Title = styled.span`
  font-size: 2.1875rem;
  line-height: 2.5625rem;

  text-align: center;
  letter-spacing: 0.1875rem;

  margin-top: 4.5625rem;
  margin-bottom: 2.125rem;
`;

const StyledTextField = styled(TextField)`
  max-width: 1088px;
  width: 50%;
  margin-bottom: 2.25rem;

  && .Mui-focused.MuiFormLabel-root {
    color: ${COLORS.second};
  }

  && .Mui-focused.MuiInputBase-root {
    color: ${COLORS.dark};
  }

  && .Mui-focused:after {
    border-bottom: 2px solid ${COLORS.second};
  }
`;

const FilterWrapper = styled.div`
  display: flex;

  column-gap: 4rem;

  margin-bottom: 3.25rem;
`;

const CardGrid = styled.div`
  max-width: 1125px;
  width: 100%;

  display: grid;
  justify-content: center;
  align-items: center;

  margin-bottom: 1.875rem;

  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-row-gap: 2.8125rem;
  grid-column-gap: 2.125rem;
`;

const StyledPagination = styled(Pagination)`
  margin-bottom: 3rem;
`;

export default Pokedex;
