import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateLink from './components/createLink';
import LinkContainer from './components/linkContainer';
import Header from './components/header';


const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <div>
          <Switch>
            <Route exact path="/" component={LinkContainer} />
            <Route exact path="/create" component={CreateLink} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
