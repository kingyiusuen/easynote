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
    --brand: #394053;
    --border-color: #ececec;
    --scrollbar-thin-thumb: #c4c5c6;
    --scrollbar-thin-track: transparent;
    --sidebar-text-normal: #c2c3c4;
    --sidebar-text-muted: #7e7e7e;
    --sidebar-background: #161a21;
    --sidebar-background-hover: #20242e;
    --sidebar-background-active: #394053;
    --notelist-background: #f5f5f4;
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
