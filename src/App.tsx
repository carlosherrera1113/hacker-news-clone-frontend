import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Routes from './components/routes';

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
}
html {
  box-sizing: border-box;
}
body {
  background-color: white;
  height: 100%;
}
`;


const App: React.FC = () => {
  return (
    <div>
      <GlobalStyle />
      <Routes />
    </div>
  );
};

export default App;
