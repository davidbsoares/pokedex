import styled from 'styled-components';
import COLORS from '../../constants/colors';

type BarPointsColor = {
  color: string;
  value: number;
};

const BarPoints = ({ color, value }: BarPointsColor) => {
  const percentage = (value / 200) * 100;
  return (
    <BarInput
      color={color}
      type="range"
      value={percentage}
      step="1"
      min={0}
      max={150}
      readOnly
    />
  );
};

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
    color-stop(
      ${({ value }) => `${value}%`},
      ${({ color }) => color && COLORS.types[color]}
    ),
    color-stop(${({ value }) => `${value}%`}, #f6f7f9)
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
