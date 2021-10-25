import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from '../../graphql/queries';
import { PokemonsProps } from '../../types';

import ReactLoading from 'react-loading';

import {
  TextField,
  Pagination,
  FormControlLabel,
  Checkbox,
  MenuItem,
  CheckboxProps,
} from '@mui/material';

import Filter from '../../components/Filter';
import Card from '../../components/Card/index';
import PokemonDetails from '../../components/PokemonDetails';
import COLORS from '../../constants/colors';
import { pokemonTypes, pokemonKinds } from '../../constants/pokemonOptions';

export type CheckTypes = {
  [key: string]: boolean;
};

interface StyledCheckboxProps extends CheckboxProps {
  $type?: string;
}

const Pokedex = () => {
  const [open, setOpen] = useState<boolean>(false);

  const storageKey = localStorage.getItem('pokemonsStorage') || null;

  const pokemonsStorage: PokemonsProps['pokemons'] =
    storageKey && JSON.parse(storageKey);
  const [pokemonData, setPokemonData] = useState<PokemonsProps['pokemons']>(
    pokemonsStorage && pokemonsStorage
  );
  const [pokemonId, setPokemonId] = useState<number>(-1);

  const [search, setSearch] = useState<string>('');
  const [pages, setPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

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
  const [kindCheck, setKindCheck] = useState<CheckTypes>({
    mythical: false,
    legendary: false,
    baby: false,
  });

  const { loading } = useQuery<PokemonsProps>(GET_POKEMONS, {
    onCompleted: (data: any) => {
      const { pokemons } = data;
      console.log(pokemons);
      setPokemonData(pokemons);
      localStorage.setItem('pokemonsStorage', JSON.stringify(pokemons));
    },
    skip: Boolean(storageKey),
  });

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

  const handleChangeTypeFilter = (event: any) => {
    setTypeCheck({
      ...typeCheck,
      [event.target.name]: event.target.checked,
    });
    setPage(1);
  };

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

  function filterName(value: any) {
    if (value?.name.includes(search.toLowerCase())) return value;
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
    ? pokemonData.filter(filterName).filter(filterKinds).filter(filterTypes)
    : undefined;

  useEffect(() => {
    if (filteredPokemon) {
      setPages(Math.round(filteredPokemon?.length / 9));
    }
  }, [search, kindCheck, typeCheck, filteredPokemon]);

  return (
    <>
      <Container>
        <Title>
          {pokemonData?.length || '000'} Pokemons for you to choose your
          favorite
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
                <StyledFormControlLabel
                  control={
                    <StyledCheckbox
                      checked={typeCheck[type.toLowerCase()]}
                      onChange={handleChangeTypeFilter}
                      name={type.toLowerCase()}
                      $type={type}
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
                    <StyledCheckbox
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
        {loading ? (
          <ReactLoading
            className="loading"
            type="spinningBubbles"
            color={COLORS.dark}
            height={150}
            width={150}
          />
        ) : (
          <>
            <CardGrid>
              {filteredPokemon
                ?.slice(start, end)
                .map((pokemon: any, index: number) => {
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
          </>
        )}
      </Container>
      {pokemonData && (
        <PokemonDetails
          open={open}
          onClose={handleCloseModal}
          id={pokemonId}
          pokemons={pokemonData}
          handlePokemonId={handlePokemonId}
        />
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #ffffff 30.32%, #f5f5f5 100%);
  align-items: center;

  width: 100vw;
  min-height: 100vh;
  height: fit-content;

  .loading {
    margin: auto;
  }
`;

const Title = styled.span`
  font-size: 2.1875rem;
  line-height: 2.5625rem;

  text-align: center;
  letter-spacing: 0.1875rem;

  margin: 4.5625rem 1rem 2.125rem;
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

const StyledCheckbox = styled(Checkbox).attrs((props: StyledCheckboxProps) => ({
  $type: props.$type,
}))`
  &&.MuiCheckbox-colorPrimary.Mui-checked {
    color: ${({ $type }) => $type && COLORS.types[$type.toLowerCase()]};
  }
`;

const CardGrid = styled.div`
  max-width: 1125px;
  width: 100%;

  display: grid;
  justify-content: center;
  align-items: center;

  margin-bottom: 1.875rem;

  grid-template-columns: repeat(auto-fill, 336px);
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

  &.MuiMenuItem-root label {
    width: 100%;
  }
  &.MuiMenuItem-root * {
    font-family: Source Sans Pro;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.2569rem;
  }
`;

const StyledFormControlLabel = styled(FormControlLabel)``;

export default Pokedex;
