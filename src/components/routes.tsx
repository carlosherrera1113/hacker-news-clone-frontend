import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateLink from './createLink';
import Login from './login';
import LinkContainer from './linkContainer';
import Header from './header';
import SignUp from './signUp';

const Routes: React.FC = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={LinkContainer} />
        <Route exact path="/create" component={CreateLink} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signUp" component={SignUp} />
      </Switch>
    </Router>
  );
};

export default Routes;
