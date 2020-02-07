import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './navigation/navBar';
import SignUp from './auth/signUp';
import Login from './auth/login';
import CreateLink from './createLink';
import LinkContainer from './linkContainer';

const Routes = () => {
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
