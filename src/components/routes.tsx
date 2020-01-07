import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateLink from './createLink';
import LinkContainer from './linkContainer';
import Header from './header';
import SignUp from './signUp';
import Login from './login';

const Routes: React.FC = () => {
  return (
    <Router>
      <Header />
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
