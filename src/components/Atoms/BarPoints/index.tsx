import styled from 'styled-components';

const BarPoints = () => {
  return (
    <Container>
      <Header>Healthy Point</Header>
      <Number>1.000.000</Number>
      <BarInput type="range" value={10} step="1" min="0" max={100} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 256px;
`;
const Header = styled.span`
  font-size: 1rem;
  line-height: 1.1875rem;
  margin-bottom: 0.25rem;
`;
const Number = styled.span`
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.1875rem;
  margin-bottom: 0.75rem;
`;
const BarInput = styled.input`
  margin: 0;
  height: 5px;
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
  padding: 0;
  -webkit-appearance: none;

  box-sizing: border-box;
  border: none;

  background: -webkit-gradient(
    linear,
    0% 0%,
    100% 0%,
    color-stop(40%, #f5db13),
    color-stop(40%, #f6f7f9)
  );

  &&::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 16px;
    width: 16px;
    background: inherit;
  }

  &&::-moz-range-thumb {
    background: none;
    border: 0;
  }
`;

export default BarPoints;
