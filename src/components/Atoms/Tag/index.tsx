import styled from 'styled-components';

import COLORS from '../../constants/colors';

type TagProps = {
  $bgColor: string;
  type: string;
};

const Tag = ({ $bgColor, type }: TagProps) => {
  return <Container $bgColor={$bgColor}>{type}</Container>;
};

const Container = styled.div.attrs((props: TagProps) => ({
  $bgColor: props.$bgColor,
}))`
  width: 74px;
  height: 21px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 0.875rem;

  box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.18);
  border-radius: 11px;

  background-color: ${({ $bgColor }) => COLORS.types[$bgColor]};
`;

export default Tag;
