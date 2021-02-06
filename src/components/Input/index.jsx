/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import {
  ThemeProvider,
  createMuiTheme,
  withStyles,
} from '@material-ui/core/styles';

import {
  OutlinedInput, InputLabel, FormControl, FormHelperText, InputAdornment, IconButton,
} from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#22E0A1',
    },
    secondary: {
      main: '#A3A3A3',
    },
  },
});

const PPInput = withStyles({
  root: {
    margin: '0px 0px 23px',
    color: '#424242',
    borderRadius: (props) => props.borderRadius,
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
    id,
    label,
    variant,
    style,
    type,
    size,
    onChange,
    value,
    error,
    errorMessage,
    borderRadius,
    width,
    height,
    icon,
    inputIconButtonFunction,
    placeHolder,
    fontSize,
    ...rest
  } = props;

  return (
    <ThemeProvider theme={theme}>
      <PPInput
        variant={variant}
        size={size}
        fullWidth
      >
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
          error={error}
          style={{
            borderRadius,
            fontFamily: 'Poppins',
            width,
            fontSize,
            height,
          }}
          endAdornment={icon ? (
            <InputAdornment position="end">
              <IconButton
                onClick={inputIconButtonFunction}
                edge="end"
                size="small"
              >
                {icon}
              </IconButton>
            </InputAdornment>
          ) : null}
          placeholder={placeHolder || null}
          {...rest}
        />
        {error ? <FormHelperText id={id}>{errorMessage}</FormHelperText> : ''}
      </PPInput>
    </ThemeProvider>
  );
}

export default CustomInput;
