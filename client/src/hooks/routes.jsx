import { Route, Switch, Redirect } from 'react-router-dom';
import { Home, Topics, Classroom, Exams } from '../pages';

const useRoutes = (authorization) => {
  if (authorization) {
    return (
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/topics" exact component={Topics} />
        <Route path="/classroom" exact component={Classroom} />
        <Route path="/exams" exact component={Exams} />
        <Redirect to="/home" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/home" exact component={Home} />
      <Route path="/login" exact component={Home} />
      <Route path="/register" exact component={Home} />
      <Redirect to="/home" />
    </Switch>
  );
};

export { useRoutes };
