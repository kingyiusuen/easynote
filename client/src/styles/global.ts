import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  :root {
    --font: --apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    --border-color: #ececec;
    --scrollbar-thin-thumb: #c4c5c6;
    --scrollbar-thin-track: transparent;
    --nav-text-normal: #c2c3c4;
    --nav-text-muted: #7e7e7e;
    --nav-background: #161a21;
    --nav-background-hover: #20242e;
    --nav-background-active: #394053;
    --danger: #cc4539;
  }

  body {
    font-family: var(--font);
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;
