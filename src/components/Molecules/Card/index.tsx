import React from 'react';
import styled from 'styled-components';
import Stats from '../../Atoms/Stats';
import Tag from '../../Atoms/Tag';
import COLORS from '../../constants/colors';

const Card = () => {
  return (
    <Container>
      <InformationWrapper>
        <PokemonName>Charizard</PokemonName>
        <StatsWrapper>
          <Stats name="Attack" value={48} />
          <Stats name="Defense" value={25} />
        </StatsWrapper>
        <TagWrapper>
          <Tag $bgColor="grass" type="grass" />
          <Tag $bgColor="fire" type="fire" />
        </TagWrapper>
      </InformationWrapper>
      <ImageWrapper>a</ImageWrapper>
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

const ImageWrapper = styled.div`
  width: 60%;
  height: 100%;
  background: linear-gradient(270deg, #b33327 0.15%, #d93e30 100%);
  border-radius: 0px 8px 8px 0px;
  position: absolute;
  right: 0;
  top: 0;
`;

export default Card;
