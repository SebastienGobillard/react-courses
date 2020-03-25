import { createGlobalStyle } from 'styled-components'





export const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }
  *, *::after, *::before {
    box-sizing: border-box;
  }
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.primaryDark};
    color: ${({ theme }) => theme.primaryLight};
    height: 100vh;

    @import url('https://fonts.googleapis.com/css?family=Open+Sans:400i,700i&display=swap');


    text-rendering: optimizeLegibility;
    $font-family: 'Open Sans', sans-serif;
  }
  h1 {
    font-size: 1rem;


  }
  img {
    top: 0px;
    width: 10rem;
  
  }
  div {
   
  }
  small {
    display: block;
  }
  a {
    color: ${({ theme }) => theme.primaryHover};
    text-decoration: none;
  }
  a:active {
    outline:none;
  }
  *:focus {

    outline: none;
    
    }
    
    *::-moz-focus-inner {
    
    border: none;
    
    }
`