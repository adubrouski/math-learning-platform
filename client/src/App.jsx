import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Header, Menu } from './components';
import { Home, Theory, Classroom, Tests } from './pages';

function App() {
  return (
    <div className="wrapper">
      <div className="container">
        <Header />
        <div className="content-wrapper">
          <Menu />
          <>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/theory" exact component={Theory} />
              <Route path="/classroom" exact component={Classroom} />
              <Route path="/tests" exact component={Tests} />
              <Redirect to="/" />
            </Switch>
          </>
        </div>
      </div>
    </div>
  );
}

export default App;
