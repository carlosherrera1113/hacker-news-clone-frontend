import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import CreateLink from './components/createLink';
import LinkContainer from './components/linkContainer';
import Header from './components/header';

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
    <Router>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path="/" component={LinkContainer} />
        <Route exact path="/create" component={CreateLink} />
      </Switch>
    </Router>
  );
};

export default App;
