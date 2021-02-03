import React from 'react';

// Libs
import {
  ThemeProvider,
  createMuiTheme,
  withStyles,
} from '@material-ui/core/styles';
import { lighten, darken } from 'polished';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: lighten(0.1, '#22E0A1'),
      main: '#22E0A1',
      dark: darken(0.1, '#22E0A1'),
      contrastText: '#fff',
    },
  },
});

const PPButton = withStyles({
  root: {
    padding: '8px 40px',
    borderRadius: '99px',
    marginTop: '9px',
    marginBottom: '24px',
    fontFamily: 'Poppins',
    fontSize: '12px',
    fontWeight: 600,
    boxShadow: 'none',
  },
})(Button);

function CustomButton(props) {
  const {
    text, type, variant, color, onClick,
  } = props;

  return (
    <ThemeProvider theme={theme}>
      <PPButton
        type={type}
        fullWidth
        variant={variant}
        color={color}
        onClick={onClick}
      >
        {text}
      </PPButton>
    </ThemeProvider>
  );
}

export default CustomButton;