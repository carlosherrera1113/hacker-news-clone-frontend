import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignUp from './auth/signUp';
import userContainer from './auth/userContainer';
import Login from './auth/login';
import CreateLink from './createLink';
import NavBar from './navigation/navBar';
import LinkContainer from './linkContainer';

const Routes: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={LinkContainer} />
        <Route exact path="/create" component={CreateLink} />
        <Route exact path="/signUp" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/test" component={userContainer} />
      </Switch>
    </Router>
  );
};

export default Routes;
