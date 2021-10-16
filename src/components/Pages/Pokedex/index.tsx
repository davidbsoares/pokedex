import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import client from '../../../graphql/client';
import { GET_POKEMONS } from '../../../graphql/queries';
import { Pokemon_V2_Pokemon } from '../../../graphql/generated/graphql';

import {
  TextField,
  Pagination,
  FormControlLabel,
  Checkbox,
  MenuItem,
} from '@mui/material';

import Card from './../../Molecules/Card/index';

import COLORS from '../../constants/colors';
import PokemonDetails from '../../Organisms/PokemonDetails';
import Filter from '../../Atoms/Filter';
import { pokemonTypes, pokemonKinds } from '../../constants/pokemonOptions';

export type CheckTypes = {
  [key: string]: boolean;
};

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
    setPage(1);
  };

  const handlePage = (_: any, p: number) => {
    setPage(p);
  };

  const getPokemonsData = async () => {
    const { pokemon } = await client.request(GET_POKEMONS);

    return pokemon;
  };

  // Modal
  const handleOpenModal = (id: number) => {
    setPokemonId(id);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setPokemonId(-1);
  };

  const handlePokemonId = (id: number) => {
    setPokemonId(id);
  };

  // Filter
  const [typeCheck, setTypeCheck] = useState<CheckTypes>({
    normal: false,
    fighting: false,
    flying: false,
    poison: false,
    ground: false,
    rock: false,
    bug: false,
    ghost: false,
    steel: false,
    fire: false,
    water: false,
    grass: false,
    electric: false,
    psychic: false,
    ice: false,
    dragon: false,
    dark: false,
    fairy: false,
    unknown: false,
    shadow: false,
  });

  const handleChangeTypeFilter = (event: any) => {
    setTypeCheck({
      ...typeCheck,
      [event.target.name]: event.target.checked,
    });
    setPage(1);
  };

  const [kindCheck, setKindCheck] = useState<CheckTypes>({
    mythical: false,
    legendary: false,
    baby: false,
  });

  const handleChangeKindFilter = (event: any) => {
    setKindCheck({
      ...kindCheck,
      [event.target.name]: event.target.checked,
    });
    setPage(1);
  };

  const selectedTypes = Object.keys(typeCheck).filter(
    (i) => typeCheck[i] === true
  );

  function filterName(value: Pokemon_V2_Pokemon) {
    if (value.name.includes(search.toLowerCase())) return value;
  }

  function filterTypes(value: any) {
    if (value?.types[0]?.type.name.includes(selectedTypes)) return value;
  }

  function filterKinds(value: any) {
    if (kindCheck.mythical && value?.specy?.is_mythical) return value;
    if (kindCheck.legendary && value?.specy?.is_legendary) return value;
    if (kindCheck.baby && value?.specy?.is_baby) return value;

    if (!kindCheck.mythical && !kindCheck.legendary && !kindCheck.baby)
      return value;
  }

  const filteredPokemon = pokemonData
    ?.filter(filterName)
    .filter(filterKinds)
    .filter(filterTypes);

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
  }, [search, kindCheck, typeCheck, filteredPokemon]);

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
          <Filter label="Type">
            {pokemonTypes.sort().map((type: string, index) => (
              <StyledMenuItem key={index}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={typeCheck[type.toLowerCase()]}
                      onChange={handleChangeTypeFilter}
                      name={type.toLowerCase()}
                    />
                  }
                  label={type}
                />
              </StyledMenuItem>
            ))}
          </Filter>

          <Filter label="Kind">
            {pokemonKinds.sort().map((kind: string, index) => (
              <StyledMenuItem key={index}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={kindCheck[kind.toLowerCase()]}
                      onChange={handleChangeKindFilter}
                      name={kind.toLowerCase()}
                    />
                  }
                  label={kind}
                />
              </StyledMenuItem>
            ))}
          </Filter>
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
        handlePokemonId={handlePokemonId}
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

const StyledMenuItem = styled(MenuItem)`
  padding-top: 0;
  padding-bottom: 0;

  &.MuiMenuItem-root * {
    font-family: Source Sans Pro;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.2569rem;
  }
`;

export default Pokedex;
