import styled from 'styled-components';

import COLORS from '../../constants/colors';

type TagProps = {
  type: string;
};

const Tag = ({ type }: TagProps) => {
  return <Container type={type}>{type}</Container>;
};

const Container = styled.div.attrs((props: TagProps) => ({
  type: props.type,
}))`
  width: 74px;
  height: 21px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 0.875rem;
  text-transform: capitalize;

  box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.18);
  border-radius: 11px;

  background-color: ${({ type }) => COLORS.types[type]};
`;

export default Tag;
