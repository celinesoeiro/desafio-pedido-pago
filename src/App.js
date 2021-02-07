import React from 'react';

// Libs
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { lighten, darken } from 'polished';

import Routes from './routes';

import GlobalStyle from './styles/global';

// Styles
const theme = createMuiTheme({
  palette: {
    primary: {
      light: lighten(0.1, '#22E0A1'),
      main: '#22E0A1',
      dark: darken(0.1, '#22E0A1'),
      contrastText: '#fff',
    },
    secondary: {
      main: '#A3A3A3',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
