import styled from 'styled-components';

type StatsProps = {
  name: string;
  value: number;
};

const Stats = ({ name, value }: StatsProps) => {
  return (
    <Container>
      <Circle>{value}</Circle>
      <Description>{name}</Description>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
`;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;

  border-radius: 50%;

  border: 1px solid #000;

  font-size: 0.875rem;
`;

const Description = styled.span`
  margin-top: 0.5rem;
  font-size: 0.875rem;
`;

export default Stats;
