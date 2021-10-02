import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import COLORS from '../../constants/colors';

type ButtonProps = {
  $bgColor: string;
  text: string;
  link: string;
};

const Button = ({ $bgColor, text, link }: ButtonProps) => {
  return (
    <StyledNavLink to={link} $bgColor={$bgColor}>
      {text}
    </StyledNavLink>
  );
};

const StyledNavLink = styled(NavLink).attrs((props: ButtonProps) => ({
  $bgColor: props.$bgColor,
}))`
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 700;
  font-size: 1.4375rem;
  line-height: 1.6875rem;

  background-color: ${({ $bgColor }) => COLORS.types[$bgColor]};
`;

export default Button;
