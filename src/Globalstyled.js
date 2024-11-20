import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const mainStyle = {
  pcPadding: "150px 180px",
  moPadding: "20px",
};

export const GlobalStyled = createGlobalStyle`
${reset}

*{
    box-sizing: border-box;
}

body{
    font-family: 'Roboto', sans-serif;
    letter-spacing: -1px;
    background: white;
}

img{
    display: block;
    width: 100%;
}

a{
    text-decoration: none;
}

`;
