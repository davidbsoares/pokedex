import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { artworkForPokemon } from '../../../graphql/getSprites';

import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
/* import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'; */

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createSvgIcon } from '@mui/material/utils';

import Tag from '../../Atoms/Tag';

import COLORS from '../../constants/colors';
import BarPoints from '../../Atoms/BarPoints';

type DetailsProps = {
  open: boolean;
  onClose: () => void;
  id: number;
  pokemons: any | undefined;
};

type ColorProps = {
  $color: string;
};

const PokemonDetails = ({ open, onClose, id, pokemons }: DetailsProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [pokemonImage, setPokemonImage] = useState('');
  const pokemonStats: any = {};

  useEffect(() => {
    if (id) {
      setPokemonImage(artworkForPokemon(id));
    }
  }, [id]);

  const pokemon = id >= 0 && pokemons[id - 1];

  const name = pokemon?.name;
  const height = pokemon?.height;
  const weight = pokemon?.weight;
  const description = pokemon?.specy?.description[0]?.flavor_text
    .replace(/\s+/g, ' ')
    .trim();
  const stats = pokemon?.stats;
  const types = pokemon?.types;
  const moves = pokemon?.moves;

  const firstType = types && types[0].type?.name;

  //refactor - todo
  stats &&
    Object.keys(stats).forEach((index) => {
      let stat = stats[index].stat.name;
      let value = stats[index].base_stat;

      if (stat === 'special-attack') {
        stat = 'specialAttack';
      }

      if (stat === 'special-defense') {
        stat = 'specialDefense';
      }

      pokemonStats[stat] = value;
    });

  return (
    <StyledDialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      $color={firstType}
    >
      <DialogTitle>
        <StyledIconButton onClick={onClose}>
          <StyledArrowBackIcon fontSize="large" />
        </StyledIconButton>
        <Title>{name}</Title>
        <PokemonId>#{id}</PokemonId>
      </DialogTitle>
      <StyledDialogContent>
        <Wrapper>
          <PokemonImage src={pokemonImage} />
          <InfoWrapper>
            <TagsWrapper>
              {types &&
                types.map((t: any, i: number) => (
                  <Tag key={i} type={t.type.name} />
                ))}
            </TagsWrapper>
            <Subtitle $color={firstType}>About</Subtitle>
            <Table>
              <TableItem className="left-item">
                <TableItemTopWrapper>
                  <ScaleIcon viewBox="0 0 16 16" />
                  <TableItemValue>{weight && weight / 10} Kg</TableItemValue>
                </TableItemTopWrapper>
                <TableItemName>Weight</TableItemName>
              </TableItem>
              <TableItem className="middle-item">
                <TableItemTopWrapper>
                  <RulerIcon viewBox="-4 0 16 16" />
                  <TableItemValue>{height && height / 10} m</TableItemValue>
                </TableItemTopWrapper>
                <TableItemName>Height</TableItemName>
              </TableItem>
              <TableItem className="right-item">
                <MovesWrapper>
                  {moves &&
                    moves.map((m: any, i: number) => (
                      <Move key={i}>{m.move?.name}</Move>
                    ))}
                </MovesWrapper>
                <TableItemName>Moves</TableItemName>
              </TableItem>
            </Table>
            <PokemonDescription>
              {description || 'Sem descrição'}
            </PokemonDescription>
            <Subtitle $color={firstType}>Base Stats</Subtitle>

            <StatsWrapper>
              <StatsLabelWrapper>
                <StatsLabel $color={firstType}>HP</StatsLabel>
                <StatsLabel $color={firstType}>ATK</StatsLabel>
                <StatsLabel $color={firstType}>DEF</StatsLabel>
                <StatsLabel $color={firstType}>SATK</StatsLabel>
                <StatsLabel $color={firstType}>SDEF</StatsLabel>
                <StatsLabel $color={firstType}>SPD</StatsLabel>
              </StatsLabelWrapper>
              <StatsValueWrapper>
                <StatsValue>{pokemonStats.hp}</StatsValue>
                <StatsValue>{pokemonStats.attack} </StatsValue>
                <StatsValue>{pokemonStats.defense}</StatsValue>
                <StatsValue>{pokemonStats.specialAttack}</StatsValue>
                <StatsValue>{pokemonStats.specialDefense}</StatsValue>
                <StatsValue>{pokemonStats.speed}</StatsValue>
              </StatsValueWrapper>
              <StatsBarWrapper>
                <StatsBar>
                  <BarPoints color={firstType} value={pokemonStats.hp} />
                </StatsBar>
                <StatsBar>
                  <BarPoints color={firstType} value={pokemonStats.attack} />
                </StatsBar>
                <StatsBar>
                  <BarPoints color={firstType} value={pokemonStats.defense} />
                </StatsBar>
                <StatsBar>
                  <BarPoints
                    color={firstType}
                    value={pokemonStats.specialAttack}
                  />
                </StatsBar>
                <StatsBar>
                  <BarPoints
                    color={firstType}
                    value={pokemonStats.specialDefense}
                  />
                </StatsBar>
                <StatsBar>
                  <BarPoints color={firstType} value={pokemonStats.speed} />
                </StatsBar>
              </StatsBarWrapper>
            </StatsWrapper>
          </InfoWrapper>
        </Wrapper>
      </StyledDialogContent>
    </StyledDialog>
  );
};
const StyledDialog = styled(Dialog).attrs((props: ColorProps) => ({
  $color: props.$color,
}))`
  .MuiDialog-paper {
    min-width: 360px;
    min-height: 640px;
    background-color: ${({ $color }) =>
      $color ? COLORS.types[$color] : COLORS.types.steel};

    border-radius: 12px;
  }
`;

const DialogTitle = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 1.5rem 0;
`;

const StyledIconButton = styled(IconButton)`
  &&.MuiIconButton-root {
    padding: 0;
  }
`;

const StyledArrowBackIcon = styled(ArrowBackIcon)`
  color: white;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 1.875rem;
  line-height: 2.375rem;

  color: white;

  margin-left: 1rem;

  text-transform: capitalize;
`;
const PokemonId = styled.span`
  margin-left: auto;

  font-size: 1.125rem;
  line-height: 2.375rem;

  color: white;
`;

const StyledDialogContent = styled(DialogContent)`
  &&.MuiDialogContent-root {
    padding: 0;
    display: flex;
    align-items: flex-end;
    padding-top: 11rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;

  width: 100%;

  background-color: white;
  padding: 0 1.25rem 2.75rem;

  margin: 0 0.25rem 0.25rem 0.25rem;

  border-radius: 8px;
`;

const PokemonImage = styled.img`
  width: 200px;
  aspect-ratio: 1;

  position: absolute;
  top: 0;
  left: 50%;

  transform: translate(-50%, -80%);
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;
`;

const TagsWrapper = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 1rem;
  margin-bottom: 1rem;

  margin-top: 3.2rem;
`;

const Subtitle = styled.span.attrs((props: ColorProps) => ({
  $color: props.$color,
}))`
  font-weight: bold;
  font-size: 1.2rem;
  line-height: 1.5rem;

  color: ${({ $color }) =>
    $color ? COLORS.types[$color] : COLORS.types.steel};

  margin-bottom: 1rem;
`;

const Table = styled.div`
  display: flex;
  margin-bottom: 1.5rem;

  .middle-item {
    border-left: 1px solid #e0e0e0;
    border-right: 1px solid #e0e0e0;

    padding: 0 1.5rem;
  }

  .left-item {
    padding-right: 1.25rem;
  }

  .right-item {
    padding-left: 1.25rem;
  }
`;

const TableItem = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: 1rem;
  justify-content: flex-end;
  align-items: center;

  row-gap: 0.5rem;
`;

const TableItemTopWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
`;

const MovesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Move = styled.span`
  font-size: 0.9375rem;
  line-height: 1.25rem;
`;

const TableItemValue = styled.span`
  font-size: 0.9375rem;
  line-height: 1.25rem;
`;

const TableItemName = styled.span`
  font-size: 0.8125rem;
  line-height: 0.9375rem;
  font-weight: 700;
`;

const RulerIcon = createSvgIcon(
  <path
    d="M7 0H1C0.447812 0 0 0.447812 0 1V15C0 15.5522 0.447812 16 1 16H7C7.55219 16 8 15.5522 8 15V1C8 0.447812 7.55219 0 7 0ZM1 15V1H7V3H5.25C5.11188 3 5 3.11188 5 3.25V3.75C5 3.88812 5.11188 4 5.25 4H7V6H5.25C5.11188 6 5 6.11188 5 6.25V6.75C5 6.88812 5.11188 7 5.25 7H7V9H5.25C5.11188 9 5 9.11187 5 9.25V9.75C5 9.88813 5.11188 10 5.25 10H7V12H5.25C5.11188 12 5 12.1119 5 12.25V12.75C5 12.8881 5.11188 13 5.25 13H7V15H1Z"
    fill="#212121"
  />,
  'Ruler'
);

const ScaleIcon = createSvgIcon(
  <path
    d="M14 2H11.9747C11.0609 0.793125 9.62719 0 8 0C6.37281 0 4.93906 0.793125 4.02531 2H2C0.897187 2 0 2.89719 0 4V14C0 15.1028 0.897187 16 2 16H14C15.1028 16 16 15.1028 16 14V4C16 2.89719 15.1028 2 14 2ZM8 1C10.2091 1 12 2.79094 12 5C12 7.20906 10.2091 9 8 9C5.79094 9 4 7.20906 4 5C4 2.79094 5.79094 1 8 1ZM15 14C15 14.5522 14.5522 15 14 15H2C1.44781 15 1 14.5522 1 14V4C1 3.44781 1.44781 3 2 3H3.42375C3.15437 3.61344 3 4.28813 3 5C3 7.75688 5.24312 10 8 10C10.7569 10 13 7.75688 13 5C13 4.28813 12.8456 3.61344 12.5763 3H14C14.5522 3 15 3.44781 15 4V14ZM8 8C8.82719 8 9.5 7.32719 9.5 6.5C9.5 6.065 9.31094 5.67625 9.01437 5.40219L9.95938 3.19688C10.0681 2.94344 9.95063 2.64938 9.69656 2.54063C9.44406 2.43187 9.14906 2.54906 9.04031 2.80344L8.09469 5.00969C6.98656 4.9375 6.5 5.89531 6.5 6.5C6.5 7.32719 7.17281 8 8 8ZM8 6C8.27625 6 8.5 6.22375 8.5 6.5C8.5 6.77625 8.27625 7 8 7C7.72375 7 7.5 6.77625 7.5 6.5C7.5 6.22375 7.72375 6 8 6Z"
    fill="#212121"
  />,
  'Scale'
);

const PokemonDescription = styled.span`
  max-width: 500px;
  width: 100%;

  font-size: 1rem;
  line-height: 1.375rem;
  text-align: center;

  margin-bottom: 1rem;
`;

const StatsWrapper = styled.div`
  display: flex;
`;

const StatsLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 0.75rem;

  border-right: 1px solid #e0e0e0;
`;
const StatsLabel = styled.span.attrs((props: ColorProps) => ({
  $color: props.$color,
}))`
  font-weight: bold;
  font-size: 0.9375rem;
  line-height: 1.375rem;

  color: ${({ $color }) =>
    $color ? COLORS.types[$color] : COLORS.types.steel};
`;

const StatsValueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  padding-left: 0.75rem;
`;
const StatsValue = styled.span`
  font-size: 0.9375rem;
  line-height: 1.375rem;
`;

const StatsBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 0.5rem;

  padding: 0.375rem 0 0.625rem;
`;

const StatsBar = styled.div`
  display: flex;
  align-items: center;
`;

export default PokemonDetails;
