import { useState } from 'react';
import styled from 'styled-components';

import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import COLORS from '../../constants/colors';
import { pokemonTypes } from '../../constants/pokemonTypes';

type typeCheckProps = {
  [key: string]: boolean;
};

const Filter = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [typeCheck, setTypeCheck] = useState<typeCheckProps>({
    normal: false,
    fighting: false,
    flying: false,
    poison: false,
    ground: false,
    rock: false,
    bug: false,
    ghost: false,
    steel: false,
    fire: false,
    water: false,
    grass: false,
    electric: false,
    psychic: false,
    ice: false,
    dragon: false,
    dark: false,
    fairy: false,
    unknown: false,
    shadow: false,
  });

  const handleChange = (event: any) => {
    setTypeCheck({
      ...typeCheck,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <>
      <StyledButton
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Tipo
      </StyledButton>
      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <FormControl component="fieldset" variant="standard">
          <FormGroup>
            {pokemonTypes.sort().map((type: string, index) => (
              <StyledMenuItem key={index}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={typeCheck[type.toLowerCase()]}
                      onChange={handleChange}
                      name={type.toLowerCase()}
                    />
                  }
                  label={type}
                />
              </StyledMenuItem>
            ))}
          </FormGroup>
        </FormControl>
      </StyledMenu>
    </>
  );
};

const StyledButton = styled(Button)`
  &.MuiButton-root {
    width: 135px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-family: Source Sans Pro;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.2569rem;

    box-shadow: 2px 2px 2px rgba(33, 33, 33, 0.1);
    border-radius: 4px;

    background-color: ${COLORS.white};
    color: ${COLORS.dark};

    text-transform: capitalize;
  }
`;

const StyledMenu = styled(Menu)`
  left: 0;
  && .MuiMenu-paper {
    max-width: 100%;
  }
`;

const StyledMenuItem = styled(MenuItem)`
  padding-top: 0;
  padding-bottom: 0;

  &.MuiMenuItem-root * {
    font-family: Source Sans Pro;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.2569rem;
  }
`;

export default Filter;
