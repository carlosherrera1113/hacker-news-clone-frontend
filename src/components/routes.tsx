import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Logout from './auth/logout';
import Login from './auth/login';
import SignUp from './auth/signUp';
import CreateLink from './createLink';
import NavBar from './navigation/navBar';
import LinkContainer from './linkContainer';
import useAuth from '../customHooks/useAuth';

const Routes: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={LinkContainer} />
        <Route exact path="/create" component={CreateLink} />
        <Route exact path="/signUp" component={SignUp} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default Routes;
