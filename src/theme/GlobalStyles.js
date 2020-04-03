import { createGlobalStyle } from 'styled-components';
import { themeSettings } from './themeSettings';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Montserrat:300,600');
  *, *::before, *::after {
    box-sizing: border-box;
		text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-size: 62.5%; 
  }
  
  body {
    font-size: 1.6rem;
		font-family: "Roboto", sans-serif;
		margin: 0;
		padding: 0;
		background-color: #1d273f;
  }

  button {
    padding: 0;
    cursor: pointer;
    font-family: 'Roboto';
  }
  
  p {
    font-size: 16px;
  }

  ul, h1 {
    padding: 0;
    margin: 0;
  }

	a:link {
		color: ${darkMode.color1.hsl};
		text-decoration: none;
	}

	a:visited {
		color: ${darkMode.color1.hsl};
		text-decoration: none;
	}

	a:hover {
		color: ${darkMode.color1.hsl};
		text-decoration: none;
	}

	a:active {
		color: ${darkMode.color1.hsl};
		text-decoration: none;
	}
`;

export default GlobalStyle;
