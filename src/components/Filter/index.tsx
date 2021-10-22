import { useState } from 'react';
import styled from 'styled-components';

import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import COLORS from '../../constants/colors';

type FilterTypes = {
  label: string;
  children: React.ReactChild | React.ReactChild[];
};

const Filter = ({ label, children }: FilterTypes) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        {label}
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
          <FormGroup>{children}</FormGroup>
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

export default Filter;
