import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import Login from './auth/login';
import SignUp from './auth/signUp';
import CreateLink from './createLink';
import NavBar from './navigation/navBar';
import LinkContainer from './linkContainer';
import Search from './search';

const Wrapper = styled.div`
padding: 12rem 2rem 12rem 2rem;
display: flex;
flex-direction: column;
`;

const Routes: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Wrapper>
        <Switch>
          <Route exact path="/" component={LinkContainer} />
          <Route exact path="/create" component={CreateLink} />
          <Route exact path="/signUp" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/search" component={Search} />
        </Switch>
      </Wrapper>
    </Router>
  );
};

export default Routes;
