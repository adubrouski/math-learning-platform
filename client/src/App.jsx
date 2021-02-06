import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Layout } from './components';
import { Home, Topics, Classroom, Tests } from './pages';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/topics" exact component={Topics} />
        <Route path="/login" exact component={Home} />
        <Route path="/register" exact component={Home} />
        <Route path="/classroom" exact component={Classroom} />
        <Route path="/exams" exact component={Tests} />
        <Redirect to="/home" />
      </Switch>
    </Layout>
  );
}

export default App;
