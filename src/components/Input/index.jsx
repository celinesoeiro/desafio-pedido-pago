import React from 'react';

import {
  ThemeProvider,
  createMuiTheme,
  withStyles,
} from '@material-ui/core/styles';

import { OutlinedInput, InputLabel, FormControl } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#22E0A1',
    },
  },
});

const PPInput = withStyles({
  root: {
    margin: '0px 0px 23px',
    borderRadius: '10px',
    color: '#424242',
    '& .MuiInputLabel-formControl': {
      fontFamily: 'Poppins',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      paddingRigth: '16px',
      alignSelf: 'center',
    },
  },
})(FormControl);

function CustomInput(props) {
  const {
    id, label, variant, style, type, size, onChange, value,
  } = props;

  return (
    <ThemeProvider theme={theme}>
      <PPInput variant={variant} size={size} fullWidth>
        <InputLabel>{label}</InputLabel>
        <OutlinedInput
          id={id}
          label={label}
          variant={variant}
          fullWidth
          className={style}
          type={type}
          value={value}
          onChange={onChange}
        />
      </PPInput>
    </ThemeProvider>
  );
}

export default CustomInput;
