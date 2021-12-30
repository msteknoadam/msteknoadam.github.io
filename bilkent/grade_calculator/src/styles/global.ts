import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
   *{
       margin: 0;
       padding: 0;
       outline:0;
       box-sizing:border-box;
       font-family: 'Open Sans', sans-serif; 
   }
   #root{
       margin:0 auto;
   }
   body {
        background-color: rgb(41,49,51);
   }
`;
