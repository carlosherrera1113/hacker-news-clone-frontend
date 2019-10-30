import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateLink from './components/createLink';
import Link from './components/link';
import Header from './components/header';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Header>
          <div>
            <Switch>
              <Route exact path="/" component={Link} />
              <Route exact path="/create" component={CreateLink} />
            </Switch>
          </div>
        </Header>
      </div>
    </BrowserRouter>
  );
};

export default App;
