import styled from 'styled-components';
import { artworkForPokemon } from '../../../graphql/getSprites';
import Stats from '../../Atoms/Stats';
import Tag from '../../Atoms/Tag';
import COLORS from '../../constants/colors';

type ImageWrapperProps = {
  $bgColor: string;
};

type CardProps = {
  pokemon: any;
  handleOpenModal: (id: number) => void;
};

const Card = ({ pokemon, handleOpenModal }: CardProps) => {
  const { name, stats, types, id } = pokemon;

  const pokemonImage = artworkForPokemon(id);

  const firstType = types[0]?.type?.name;

  function getAttackDefense(value: any) {
    if (value.stat?.name === 'attack' || value.stat?.name === 'defense') {
      return value;
    }
  }

  return (
    <Container onClick={() => handleOpenModal(id)}>
      <InformationWrapper>
        <PokemonName>{name || ''}</PokemonName>
        <StatsWrapper>
          {stats.filter(getAttackDefense).map((s: any, i: number) => (
            <Stats key={i} name={s.stat.name} value={s.base_stat} />
          ))}
        </StatsWrapper>
        <TagWrapper>
          {types.slice(0, 2).map((t: any, i: number) => (
            <Tag key={i} type={t.type.name} />
          ))}
        </TagWrapper>
      </InformationWrapper>
      <ImageWrapper $bgColor={firstType}>
        <Image src={pokemonImage} />
      </ImageWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  max-width: 21.915rem;
  position: relative;

  background: #f6f7f9;
  border-radius: 0.5rem;

  padding: 0.3531rem 0 0.8069rem 1.6156rem;

  cursor: pointer;
`;

const InformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

const PokemonName = styled.span`
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.3125rem;
  text-transform: capitalize;

  color: ${COLORS.dark};

  text-shadow: 4px 4px 4px rgba(33, 33, 33, 0.1);

  margin-bottom: 1.125rem;
`;

const StatsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  margin-bottom: 0.7987rem;

  > div:first-of-type {
    margin-right: 0.5962rem;
  }
`;

const TagWrapper = styled.div`
  display: flex;
  justify-content: flex-start;

  align-items: center;

  > div:first-of-type {
    margin-right: 0.5962rem;
  }
`;

const ImageWrapper = styled.div<ImageWrapperProps>`
  width: 60%;
  height: 100%;
  background: linear-gradient(
    to left,
    ${({ $bgColor }) => COLORS.types[$bgColor]} 75%,
    transparent 100%
  );
  border-radius: 0px 8px 8px 0px;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  justify-content: flex-end;
`;

const Image = styled.img`
  width: auto;
  height: 100%;
`;

export default Card;
