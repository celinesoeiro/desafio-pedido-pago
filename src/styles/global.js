import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  button, input, body {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
  }

  body {
    background: #FFF;
    -webkit-font-smoothing: antialiased;
    width: '1440px',
  }

  h1, h2, h3, h4, h5, h6 {
    -webkit-font-smoothing: antialiased;
  }

  button {
    cursor: pointer;
  }
`;
