import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Layout } from './components';
import { Home, Topics, Classroom, Exams } from './pages';
import { useDispatch } from 'react-redux';
import { auth } from './redux/thunks/auth';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(auth());
  }, [dispatch]);

  return (
    <Layout>
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/topics" exact component={Topics} />
        <Route path="/login" exact component={Home} />
        <Route path="/register" exact component={Home} />
        <Route path="/classroom" exact component={Classroom} />
        <Route path="/exams" exact component={Exams} />
        <Redirect to="/home" />
      </Switch>
    </Layout>
  );
}

export default App;
