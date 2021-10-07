import styled from 'styled-components';
import COLORS from '../../constants/colors';

type BarPointsColor = {
  color: string;
};

const BarPoints = ({ color }: BarPointsColor) => {
  return (
    <BarInput
      color={color}
      type="range"
      value={10}
      step="1"
      min="0"
      max={100}
    />
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
  height: 5px;
  width: 100%;
  width: 256px;

  border-radius: 8px;
  border: none;

  margin: 0;
  padding: 0;
  cursor: pointer;

  -webkit-appearance: none;

  box-sizing: border-box;

  background: -webkit-gradient(
    linear,
    0% 0%,
    100% 0%,
    color-stop(40%, ${({ color }) => color && COLORS.types[color]}),
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
