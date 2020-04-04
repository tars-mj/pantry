import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

const GlobalStyle = createGlobalStyle`

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
		background-color: ${theme.white};
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
		color: ${theme.black};
		text-decoration: none;
	}

	a:visited {
		color: ${theme.black};
		text-decoration: none;
	}

	a:hover {
		color: ${theme.black};
		text-decoration: none;
	}

	a:active {
		color: ${theme.black};
		text-decoration: none;
	}

	.activeBtn {
		background-color: ${theme.blackHover};
	}
`;

export default GlobalStyle;
