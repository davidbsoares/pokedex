import styled from 'styled-components';
import Stats from '../../Atoms/Stats';
import Tag from './../../Atoms/Tag/index';

const Pokedex = () => {
  return (
    <Container>
      <Stats value={40} name="Attack" />
      <Tag $bgColor="grass" type="Grass" />
    </Container>
  );
};

const Container = styled.div``;

export default Pokedex;
